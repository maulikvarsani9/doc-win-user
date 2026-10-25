import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { audiences } from "@/content/audiences";
import { getSitemapData } from "@/lib/cms";

export const dynamic = "force-dynamic";

const corePaths = ["/", "/services/", "/who-we-serve/", "/contact/", "/free-marketing-audit/", "/about/", "/about/team/", "/blogs/", "/resources/", "/privacy-policy/", "/cookie-policy/", "/terms-and-conditions/", "/disclaimer/"];
const seg = { topic: "topic", speciality: "speciality", resource_type: "" } as const;

async function cmsEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const d = await getSitemapData();
    if (!d) return [];
    const at = (u: string) => (u ? { lastModified: u } : {});
    return [
      ...d.posts.map((p) => ({ url: `${site.url}/blogs/${p.slug}/`, ...at(p.updated_at) })),
      ...d.terms.filter((t) => seg[t.kind]).map((t) => ({ url: `${site.url}/blogs/${seg[t.kind]}/${t.slug}/`, ...at(t.updated_at) })),
      ...d.authors.map((slug) => ({ url: `${site.url}/blogs/author/${slug}/` })),
      ...d.resources.map((r) => ({ url: `${site.url}/resources/${r.slug}/`, ...at(r.updated_at) })),
    ];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const published = [
    ...services.filter((s) => s.status === "ready-for-review").map((s) => `/services/${s.slug}/`),
    ...audiences.filter((a) => a.status === "ready-for-review").map((a) => `/who-we-serve/${a.slug}/`),
  ];
  return [...[...corePaths, ...published].map((p) => ({ url: `${site.url}${p}` })), ...(await cmsEntries())];
}
