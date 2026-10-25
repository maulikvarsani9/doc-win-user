import { Author, Post, Resource, Setting, Term } from "./models";
import { escapeRegex, fail, now, oids, pick } from "./http";
import { CtaSettings, type TermKind } from "./schemas";

type Doc = Record<string, any>;
type Map = Record<string, Doc>;
const MIN_INDEXABLE = 3;
const PUBLISHED = { status: "published" };
export const live = () => ({ ...PUBLISHED, published_at: { $lte: now() } });
const AUTHOR_FIELDS = ["id", "slug", "name", "credential", "role", "bio", "specialties", "photo", "avatar", "linkedin", "group", "quote", "order", "show_on_team", "seo_title", "seo_description"];
const CARD_FIELDS = ["id", "slug", "title", "subtitle", "excerpt", "cover_image", "cover_alt", "published_at", "updated_at", "reading_time", "featured", "ultimate_guide"];
const TERM_FIELD: Record<string, string> = { topic: "topic_ids", speciality: "speciality_ids" };

const json = (docs: { toJSON(): Doc }[]) => docs.map((d) => d.toJSON());
const byId = (docs: Doc[]) => Object.fromEntries(docs.map((d) => [d.id, d]));
const authorsMap = async (): Promise<Map> => byId(json(await Author.find().limit(500)));
const termsMap = async (): Promise<Map> => byId(json(await Term.find().limit(1000)));

const authorCard = (a?: Doc | null) => (a ? pick(a, AUTHOR_FIELDS) : null);
const termRef = (t?: Doc | null) => (t ? pick(t, ["id", "name", "slug", "kind"]) : null);
const refs = (list: string[], terms: Map) => list.filter((i) => i in terms).map((i) => termRef(terms[i]));

const postCard = (p: Doc, authors: Map, terms: Map) => ({
  ...pick(p, CARD_FIELDS), author: authorCard(authors[p.author_id]), topics: refs(p.topic_ids, terms), specialities: refs(p.speciality_ids, terms),
});

async function related(p: Doc, authors: Map, terms: Map, limit = 3) {
  let picked: Doc[] = [];
  const manual = oids(p.related_ids);
  if (manual.length) {
    const found = byId(json(await Post.find({ ...live(), _id: { $in: manual } }).select("-content_html")));
    picked = p.related_ids.filter((i: string) => i in found).map((i: string) => found[i]);
  }
  for (const extra of [{ $or: [{ topic_ids: { $in: p.topic_ids } }, { speciality_ids: { $in: p.speciality_ids } }] }, {}]) {
    if (picked.length >= limit) break;
    const skip = oids([p.id, ...picked.map((x) => x.id)]);
    const docs = await Post.find({ ...live(), ...extra, _id: { $nin: skip } }).select("-content_html").sort({ published_at: -1 }).limit(limit - picked.length);
    picked = [...picked, ...json(docs)];
  }
  return picked.slice(0, limit).map((x) => postCard(x, authors, terms));
}

export async function resolvePost(p: Doc) {
  const [authors, terms] = [await authorsMap(), await termsMap()];
  return {
    ...postCard(p, authors, terms),
    ...pick(p, ["content_html", "toc", "seo_title", "seo_description", "og_image", "noindex", "status", "show_audit_inline", "show_audit_sidebar", "show_doctor_panel"]),
    reviewer: p.reviewer_id !== p.author_id ? authorCard(authors[p.reviewer_id]) : null,
    related: await related(p, authors, terms),
  };
}

export async function loadCtas() {
  const stored = await Setting.findOne({ key: "blog_ctas" }).lean<{ value?: unknown }>();
  return CtaSettings.parse(stored?.value ?? {});
}

const termBySlug = (terms: Map, kind: string, slug: string) => Object.values(terms).find((t) => t.kind === kind && t.slug === slug);
const paging = (total: number, page: number, perPage: number) => ({ total, page, pages: Math.max(1, Math.ceil(total / perPage)) });
const search = (q: string) => {
  const rx = { $regex: escapeRegex(q.trim().slice(0, 100)), $options: "i" };
  return { $or: [{ title: rx }, { subtitle: rx }, { excerpt: rx }, { description: rx }] };
};
const excludeIds = (exclude?: string) => ({ $nin: oids((exclude ?? "").split(",")) });

export type PostQuery = { topic?: string; speciality?: string; author?: string; q?: string; featured?: boolean; guide?: boolean; exclude?: string; page?: number; per_page?: number };

export async function listPosts({ topic = "", speciality = "", author = "", q = "", featured, guide, exclude = "", page = 1, per_page = 9 }: PostQuery) {
  const [authors, terms] = [await authorsMap(), await termsMap()];
  const query: Doc = live();
  for (const [kind, slug] of [["topic", topic], ["speciality", speciality]]) {
    if (slug) query[TERM_FIELD[kind]] = termBySlug(terms, kind, slug)?.id ?? "__none__";
  }
  if (author) {
    const aid = Object.values(authors).find((a) => a.slug === author)?.id ?? "__none__";
    query.$and = [{ $or: [{ author_id: aid }, { reviewer_id: aid }] }];
  }
  if (q.trim()) Object.assign(query, search(q));
  if (featured !== undefined) query.featured = featured;
  if (guide !== undefined) query.ultimate_guide = guide;
  if (exclude) query._id = excludeIds(exclude);
  const total = await Post.countDocuments(query);
  const docs = await Post.find(query).select("-content_html").sort({ published_at: -1 }).skip((page - 1) * per_page).limit(per_page);
  return { items: json(docs).map((d) => postCard(d, authors, terms)), ...paging(total, page, per_page) };
}

