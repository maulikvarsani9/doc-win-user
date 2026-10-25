import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [];

export const caseStudyPreview: CaseStudy = {
  slug: "preview",
  client: "[Client name]",
  industry: "[Industry, e.g. Multispecialty clinic]",
  location: "[City, Country]",
  timeframe: "[e.g. 6 months]",
  services: ["medical-seo", "google-business-profile-listing-management", "medical-website-design"],
  headline: "[Outcome-led headline, e.g. How a three-location clinic made it easier for new patients to book]",
  summary: "[Two sentences: who the client is, what they needed, and the verified outcome. Replace before publishing.]",
  metrics: [
    { value: "[+00%]", label: "[Verified metric with period and source]" },
    { value: "[00]", label: "[Second verified metric]" },
    { value: "[0.0]", label: "[Third verified metric]" },
  ],
  challenge: [
    "[Describe the starting point in the client's words: what wasn't working, and why it mattered for patients.]",
    "[Note any constraints: budget, approvals, platform policies or privacy requirements.]",
  ],
  approach: [
    { title: "[Step title]", body: "[What DocWin did, specific to this client.]" },
    { title: "[Step title]", body: "[How the work was reviewed, including medical review where it applied.]" },
    { title: "[Step title]", body: "[What changed on the website, listings or campaigns.]" },
  ],
  results: ["[Verified result with time period]", "[Second verified result]", "[Qualitative outcome confirmed by the client]"],
  quote: { text: "[Approved client quote]", name: "[Name]", role: "[Role, organization]" },
};
