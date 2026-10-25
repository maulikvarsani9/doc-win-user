import type { PlannedPage } from "./types";
import { blogTeasers } from "./home";

const pending = "Copy will be written after the relevant template is approved.";

const guides: PlannedPage[] = [
  { path: "resources/medical-seo-guide", title: "Medical SEO Guide for Doctors & Clinics", primaryKeyword: "medical SEO guide", supportingKeywords: ["SEO for doctors guide", "medical practice SEO tips", "healthcare SEO best practices"] },
  { path: "resources/healthcare-local-seo-guide", title: "Local SEO & Google Business Profile Guide for Healthcare", primaryKeyword: "healthcare local SEO guide", supportingKeywords: ["Google Business Profile for doctors", "local SEO for medical practices", "doctor local search optimization"] },
  { path: "resources/dental-marketing-guide", title: "Dental Marketing Guide", primaryKeyword: "dental marketing guide", supportingKeywords: ["dental practice marketing ideas", "dentist marketing strategies", "digital marketing for dentists guide"] },
  { path: "resources/medical-website-conversion-guide", title: "Medical Website & Patient Conversion Guide", primaryKeyword: "medical website conversion optimization", supportingKeywords: ["doctor website conversion", "healthcare website user experience", "medical practice website checklist"] },
  { path: "resources/healthcare-marketing-compliance-guide", title: "Healthcare Marketing Privacy & Compliance Guide", primaryKeyword: "healthcare marketing compliance", supportingKeywords: ["HIPAA marketing compliance", "healthcare advertising compliance", "patient privacy in healthcare marketing"] },
  { path: "resources/doctors-guide-to-digital-success", title: "A Doctor's Guide to Digital Success: 15 Digital Growth Strategies", primaryKeyword: "digital marketing guide for doctors", supportingKeywords: ["online marketing for doctors", "medical practice digital marketing", "healthcare marketing checklist"] },
].map((g) => ({ ...g, type: "Resource guide", intro: "An informational guide planned in the approved architecture.", status: "planned" as const }));

const core: PlannedPage[] = [
  { path: "case-studies", title: "Healthcare Marketing Case Studies", type: "Hub", primaryKeyword: "healthcare marketing case studies", supportingKeywords: ["medical marketing case studies", "healthcare SEO case studies"], intro: "Healthcare marketing case studies from DocWin Digital: verified client work, published only with permission and real, measurable outcomes.", status: "hold-proof", reviewNote: "No verified case studies supplied yet." },
];

const posts: PlannedPage[] = blogTeasers.map((p) => ({
  path: `blogs/${p.slug}`, title: p.title, type: "Blog article", intro: p.excerpt ?? `By ${p.author}.`, status: "planned",
  reviewNote: "Article migration from the current site is pending.",
}));

export const plannedPages = [...core, ...guides, ...posts].map((p) => ({ ...p, intro: p.intro || pending }));
export const plannedByPath = (path: string) => plannedPages.find((p) => p.path === path);
