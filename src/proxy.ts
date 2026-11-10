import { NextResponse, type NextRequest } from "next/server";
import { gonePaths, legacyRedirects } from "@/content/redirects";
import { site } from "@/content/site";

const goneHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Page removed | DocWin Digital</title></head><body style="font-family:system-ui;padding:4rem;max-width:40rem"><h1>This page has been removed</h1><p>The content is no longer available. <a href="/who-we-serve">See who we serve</a> or <a href="/">return home</a>.</p></body></html>`;

const redirectMap = new Map(legacyRedirects.map((r) => [r.from.replace(/\/+$/, "") || "/", r.to.replace(/\/+$/, "") || "/"]));
const canonicalHost = new URL(site.url).host;

const hostOf = (req: NextRequest) => (req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? req.nextUrl.host).split(",")[0].trim().split(":")[0];

const redirectTo = (req: NextRequest, pathname: string) => {
  const search = req.nextUrl.search;
  const host = hostOf(req);
  if (host === canonicalHost || host === `www.${canonicalHost}`) return NextResponse.redirect(`${site.url}${pathname}${search}`, 301);
  const rawHost = (req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? req.nextUrl.host).split(",")[0].trim();
  const proto = (req.headers.get("x-forwarded-proto") ?? req.nextUrl.protocol.replace(":", "")).split(",")[0].trim();
  return NextResponse.redirect(`${proto}://${rawHost}${pathname}${search}`, 301);
};

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const host = hostOf(req);

  if (gonePaths.includes(path)) {
    return new NextResponse(goneHtml, { status: 410, headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex" } });
  }
  const target = redirectMap.get(path);
  if (target) return redirectTo(req, target);
  if (host === `www.${canonicalHost}` || path !== pathname) return redirectTo(req, path);
  const res = NextResponse.next();
  // Only the canonical production host may be indexed; previews and alternate hosts stay out of search.
  if (host !== canonicalHost) res.headers.set("x-robots-tag", "noindex, nofollow");
  return res;
}

export const config = { matcher: ["/((?!_next/|api/|favicon.ico).*)"] };
