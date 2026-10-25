import { testimonials, type Testimonial } from "./home";

export type StatId = "growth" | "rank" | "rating" | "doctors" | "cost" | "panel";

export const stats: Record<StatId, { value: string; label: string }> = {
  growth: { value: "150%", label: "Average patient increase" },
  rank: { value: "#1", label: "Google rankings for client keywords" },
  rating: { value: "4.9/5", label: "Client satisfaction rating" },
  doctors: { value: "100+", label: "Doctors served" },
  cost: { value: "60%", label: "Lower patient acquisition cost" },
  panel: { value: "10+", label: "Practicing doctors on our review panel" },
};

const B2B_STATS: StatId[] = ["doctors", "rating"];

const serviceCategoryStats: Record<string, StatId[]> = {
  "search-visibility": ["rank", "growth", "rating"],
  "paid-advertising": ["cost", "growth", "rating"],
  "websites-reputation": ["growth", "rating", "doctors"],
  "content-engagement": ["rank", "rating", "doctors"],
  "brand-creative": ["rating", "doctors", "growth"],
  "strategy-growth": ["growth", "cost", "rating"],
  "technology-data": ["rating", "doctors", "growth"],
};

const audienceGroupStats: Record<string, StatId[]> = {
  "medical-dental-practices": ["growth", "rank", "rating"],
  "clinics-hospitals-care": ["growth", "cost", "rating"],
  "specialized-consumer": ["rank", "rating", "doctors"],
  "technology-b2b": B2B_STATS,
};

export const hubStats: Record<"services" | "audiences" | "team", StatId[]> = {
  services: ["growth", "rank", "rating"],
  audiences: ["doctors", "growth", "rating"],
  team: ["doctors", "rating"],
};

export const b2bPages = new Set(["healthtech-startups", "digital-health", "medical-device-medtech", "pharma-biotech", "consumer-health-wellness-nutraceuticals", "b2b-healthcare-marketing"]);

const RB = "Dr. Richard Bowman", NK = "Dr. Nasreen Khan", DW = "Dr. Deborah Whitfield", MT = "Dr. Michelle Tanaka";
const MJ = "Dr. Marcus Jefferson", GS = "Dr. Gregory Sullivan", RW = "Dr. Renee Washington", CA = "Dr. Colin Ashford";

const serviceQuoteMap: Record<string, string[]> = {
  "medical-seo": [RB, RW], "google-business-profile-listing-management": [MJ, RW], "healthcare-ai-search-visibility": [GS],
  "google-ads-healthcare": [GS], "meta-ads-healthcare": [RW], "medical-website-design": [MT, NK],
  "healthcare-reputation-management": [RW, GS], "healthcare-social-media-marketing": [DW], "healthcare-content-marketing": [DW, NK],
  "healthcare-email-marketing": [RB], "healthcare-marketing-automation": [MJ], "healthcare-branding": [MT, RB],
  "healthcare-graphic-design": [RB], "healthcare-video-production": [DW], "healthcare-marketing-strategy": [CA, GS],
  "b2b-healthcare-marketing": [GS], "healthcare-software-app-development": [NK], "data-management": [MJ],
};

const audienceQuoteMap: Record<string, string[]> = {
  "doctors-medical-practices": [RB, GS], "dental-practices": [MT, GS], "orthopedic-practices": [MJ, RB],
  "cardiology-practices": [NK, CA], "dermatology-skin-clinics": [GS, DW], "ob-gyn-womens-health": [DW, GS],
  "pediatric-practices": [NK, RB], "ophthalmology-eye-care": [GS, NK], "physical-therapy-physiotherapy": [MJ, RB],
  "medical-clinics-multispecialty-groups": [MJ, NK], hospitals: [NK, DW], "multi-location-healthcare-groups": [MJ, RW],
  "senior-care": [RB, DW], "diagnostic-labs-imaging-centers": [RW, GS], "oncology-cancer-care": [DW, NK],
  "healthtech-startups": [GS], "digital-health": [GS], "medical-device-medtech": [GS], "pharma-biotech": [GS],
  "mental-behavioral-health": [DW, GS], "addiction-treatment-rehab": [DW, RW], "fertility-ivf-clinics": [DW, NK],
  "holistic-health": [RB, GS], "consumer-health-wellness-nutraceuticals": [GS], veterinary: [GS, RB],
};

export const hubQuotes = { services: [CA, RW], audiences: [DW, MJ], team: [DW] };

export const quotes = (names: string[] = []): Testimonial[] => names.map((n) => testimonials.find((t) => t.name === n)).filter((t): t is Testimonial => !!t);
export const statList = (ids: StatId[]) => ids.map((id) => ({ id, ...stats[id] }));

export const serviceProof = (slug: string, category: string) => ({
  stats: statList(b2bPages.has(slug) ? B2B_STATS : serviceCategoryStats[category]),
  quotes: quotes(serviceQuoteMap[slug]),
  b2b: b2bPages.has(slug),
});

const logoFirst: Record<string, string[]> = {
  "dental-practices": ["pearldent"], "cardiology-practices": ["heartline"], "orthopedic-practices": ["movewell"],
  "physical-therapy-physiotherapy": ["movewell"], hospitals: ["greenfield"], "medical-clinics-multispecialty-groups": ["greenfield"],
  "multi-location-healthcare-groups": ["greenfield"], "senior-care": ["greenfield"], "holistic-health": ["naturoveda"],
};

const ctaPhotos: Record<string, "dental" | "mental" | "pharma"> = {
  "dental-practices": "dental", "mental-behavioral-health": "mental", "pharma-biotech": "pharma",
};

export const audienceProof = (slug: string, group: string) => ({
  logos: logoFirst[slug] ?? [],
  ctaPhoto: ctaPhotos[slug],
  stats: statList(b2bPages.has(slug) ? B2B_STATS : audienceGroupStats[group]),
  quotes: quotes(audienceQuoteMap[slug]),
  b2b: b2bPages.has(slug),
});
