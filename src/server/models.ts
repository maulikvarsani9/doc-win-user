import mongoose, { Schema, type Model } from "mongoose";

const toJSON = {
  versionKey: false,
  transform: (_doc: unknown, ret: Record<string, unknown>) => {
    ret.id = String(ret._id);
    delete ret._id;
    return ret;
  },
};

function model(name: string, collection: string, fields: Record<string, unknown>): Model<any> {
  if (mongoose.models[name]) return mongoose.models[name];
  return mongoose.model(name, new Schema(fields, { collection, versionKey: false, autoIndex: false, toJSON })) as unknown as Model<any>;
}

const str = { type: String, default: "" };
const ids = { type: [String], default: [] };
const bool = (d: boolean) => ({ type: Boolean, default: d });
const seo = { seo_title: str, seo_description: str };
const stamps = { old_slugs: ids, created_at: str, updated_at: str };

export const User = model("User", "users", { email: String, password_hash: String, name: str, role: { type: String, default: "editor" }, created_at: str });
export const LoginAttempt = model("LoginAttempt", "login_attempts", { identifier: String, count: Number, locked_until: { type: Date, default: null }, at: Date });
export const RateHit = model("RateHit", "rate_hits", { key: String, at: Date });
export const Setting = model("Setting", "settings", { key: String, value: Schema.Types.Mixed, updated_at: str });
export const FileRec = model("FileRec", "files", {
  storage_path: String, original_filename: String, content_type: String, size: Number, kind: String, is_deleted: bool(false), created_at: str,
});
export const Lead = model("Lead", "leads", {
  type: String, name: String, email: String, organization: String, source_path: String, phone: String, specialty: String, country: String,
  message: String, service: String, website: String, role: String, resource_slug: String, marketing_consent: bool(false), consent_at: String, created_at: String,
});

export const Author = model("Author", "authors", {
  ...seo, name: str, slug: str, credential: str, role: str, bio: str, specialties: ids, photo: str, avatar: str, quote: str, linkedin: str,
  group: { type: String, default: "contributor" }, order: { type: Number, default: 0 }, show_on_team: bool(true), ...stamps,
});
export const Term = model("Term", "terms", { ...seo, kind: String, name: str, slug: str, description: str, order: { type: Number, default: 0 }, ...stamps });
export const Post = model("Post", "posts", {
  ...seo, title: str, slug: str, subtitle: str, excerpt: str, content_html: str, cover_image: str, cover_alt: str, author_id: str, reviewer_id: str,
  topic_ids: ids, speciality_ids: ids, related_ids: ids, featured: bool(false), ultimate_guide: bool(false), og_image: str, noindex: bool(false),
  show_audit_inline: bool(true), show_audit_sidebar: bool(true), show_doctor_panel: bool(true), published_at: { type: String, default: null },
  status: { type: String, default: "draft" }, toc: { type: [{ _id: false, id: String, text: String, level: Number }], default: [] },
  reading_time: { type: Number, default: 1 }, ...stamps,
});
export const Resource = model("Resource", "resources", {
  ...seo, title: str, slug: str, type_id: str, description: str, body_html: str, cover_image: str, cover_alt: str,
  delivery: { type: String, default: "page" }, file_url: str, file_name: str, external_url: str, cta_label: str, topic_ids: ids, speciality_ids: ids,
  featured: bool(false), noindex: bool(false), published_at: { type: String, default: null }, status: { type: String, default: "draft" }, ...stamps,
});
