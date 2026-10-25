import type { Model } from "mongoose";
import { Author, Post, Resource, Setting, Term } from "./models";
import { escapeRegex, fail, now, oid, oids, parse } from "./http";
import { firstParagraph, processArticle, sanitize } from "./html";
import { loadCtas, resolvePost } from "./public";
import { AuthorIn, CtaSettings, PostIn, ResourceIn, TermIn, type TermKind } from "./schemas";

type Doc = Record<string, any>;
type Scope = Record<string, unknown>;
const RESERVED_POST_SLUGS = new Set(["topic", "speciality", "author", "page", "feed"]);

async function find(M: Model<any>, id: string): Promise<Doc> {
  const found = await M.findById(oid(id));
  return found ? found.toJSON() : fail(404, "Not found");
}

async function validIds(ids: string[], M: Model<any>, scope: Scope = {}) {
  const unique = [...new Set(ids)];
  const found = new Set((await M.find({ _id: { $in: oids(unique) }, ...scope }).select("_id").lean<Doc[]>()).map((d) => String(d._id)));
  return unique.filter((i) => found.has(i));
}

async function save(M: Model<any>, data: Doc, id: string | null, scope: Scope = {}, keepOldSlug = true) {
  const clash: Doc = { slug: data.slug, ...scope };
  if (id) clash._id = { $ne: oid(id) };
  if (await M.exists(clash)) fail(409, "That URL slug is already in use. Choose a different one.");
  const stamp = now();
  if (!id) return (await M.create({ ...data, created_at: stamp, updated_at: stamp })).toJSON();
  const existing = await find(M, id);
  const oldSlugs: string[] = existing.old_slugs.filter((s: string) => s !== data.slug);
  if (existing.slug !== data.slug && keepOldSlug && !oldSlugs.includes(existing.slug)) oldSlugs.push(existing.slug);
  await M.updateMany({ old_slugs: data.slug, ...scope }, { $pull: { old_slugs: data.slug } });
  await M.updateOne({ _id: oid(id) }, { $set: { ...data, old_slugs: oldSlugs, updated_at: stamp } });
  return find(M, id);
}

const listQuery = (q: URLSearchParams) => {
  const query: Doc = {};
  const text = q.get("q") ?? "";
  if (text) query.title = { $regex: escapeRegex(text), $options: "i" };
  const status = q.get("status") ?? "";
  if (status && !["draft", "published"].includes(status)) fail(422, "Please check these fields: status.");
  if (status) query.status = status;
  return query;
};

async function postData(body: unknown, id: string | null) {
  const input = parse(PostIn, body);
  if (RESERVED_POST_SLUGS.has(input.slug)) fail(422, `“${input.slug}” is reserved. Choose a different URL slug.`);
  const { html, toc, readingTime } = processArticle(input.content_html);
  const data: Doc = { ...input, content_html: html, toc, reading_time: readingTime, excerpt: input.excerpt || firstParagraph(html) };
  if (input.cover_image && !input.cover_alt) data.cover_alt = input.title;
  data.author_id = input.author_id ? (await validIds([input.author_id], Author))[0] ?? "" : "";
  data.reviewer_id = input.reviewer_id ? (await validIds([input.reviewer_id], Author))[0] ?? "" : "";
  data.topic_ids = await validIds(input.topic_ids, Term, { kind: "topic" });
  data.speciality_ids = await validIds(input.speciality_ids, Term, { kind: "speciality" });
  data.related_ids = (await validIds(input.related_ids, Post)).filter((i) => i !== id);
  if (input.published_at === null) {
    delete data.published_at;
    return data;
  }
  const when = new Date(input.published_at);
  if (!input.published_at || Number.isNaN(when.getTime())) fail(422, "Invalid publish date.");
  data.published_at = when.toISOString().replace("Z", "+00:00");
  return data;
}

export const posts = {
  list: async (q: URLSearchParams) => (await Post.find(listQuery(q)).select("-content_html -toc").sort({ updated_at: -1 }).limit(1000)).map((d) => d.toJSON()),
  get: (id: string) => find(Post, id),
  create: async (body: unknown) => save(Post, await postData(body, null), null),
  update: async (id: string, body: unknown) => {
    const existing = await find(Post, id);
    const data = await postData(body, id);
    if (!("published_at" in data) && (existing.published_at ?? "") > now()) data.published_at = existing.status === "published" ? now() : null;
    return save(Post, data, id, {}, Boolean(existing.published_at));
  },
  publish: async (id: string) => {
    const doc = await find(Post, id);
    if (!doc.author_id || !doc.content_html.trim()) fail(422, "Choose an author and add article content before publishing.");
    await Post.updateOne({ _id: oid(id) }, { $set: { status: "published", published_at: doc.published_at || now(), updated_at: now() } });
    return find(Post, id);
  },
  unpublish: async (id: string) => {
    await find(Post, id);
    await Post.updateOne({ _id: oid(id) }, { $set: { status: "draft", updated_at: now() } });
    return find(Post, id);
  },
  remove: async (id: string) => {
    await find(Post, id);
    await Post.deleteOne({ _id: oid(id) });
    await Post.updateMany({ related_ids: id }, { $pull: { related_ids: id } });
    return { ok: true };
  },
  preview: async (id: string) => ({ post: await resolvePost(await find(Post, id)), ctas: await loadCtas() }),
};

