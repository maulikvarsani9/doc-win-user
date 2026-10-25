import { z } from "zod";

const text = (n: number) => z.string().trim().max(n).default("");
const slug = z.string().trim().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const idList = (n = 50) => z.array(z.string()).max(n).default([]);
const seo = { seo_title: text(120), seo_description: text(320) };

export const AuthorIn = z.object({
  ...seo, name: z.string().trim().min(1).max(120), slug, credential: text(120), role: text(120), bio: text(1500),
  specialties: z.array(z.string().trim()).max(20).default([]), photo: text(500), avatar: text(500), quote: text(600), linkedin: text(300),
  group: z.enum(["founder", "panel", "contributor"]).default("contributor"), order: z.number().int().default(0), show_on_team: z.boolean().default(true),
});

export const TERM_KINDS = ["topic", "speciality", "resource_type"] as const;
export type TermKind = (typeof TERM_KINDS)[number];
export const TermIn = z.object({ ...seo, kind: z.enum(TERM_KINDS), name: z.string().trim().min(1).max(80), slug, description: text(600), order: z.number().int().default(0) });

export const PostIn = z.object({
  ...seo, title: z.string().trim().min(1).max(200), slug, subtitle: text(300), excerpt: text(400), content_html: z.string().trim().max(400_000).default(""),
  cover_image: text(500), cover_alt: text(200), author_id: text(40), reviewer_id: text(40), topic_ids: idList(), speciality_ids: idList(), related_ids: idList(6),
  featured: z.boolean().default(false), ultimate_guide: z.boolean().default(false), og_image: text(500), noindex: z.boolean().default(false),
  show_audit_inline: z.boolean().default(true), show_audit_sidebar: z.boolean().default(true), show_doctor_panel: z.boolean().default(true),
  published_at: z.string().trim().nullable().default(null),
});

export const ResourceIn = z.object({
  ...seo, title: z.string().trim().min(1).max(200), slug, type_id: z.string().trim().min(1).max(40), description: text(600),
  body_html: z.string().trim().max(400_000).default(""), cover_image: text(500), cover_alt: text(200),
  delivery: z.enum(["page", "download", "gated", "external"]).default("page"), file_url: text(500), file_name: text(200), external_url: text(500),
  cta_label: text(60), topic_ids: idList(), speciality_ids: idList(), featured: z.boolean().default(false), noindex: z.boolean().default(false),
  published_at: z.string().trim().nullable().default(null),
});

const REPORT_IMAGES = ["/images/assets/sample-report-cover.jpg", "/images/assets/sample-report-summary.jpg", "/images/assets/sample-report-categories.jpg"];
const d = (v: string, n: number) => z.string().trim().max(n).default(v);

const AuditCta = z.object({
  inline_enabled: z.boolean().default(true), inline_after_h2: z.number().int().min(1).max(20).default(2),
  inline_headline: d("Before You Spend More on Marketing…", 120),
  inline_body: d("Receive a free personalized marketing audit that evaluates 50 major touchpoints across 10 categories influencing how patients discover and choose your practice.", 400),
  inline_button: d("Get My Free Marketing Audit", 60), href: d("/free-marketing-audit/", 300),
  images: z.array(z.string()).max(4).default(() => [...REPORT_IMAGES]),
  sidebar_enabled: z.boolean().default(true), sidebar_headline: d("Get a Full Diagnosis of Your Marketing", 120),
  sidebar_subheadline: d("A free, category-by-category breakdown across 50 checkpoints.", 200), sidebar_body: d("Your strengths, weaknesses, and a clear action plan.", 300),
  sidebar_button: d("Get My Free Report", 60), mobile_enabled: z.boolean().default(true), mobile_text: d("Get Free Marketing Audit", 60),
});

const DoctorCta = z.object({
  enabled: z.boolean().default(true), position: z.enum(["end", "after_h2"]).default("end"), after_h2: z.number().int().min(1).max(20).default(4),
  headline: d("Every DocWin Client Is Paired With a Practicing Doctor", 120),
  body: d("Who reviews patient-facing content for medical accuracy, ethical communication, and clinical credibility before it goes live.", 400),
  supporting: d("Because in healthcare marketing, one inaccurate claim can damage years of trust.", 300),
  capsule: d("10+ Practicing Doctors on Our Review Panel", 80), button: d("Have Questions? Let's Chat", 60), href: d("/contact/", 300),
  note: d("Medical review covers clinical accuracy and responsible communication. It isn't legal or regulatory advice.", 300),
});

export const CtaSettings = z.object({ audit: AuditCta.default({}), doctor: DoctorCta.default({}) });

const LeadBase = z.object({
  name: z.string().trim().min(1).max(120), email: z.string().trim().email(), organization: z.string().trim().min(1).max(160),
  source_path: d("/", 200), company_fax: text(200),
});
const EbookShape = { role: text(80), marketing_consent: z.boolean().default(false) };

export const LeadSchemas = {
  contact: LeadBase.extend({
    phone: text(40), specialty: text(80), country: z.string().trim().regex(/^([A-Z]{2})?$/).default(""), service: text(120), message: text(2000),
  }),
  audit: LeadBase.extend({
    website: z.string().trim().min(4).max(300).refine((v) => !v.includes(" ") && v.includes("."))
      .transform((v) => (/^https?:\/\//i.test(v) ? v : `https://${v}`)),
    specialty: z.string().trim().min(1).max(80), country: z.string().trim().regex(/^[A-Z]{2}$/),
  }),
  ebook: LeadBase.extend(EbookShape),
  resource: LeadBase.extend({ ...EbookShape, resource_slug: z.string().trim().min(1).max(120) }),
};

export const LoginIn = z.object({ email: z.string().trim().email(), password: z.string().trim().min(1).max(200) });
