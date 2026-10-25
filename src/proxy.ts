import { NextResponse, type NextRequest } from "next/server";
import { gonePaths, legacyRedirects } from "@/content/redirects";

const goneHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Page removed | DocWin Digital</title></head><body style="font-family:system-ui;padding:4rem;max-width:40rem"><h1>This page has been removed</h1><p>The content is no longer available. <a href="/who-we-serve/">See who we serve</a> or <a href="/">return home</a>.</p></body></html>`;

const redirectMap = new Map(legacyRedirects.map((r) => [r.from, r.to]));
const canonicalHost = new URL(process.env.NEXT_PUBLIC_SITE_URL!).host;
const apexHost = canonicalHost.replace(/^www\./, "");

const hostOf = (req: NextRequest) => (req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? req.nextUrl.host).split(",")[0].trim().split(":")[0];

const permanent = (req: NextRequest, pathname: string) => {
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? req.nextUrl.host;
  const proto = (req.headers.get("x-forwarded-proto") ?? req.nextUrl.protocol.replace(":", "")).split(",")[0];
  return NextResponse.redirect(`${proto}://${host}${pathname}${req.nextUrl.search}`, 301);
};

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const bare = pathname.replace(/\/+$/, "") || "/";
  const host = hostOf(req);

  if (host === apexHost && apexHost !== canonicalHost) {
    return NextResponse.redirect(`https://${canonicalHost}${pathname}${req.nextUrl.search}`, 301);
  }

  if (gonePaths.includes(bare)) {
    return new NextResponse(goneHtml, { status: 410, headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex" } });
  }
  const target = redirectMap.get(bare);
  if (target) return permanent(req, target);
  if (!pathname.endsWith("/") && !/\.[a-z0-9]+$/i.test(pathname)) return permanent(req, `${pathname}/`);
  const res = NextResponse.next();
  // Only the canonical production host may be indexed; previews and alternate hosts stay out of search.
  if (host !== canonicalHost) res.headers.set("x-robots-tag", "noindex, nofollow");
  return res;
}

export const config = { matcher: ["/((?!_next/|api/|favicon.ico).*)"] };
