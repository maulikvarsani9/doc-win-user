import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { audiences } from "@/content/audiences";
import { getSitemapData } from "@/lib/cms";

export const dynamic = "force-dynamic";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
type Entry = { path: string; priority: number; changeFrequency: ChangeFrequency };

const revised = new Date("2026-11-10T00:00:00.000Z");

const core: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services/", priority: 0.9, changeFrequency: "weekly" },
  { path: "/who-we-serve/", priority: 0.9, changeFrequency: "weekly" },
  { path: "/blogs/", priority: 0.9, changeFrequency: "daily" },
  { path: "/resources/", priority: 0.9, changeFrequency: "weekly" },
  { path: "/free-marketing-audit/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/team/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy-policy/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookie-policy/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-and-conditions/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/disclaimer/", priority: 0.3, changeFrequency: "yearly" },
];

const termPath = { topic: "topic", speciality: "speciality" } as const;

function when(value?: string | Date | null) {
  if (!value) return revised;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? revised : date;
}

function loc(path: string, priority: number, changeFrequency: ChangeFrequency, lastModified?: string | Date | null): MetadataRoute.Sitemap[number] {
  return { url: `${site.url}${path}`, lastModified: when(lastModified), changeFrequency, priority };
}

async function cmsEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const d = await getSitemapData();
    if (!d) return [];
    return [
      ...d.posts.map((p) => loc(`/blogs/${p.slug}/`, 0.8, "weekly", p.updated_at)),
      ...d.resources.map((r) => loc(`/resources/${r.slug}/`, 0.7, "monthly", r.updated_at)),
      ...d.terms.flatMap((t) => {
        const segment = termPath[t.kind as keyof typeof termPath];
        return segment ? [loc(`/blogs/${segment}/${t.slug}/`, 0.6, "weekly", t.updated_at)] : [];
      }),
      ...d.authors.map((slug) => loc(`/blogs/author/${slug}/`, 0.5, "monthly")),
    ];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    ...core,
    ...services.filter((s) => s.status === "ready-for-review").map((s) => ({ path: `/services/${s.slug}/`, priority: 0.8, changeFrequency: "weekly" as const })),
    ...audiences.filter((a) => a.status === "ready-for-review").map((a) => ({ path: `/who-we-serve/${a.slug}/`, priority: 0.8, changeFrequency: "weekly" as const })),
  ];
  return [...pages.map((p) => loc(p.path, p.priority, p.changeFrequency)), ...(await cmsEntries())];
}
