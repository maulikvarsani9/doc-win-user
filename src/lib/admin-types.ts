import type { Author, Ctas, TermKind } from "@/lib/cms";

export interface User { id: string; email: string; name: string; role: string }

type Stamps = { id?: string; old_slugs?: string[]; created_at?: string; updated_at?: string };

export interface AdminPost extends Stamps {
  title: string; slug: string; subtitle: string; excerpt: string; content_html: string; cover_image: string; cover_alt: string;
  author_id: string; reviewer_id: string; topic_ids: string[]; speciality_ids: string[]; related_ids: string[];
  featured: boolean; ultimate_guide: boolean; og_image: string; noindex: boolean;
  show_audit_inline: boolean; show_audit_sidebar: boolean; show_doctor_panel: boolean;
  published_at: string | null; seo_title: string; seo_description: string; status?: "draft" | "published"; reading_time?: number;
}

export type AdminAuthor = Omit<Author, "id"> & Stamps;

export interface AdminTerm extends Stamps { kind: TermKind; name: string; slug: string; description: string; order: number; seo_title: string; seo_description: string }

export interface AdminResource extends Stamps {
  title: string; slug: string; type_id: string; description: string; body_html: string; cover_image: string; cover_alt: string;
  delivery: "page" | "download" | "gated" | "external"; file_url: string; file_name: string; external_url: string; cta_label: string;
  topic_ids: string[]; speciality_ids: string[]; featured: boolean; noindex: boolean; published_at: string | null;
  seo_title: string; seo_description: string; status?: "draft" | "published";
}

export type AdminCtas = Ctas;

export const EMPTY_POST: AdminPost = {
  title: "", slug: "", subtitle: "", excerpt: "", content_html: "", cover_image: "", cover_alt: "", author_id: "", reviewer_id: "",
  topic_ids: [], speciality_ids: [], related_ids: [], featured: false, ultimate_guide: false, og_image: "", noindex: false,
  show_audit_inline: true, show_audit_sidebar: true, show_doctor_panel: true, published_at: null, seo_title: "", seo_description: "",
};

export const EMPTY_AUTHOR: AdminAuthor = {
  name: "", slug: "", credential: "", role: "", bio: "", specialties: [], photo: "", avatar: "", linkedin: "", group: "contributor",
  quote: "", order: 0, show_on_team: false, seo_title: "", seo_description: "",
};

export const EMPTY_RESOURCE: AdminResource = {
  title: "", slug: "", type_id: "", description: "", body_html: "", cover_image: "", cover_alt: "", delivery: "gated", file_url: "",
  file_name: "", external_url: "", cta_label: "", topic_ids: [], speciality_ids: [], featured: false, noindex: false, published_at: null,
  seo_title: "", seo_description: "",
};
