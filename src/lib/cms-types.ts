export type TermKind = "topic" | "speciality" | "resource_type";
export interface TermRef { id: string; name: string; slug: string; kind: TermKind }
export interface Term extends TermRef { description: string; seo_title: string; seo_description: string; count: number; indexable: boolean; updated_at: string }
export interface Author {
  id: string; slug: string; name: string; credential: string; role: string; bio: string; specialties: string[];
  photo: string; avatar: string; linkedin: string; group: "founder" | "panel" | "contributor"; quote: string; order: number;
  show_on_team: boolean; seo_title: string; seo_description: string;
}
export interface PostCard {
  id: string; slug: string; title: string; subtitle: string; excerpt: string; cover_image: string; cover_alt: string;
  published_at: string | null; updated_at: string; reading_time: number; featured: boolean; ultimate_guide: boolean;
  author: Author | null; topics: TermRef[]; specialities: TermRef[];
}
export interface TocItem { id: string; text: string; level: number }
export interface Post extends PostCard {
  content_html: string; toc: TocItem[]; seo_title: string; seo_description: string; og_image: string; noindex: boolean; status: string;
  show_audit_inline: boolean; show_audit_sidebar: boolean; show_doctor_panel: boolean; reviewer: Author | null; related: PostCard[];
}
export interface Ctas {
  audit: {
    inline_enabled: boolean; inline_after_h2: number; inline_headline: string; inline_body: string; inline_button: string; href: string; images: string[];
    sidebar_enabled: boolean; sidebar_headline: string; sidebar_subheadline: string; sidebar_body: string; sidebar_button: string; mobile_enabled: boolean; mobile_text: string;
  };
  doctor: { enabled: boolean; position: "end" | "after_h2"; after_h2: number; headline: string; body: string; supporting: string; capsule: string; button: string; href: string; note: string };
}
export interface ResourceCard {
  id: string; slug: string; title: string; description: string; cover_image: string; cover_alt: string; delivery: "page" | "download" | "gated" | "external";
  cta_label: string; featured: boolean; published_at: string | null; updated_at: string; file_name: string; file_url: string; external_url: string;
  type: TermRef | null; topics: TermRef[]; specialities: TermRef[];
}
export interface Resource extends ResourceCard { body_html: string; seo_title: string; seo_description: string; noindex: boolean }
export interface Paged<T> { items: T[]; total: number; page: number; pages: number }
export type Moved = { redirect: string };

export const media = (u?: string) => u ?? "";

export const isMoved = (r: object | null): r is Moved => !!r && "redirect" in r;
