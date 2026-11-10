import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { audiences } from "@/content/audiences";
import { getSitemapData } from "@/lib/cms";
import { publicUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
type Entry = { path: string; changeFrequency: ChangeFrequency };

const revised = new Date("2026-11-10T00:00:00.000Z");

const core: Entry[] = [
  { path: "/", changeFrequency: "weekly" },
  { path: "/services", changeFrequency: "weekly" },
  { path: "/who-we-serve", changeFrequency: "weekly" },
  { path: "/blogs", changeFrequency: "daily" },
  { path: "/resources", changeFrequency: "weekly" },
  { path: "/free-marketing-audit", changeFrequency: "weekly" },
  { path: "/contact", changeFrequency: "weekly" },
  { path: "/about", changeFrequency: "weekly" },
  { path: "/about/team", changeFrequency: "weekly" },
  { path: "/privacy-policy", changeFrequency: "yearly" },
  { path: "/cookie-policy", changeFrequency: "yearly" },
  { path: "/terms-and-conditions", changeFrequency: "yearly" },
  { path: "/disclaimer", changeFrequency: "yearly" },
];

const termPath = { topic: "topic", speciality: "speciality" } as const;

function when(value?: string | Date | null) {
  if (!value) return revised;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? revised : date;
}

function loc(path: string, changeFrequency: ChangeFrequency, lastModified?: string | Date | null): MetadataRoute.Sitemap[number] {
  return { url: publicUrl(path), lastModified: when(lastModified), changeFrequency, priority: path === "/" ? 1 : 0.9 };
}

async function cmsEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const d = await getSitemapData();
    if (!d) return [];
    return [
      ...d.posts.map((p) => loc(`/blogs/${p.slug}`, "weekly", p.updated_at)),
      ...d.resources.map((r) => loc(`/resources/${r.slug}`, "weekly", r.updated_at)),
      ...d.terms.flatMap((t) => {
        const segment = termPath[t.kind as keyof typeof termPath];
        return segment ? [loc(`/blogs/${segment}/${t.slug}`, "weekly", t.updated_at)] : [];
      }),
      ...d.authors.map((slug) => loc(`/blogs/author/${slug}`, "weekly")),
    ];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    ...core,
    ...services.filter((s) => s.status === "ready-for-review").map((s) => ({ path: `/services/${s.slug}`, changeFrequency: "weekly" as const })),
    ...audiences.filter((a) => a.status === "ready-for-review").map((a) => ({ path: `/who-we-serve/${a.slug}`, changeFrequency: "weekly" as const })),
  ];
  return [...pages.map((p) => loc(p.path, p.changeFrequency)), ...(await cmsEntries())];
}