export const authors = {
  list: async () => (await Author.find().sort({ group: 1, order: 1, name: 1 }).limit(500)).map((d) => d.toJSON()),
  get: (id: string) => find(Author, id),
  create: (body: unknown) => save(Author, parse(AuthorIn, body), null),
  update: (id: string, body: unknown) => save(Author, parse(AuthorIn, body), id),
  remove: async (id: string) => {
    await find(Author, id);
    const used = await Post.countDocuments({ $or: [{ author_id: id }, { reviewer_id: id }] });
    if (used) fail(409, `This person is the author or reviewer of ${used} post(s). Reassign those posts first.`);
    await Author.deleteOne({ _id: oid(id) });
    return { ok: true };
  },
};

export const terms = {
  list: async (kind: TermKind) => (await Term.find({ kind }).sort({ order: 1, name: 1 }).limit(500)).map((d) => d.toJSON()),
  create: (body: unknown) => {
    const input = parse(TermIn, body);
    return save(Term, input, null, { kind: input.kind });
  },
  update: async (id: string, body: unknown) => {
    const existing = await find(Term, id);
    const input = parse(TermIn, body);
    if (existing.kind !== input.kind) fail(422, "The tag type can't be changed.");
    return save(Term, input, id, { kind: input.kind });
  },
  remove: async (id: string) => {
    const term = await find(Term, id);
    if (term.kind === "resource_type") {
      const used = await Resource.countDocuments({ type_id: id });
      if (used) fail(409, `${used} resource(s) use this type. Change their type first.`);
    }
    const field = ({ topic: "topic_ids", speciality: "speciality_ids" } as Record<string, string>)[term.kind];
    if (field) {
      await Post.updateMany({ [field]: id }, { $pull: { [field]: id } });
      await Resource.updateMany({ [field]: id }, { $pull: { [field]: id } });
    }
    await Term.deleteOne({ _id: oid(id) });
    return { ok: true };
  },
};

async function resourceData(body: unknown) {
  const input = parse(ResourceIn, body);
  const data: Doc = { ...input, body_html: sanitize(input.body_html) };
  if (!(await validIds([input.type_id], Term, { kind: "resource_type" })).length) fail(422, "Choose a resource type.");
  data.topic_ids = await validIds(input.topic_ids, Term, { kind: "topic" });
  data.speciality_ids = await validIds(input.speciality_ids, Term, { kind: "speciality" });
  if (input.published_at === null) delete data.published_at;
  return data;
}

export const resources = {
  list: async () => (await Resource.find().select("-body_html").sort({ updated_at: -1 }).limit(1000)).map((d) => d.toJSON()),
  get: (id: string) => find(Resource, id),
  create: async (body: unknown) => save(Resource, await resourceData(body), null),
  update: async (id: string, body: unknown) => {
    const existing = await find(Resource, id);
    return save(Resource, await resourceData(body), id, {}, Boolean(existing.published_at));
  },
  publish: async (id: string) => {
    const doc = await find(Resource, id);
    const needs: Record<string, string> = { download: doc.file_url, gated: doc.file_url, external: doc.external_url, page: doc.body_html || doc.description };
    if (!needs[doc.delivery]) fail(422, "Add the file, link or content this resource delivers before publishing.");
    await Resource.updateOne({ _id: oid(id) }, { $set: { status: "published", published_at: doc.published_at || now(), updated_at: now() } });
    return find(Resource, id);
  },
  unpublish: async (id: string) => {
    await find(Resource, id);
    await Resource.updateOne({ _id: oid(id) }, { $set: { status: "draft", updated_at: now() } });
    return find(Resource, id);
  },
  remove: async (id: string) => {
    await find(Resource, id);
    await Resource.deleteOne({ _id: oid(id) });
    return { ok: true };
  },
};

export async function updateCtas(body: unknown) {
  const value = parse(CtaSettings, body);
  await Setting.updateOne({ key: "blog_ctas" }, { $set: { value, updated_at: now() } }, { upsert: true });
  return loadCtas();
}
