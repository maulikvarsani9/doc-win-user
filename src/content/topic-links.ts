import { serviceBySlug } from "./services";
import { audienceBySlug } from "./audiences";

// Blog topic slug -> the service page that owns the commercial intent for that topic
export const topicServices: Record<string, string[]> = {
  "medical-seo": ["medical-seo"],
  "local-seo": ["google-business-profile-listing-management", "medical-seo"],
  "paid-advertising": ["google-ads-healthcare", "meta-ads-healthcare"],
  "websites-conversion": ["medical-website-design"],
  "reputation-reviews": ["healthcare-reputation-management"],
  "content-marketing": ["healthcare-content-marketing"],
  "social-media": ["healthcare-social-media-marketing"],
  "strategy-growth": ["healthcare-marketing-strategy"],
  "compliance-ethics": ["data-management"],
};

export const topicForService = (slug: string) => Object.keys(topicServices).find((t) => topicServices[t][0] === slug);

export function relatedPages(topics: string[], specialities: string[]) {
  const services = [...new Set(topics.flatMap((t) => topicServices[t] ?? []))].map(serviceBySlug).filter((s) => s && s.status === "ready-for-review");
  const industries = specialities.map(audienceBySlug).filter((a) => a && a.status === "ready-for-review");
  return [
    ...services.map((s) => ({ href: `/services/${s!.slug}/`, label: s!.name, slug: s!.slug })),
    ...industries.map((a) => ({ href: `/who-we-serve/${a!.slug}/`, label: a!.linkLabel, slug: a!.slug })),
  ].slice(0, 5);
}
