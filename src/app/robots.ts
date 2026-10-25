import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  if (!site.allowIndexing) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return { rules: [{ userAgent: "*", allow: ["/", "/api/files/"], disallow: ["/admin/", "/api/"] }], sitemap: `${site.url}/sitemap.xml`, host: site.url };
}
