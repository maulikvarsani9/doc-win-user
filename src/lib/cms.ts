import { cache } from "react";
import { unstable_cache } from "next/cache";
import { connection } from "next/server";
import { founders as staticFounders, panel as staticPanel, type Person } from "@/content/team";
import { connectDb } from "@/server/db";
import { HttpError } from "@/server/http";
import * as pub from "@/server/public";
import type { Author, Moved, Paged, Post, PostCard, Ctas, Resource, ResourceCard, Term, TermKind } from "./cms-types";
import { media } from "./cms-types";

export * from "./cms-types";

async function call<T>(name: string, fn: () => Promise<unknown>, args: unknown[] = [], revalidate?: number): Promise<T | null> {
  if (!revalidate) await connection();
  const run = async () => {
    await connectDb();
    return fn();
  };
  try {
    return (await (revalidate ? unstable_cache(run, ["cms", name, JSON.stringify(args)], { revalidate, tags: ["cms"] })() : run())) as T;
  } catch (e) {
    if (e instanceof HttpError && e.status === 404) return null;
    throw e;
  }
}

const emptyPage = { items: [], total: 0, page: 1, pages: 1 };

export type PostQuery = pub.PostQuery;
export type ResourceQuery = pub.ResourceQuery;
export const getPosts = cache((p: PostQuery, revalidate?: number) =>
  call<Paged<PostCard>>("posts", () => pub.listPosts(p), [p], revalidate).then((r) => r ?? emptyPage));
export const getPost = cache((slug: string) => call<{ post: Post; ctas: Ctas } | Moved>("post", () => pub.getPost(slug)));
export const getTerms = cache((kind: TermKind, scope: "posts" | "resources" = "posts") => call<Term[]>("terms", () => pub.listTerms(kind, scope)).then((r) => r ?? []));
export const getTerm = cache((kind: TermKind, slug: string) => call<{ term: Term } | Moved>("term", () => pub.getTerm(kind, slug)));
export const getAuthor = cache((slug: string) => call<{ author: Author; post_count: number } | Moved>("author", () => pub.getAuthor(slug)));
export const getResources = cache((p: ResourceQuery) => call<Paged<ResourceCard>>("resources", () => pub.listResources(p)).then((r) => r ?? emptyPage));
export const getResource = cache((slug: string) => call<{ resource: Resource } | Moved>("resource", () => pub.getResource(slug)));
export const getSitemapData = () =>
  call<{ posts: { slug: string; updated_at: string }[]; resources: { slug: string; updated_at: string }[]; terms: { kind: TermKind; slug: string; updated_at: string }[]; authors: string[] }>(
    "sitemap", () => pub.sitemapData());

const toPerson = (a: Author): Person => ({ slug: a.slug, name: a.name, credential: a.credential, role: a.role, quote: a.quote, bio: a.bio, photo: media(a.photo), avatar: media(a.avatar) });

export async function getTeam(): Promise<{ founders: Person[]; panel: Person[] }> {
  try {
    const authors = (await call<Author[]>("authors", () => pub.listAuthors(), [], 60)) ?? [];
    const pick = (g: Author["group"]) => authors.filter((a) => a.group === g && a.show_on_team).map(toPerson);
    const founders = pick("founder");
    if (!founders.length) throw new Error("No authors");
    return { founders, panel: pick("panel") };
  } catch {
    return { founders: staticFounders, panel: staticPanel };
  }
}