export async function getPost(slug: string) {
  const found = await Post.findOne({ ...live(), slug });
  if (found) return { post: await resolvePost(found.toJSON()), ctas: await loadCtas() };
  const moved = await Post.findOne({ ...live(), old_slugs: slug }).select("slug").lean<{ slug: string }>();
  return moved ? { redirect: moved.slug } : fail(404, "Not found");
}

async function counts(kind: TermKind, scope: "posts" | "resources" = "posts") {
  const c: Record<string, number> = {};
  const add = (i: string) => (c[i] = (c[i] ?? 0) + 1);
  if (kind === "resource_type") {
    (await Resource.find(PUBLISHED).select("type_id").lean<Doc[]>()).forEach((d) => add(d.type_id));
    return c;
  }
  const field = TERM_FIELD[kind];
  const Model = scope === "posts" ? Post : Resource;
  (await Model.find(scope === "posts" ? live() : PUBLISHED).select(field).lean<Doc[]>()).forEach((d) => (d[field] ?? []).forEach(add));
  return c;
}

const termOut = (t: Doc, c: Record<string, number>) => {
  const { old_slugs: _o, created_at: _c, ...rest } = t;
  const count = c[t.id] ?? 0;
  return { ...rest, count, indexable: count >= (t.kind === "resource_type" ? 1 : MIN_INDEXABLE) };
};

export async function listTerms(kind: TermKind, scope: "posts" | "resources" = "posts") {
  const c = await counts(kind, scope);
  return json(await Term.find({ kind }).sort({ order: 1, name: 1 }).limit(500)).map((t) => termOut(t, c));
}

export async function getTerm(kind: TermKind, slug: string) {
  const found = await Term.findOne({ kind, slug });
  if (found) return { term: termOut(found.toJSON(), await counts(kind)) };
  const moved = await Term.findOne({ kind, old_slugs: slug }).select("slug").lean<{ slug: string }>();
  return moved ? { redirect: moved.slug } : fail(404, "Not found");
}

export async function listAuthors() {
  return json(await Author.find().sort({ order: 1, name: 1 }).limit(500)).map(authorCard);
}

export async function getAuthor(slug: string) {
  const found = await Author.findOne({ slug });
  if (found) {
    const a = found.toJSON();
    const post_count = await Post.countDocuments({ ...live(), $or: [{ author_id: a.id }, { reviewer_id: a.id }] });
    return { author: authorCard(a), post_count };
  }
  const moved = await Author.findOne({ old_slugs: slug }).select("slug").lean<{ slug: string }>();
  return moved ? { redirect: moved.slug } : fail(404, "Not found");
}

const resourceCard = (r: Doc, terms: Map) => ({
  ...pick(r, ["id", "slug", "title", "description", "cover_image", "cover_alt", "delivery", "cta_label", "featured", "published_at", "updated_at", "file_name"]),
  type: termRef(terms[r.type_id]), topics: refs(r.topic_ids, terms), specialities: refs(r.speciality_ids, terms),
  file_url: r.delivery === "download" ? r.file_url : "", external_url: r.delivery === "external" ? r.external_url : "",
});

export type ResourceQuery = { type?: string; topic?: string; speciality?: string; q?: string; featured?: boolean; exclude?: string; page?: number; per_page?: number };

export async function listResources({ type = "", topic = "", speciality = "", q = "", featured, exclude = "", page = 1, per_page = 9 }: ResourceQuery) {
  const terms = await termsMap();
  const query: Doc = { ...PUBLISHED };
  for (const [kind, slug, field] of [["resource_type", type, "type_id"], ["topic", topic, "topic_ids"], ["speciality", speciality, "speciality_ids"]]) {
    if (slug) query[field] = termBySlug(terms, kind, slug)?.id ?? "__none__";
  }
  if (q.trim()) Object.assign(query, search(q));
  if (featured !== undefined) query.featured = featured;
  if (exclude) query._id = excludeIds(exclude);
  const total = await Resource.countDocuments(query);
  const docs = await Resource.find(query).select("-body_html").sort({ published_at: -1 }).skip((page - 1) * per_page).limit(per_page);
  return { items: json(docs).map((r) => resourceCard(r, terms)), ...paging(total, page, per_page) };
}

export async function getResource(slug: string) {
  const found = await Resource.findOne({ ...PUBLISHED, slug });
  if (found) {
    const r = found.toJSON();
    return { resource: { ...resourceCard(r, await termsMap()), ...pick(r, ["body_html", "seo_title", "seo_description", "noindex"]) } };
  }
  const moved = await Resource.findOne({ ...PUBLISHED, old_slugs: slug }).select("slug").lean<{ slug: string }>();
  return moved ? { redirect: moved.slug } : fail(404, "Not found");
}

export async function sitemapData() {
  const posts = await Post.find({ ...live(), noindex: { $ne: true } }).select("slug updated_at author_id reviewer_id").lean<Doc[]>();
  const resources = await Resource.find({ ...PUBLISHED, noindex: { $ne: true } }).select("slug updated_at").lean<Doc[]>();
  const terms: Doc[] = [];
  for (const kind of ["topic", "speciality"] as const) {
    const c = await counts(kind);
    const docs = await Term.find({ kind }).limit(500).lean<Doc[]>();
    terms.push(...docs.filter((t) => (c[String(t._id)] ?? 0) >= MIN_INDEXABLE).map((t) => ({ kind, slug: t.slug, updated_at: t.updated_at ?? "" })));
  }
  const withPosts = new Set(posts.flatMap((p) => [p.author_id, p.reviewer_id]));
  const authors = Object.values(await authorsMap()).filter((a) => withPosts.has(a.id)).map((a) => a.slug);
  const slim = (docs: Doc[]) => docs.map((d) => ({ slug: d.slug, updated_at: d.updated_at ?? "" }));
  return { posts: slim(posts), resources: slim(resources), terms, authors };
}
