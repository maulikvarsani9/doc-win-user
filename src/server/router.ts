import { NextResponse, type NextRequest } from "next/server";
import { connectDb } from "./db";
import { enumParam, boolParam, HttpError, intParam } from "./http";
import { currentUser, login, logout, refresh } from "./auth";
import { listUploads, serveFile, upload } from "./storage";
import { submitLead, type LeadKind } from "./leads";
import { TERM_KINDS } from "./schemas";
import * as pub from "./public";
import * as admin from "./admin";

type Ctx = { req: NextRequest; p: Record<string, string>; q: URLSearchParams; body: () => Promise<unknown> };
type Handler = (c: Ctx) => Promise<unknown> | unknown;
type Route = { method: string; parts: string[]; auth: boolean; handler: Handler };

const routes: Route[] = [];
const add = (method: string, path: string, handler: Handler, auth = false) => routes.push({ method, parts: path.split("/").filter(Boolean), auth, handler });

const postQuery = (q: URLSearchParams): pub.PostQuery => ({
  topic: q.get("topic") ?? "", speciality: q.get("speciality") ?? "", author: q.get("author") ?? "", q: q.get("q") ?? "",
  featured: boolParam(q, "featured"), guide: boolParam(q, "guide"), exclude: q.get("exclude") ?? "",
  page: intParam(q, "page", 1, 1, 1000), per_page: intParam(q, "per_page", 9, 1, 48),
});
const resourceQuery = (q: URLSearchParams): pub.ResourceQuery => ({
  type: q.get("type") ?? "", topic: q.get("topic") ?? "", speciality: q.get("speciality") ?? "", q: q.get("q") ?? "",
  featured: boolParam(q, "featured"), exclude: q.get("exclude") ?? "", page: intParam(q, "page", 1, 1, 1000), per_page: intParam(q, "per_page", 9, 1, 48),
});

add("GET", "health", () => ({ status: "ok" }));
for (const kind of ["contact", "audit", "ebook", "resource"] as LeadKind[]) add("POST", `leads/${kind}`, async (c) => submitLead(kind, c.req, await c.body()));

add("POST", "auth/login", async (c) => login(c.req, await c.body()));
add("POST", "auth/refresh", (c) => refresh(c.req));
add("POST", "auth/logout", () => logout());
add("GET", "auth/me", (c) => currentUser(c.req));

add("GET", "files/*", (c) => serveFile(c.p["*"]));

add("GET", "public/posts", (c) => pub.listPosts(postQuery(c.q)));
add("GET", "public/posts/:slug", (c) => pub.getPost(c.p.slug));
add("GET", "public/terms", (c) => pub.listTerms(enumParam(c.q, "kind", TERM_KINDS), enumParam(c.q, "scope", ["posts", "resources"] as const, "posts")));
add("GET", "public/terms/:kind/:slug", (c) => pub.getTerm(enumParam(new URLSearchParams({ kind: c.p.kind }), "kind", TERM_KINDS), c.p.slug));
add("GET", "public/authors", () => pub.listAuthors());
add("GET", "public/authors/:slug", (c) => pub.getAuthor(c.p.slug));
add("GET", "public/resources", (c) => pub.listResources(resourceQuery(c.q)));
add("GET", "public/resources/:slug", (c) => pub.getResource(c.p.slug));
add("GET", "public/ctas", () => pub.loadCtas());
add("GET", "public/sitemap", () => pub.sitemapData());

add("POST", "admin/uploads", (c) => upload(c.req), true);
add("GET", "admin/uploads", (c) => listUploads(enumParam(c.q, "kind", ["image", "file"] as const, "image")), true);

add("GET", "admin/posts", (c) => admin.posts.list(c.q), true);
add("GET", "admin/posts/:id", (c) => admin.posts.get(c.p.id), true);
add("POST", "admin/posts", async (c) => admin.posts.create(await c.body()), true);
add("PUT", "admin/posts/:id", async (c) => admin.posts.update(c.p.id, await c.body()), true);
add("POST", "admin/posts/:id/publish", (c) => admin.posts.publish(c.p.id), true);
add("POST", "admin/posts/:id/unpublish", (c) => admin.posts.unpublish(c.p.id), true);
add("DELETE", "admin/posts/:id", (c) => admin.posts.remove(c.p.id), true);
add("GET", "admin/preview/posts/:id", (c) => admin.posts.preview(c.p.id), true);

add("GET", "admin/authors", () => admin.authors.list(), true);
add("GET", "admin/authors/:id", (c) => admin.authors.get(c.p.id), true);
add("POST", "admin/authors", async (c) => admin.authors.create(await c.body()), true);
add("PUT", "admin/authors/:id", async (c) => admin.authors.update(c.p.id, await c.body()), true);
add("DELETE", "admin/authors/:id", (c) => admin.authors.remove(c.p.id), true);

add("GET", "admin/terms", (c) => admin.terms.list(enumParam(c.q, "kind", TERM_KINDS)), true);
add("POST", "admin/terms", async (c) => admin.terms.create(await c.body()), true);
add("PUT", "admin/terms/:id", async (c) => admin.terms.update(c.p.id, await c.body()), true);
add("DELETE", "admin/terms/:id", (c) => admin.terms.remove(c.p.id), true);

add("GET", "admin/resources", () => admin.resources.list(), true);
add("GET", "admin/resources/:id", (c) => admin.resources.get(c.p.id), true);
add("POST", "admin/resources", async (c) => admin.resources.create(await c.body()), true);
add("PUT", "admin/resources/:id", async (c) => admin.resources.update(c.p.id, await c.body()), true);
add("POST", "admin/resources/:id/publish", (c) => admin.resources.publish(c.p.id), true);
add("POST", "admin/resources/:id/unpublish", (c) => admin.resources.unpublish(c.p.id), true);
add("DELETE", "admin/resources/:id", (c) => admin.resources.remove(c.p.id), true);

add("GET", "admin/ctas", () => pub.loadCtas(), true);
add("PUT", "admin/ctas", async (c) => admin.updateCtas(await c.body()), true);

function match(route: Route, parts: string[]) {
  const p: Record<string, string> = {};
  for (let i = 0; i < route.parts.length; i++) {
    const seg = route.parts[i];
    if (seg === "*") {
      if (i >= parts.length) return null;
      p["*"] = parts.slice(i).join("/");
      return p;
    }
    if (i >= parts.length) return null;
    if (seg.startsWith(":")) p[seg.slice(1)] = parts[i];
    else if (seg !== parts[i]) return null;
  }
  return route.parts.length === parts.length ? p : null;
}

const error = (status: number, detail: string) => NextResponse.json({ detail }, { status });

export async function dispatch(req: NextRequest) {
  const parts = req.nextUrl.pathname.replace(/^\/api\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
  const found = routes.map((r) => ({ r, p: match(r, parts) })).filter((x) => x.p);
  const hit = found.find((x) => x.r.method === req.method);
  if (!hit) return found.length ? error(405, "Method Not Allowed") : error(404, "Not Found");
  const body = async () => {
    try {
      return await req.json();
    } catch {
      throw new HttpError(422, "Please check these fields: body.");
    }
  };
  try {
    await connectDb();
    if (hit.r.auth) await currentUser(req);
    const out = await hit.r.handler({ req, p: hit.p!, q: req.nextUrl.searchParams, body });
    return out instanceof Response ? out : NextResponse.json(out);
  } catch (e) {
    if (e instanceof HttpError) return error(e.status, e.detail);
    console.error(`API error ${req.method} ${req.nextUrl.pathname}`, e);
    return error(500, "Internal Server Error");
  }
}
