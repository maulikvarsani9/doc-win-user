import { Author, FileRec, Post, RateHit, Resource, Setting, Term } from "./models";
import { connectDb } from "./db";
import { now } from "./http";
import { processArticle } from "./html";
import { seedAdmin } from "./auth";
import { initStorage } from "./storage";
import { RATE_WINDOW } from "./leads";
import * as sample from "./sample";

const REVIEWER = "Medical Review Panel";
const ARBAZ_CREDENTIAL = "Healthcare Marketer & Health-Tech Founder";
const ARBAZ_BIO = "Arbaz Fatmi is a healthcare marketer and health-tech founder. He co-founded DocWin Digital after years of seeing generic agencies fail healthcare clients, and he is also the founder of Himsure, India's first 360° sexual health platform.";

const TEAM = [
  { slug: "wali-rahmani", name: "Dr. Wali Rahmani", credential: "MD (Medicine)", role: "Co-Founder & Chief Medical Officer", group: "founder",
    bio: "Dr. Wali Rahmani is a physician who built his own practice from the ground up and co-founded DocWin Digital with his childhood friend, Arbaz Fatmi.",
    quote: "Having built my own practice from the ground up, I understand the frustration of working with marketers who don't understand healthcare. That's why we created DocWin Digital: to give doctors the marketing partner they deserve." },
  { slug: "arbaz-fatmi", name: "Arbaz Fatmi", credential: ARBAZ_CREDENTIAL, role: "Co-Founder & Chief Marketing Officer", group: "founder", bio: ARBAZ_BIO,
    quote: "After years of seeing generic agencies fail healthcare clients, I partnered with my childhood friend, Dr. Wali, to create what the industry was missing: healthcare marketing by healthcare insiders." },
  { slug: "nehan-fatima", name: "Dr. Nehan Fatima", credential: "MS Ophthalmology", role: REVIEWER, group: "panel" },
  { slug: "yasir-niyazi", name: "Dr. Yasir Niyazi", credential: "MS Orthopedics", role: REVIEWER, group: "panel" },
  { slug: "pooja-singh", name: "Dr. Pooja Singh", credential: "MD Paediatric", role: REVIEWER, group: "panel" },
  { slug: "chesta-gupta", name: "Dr. Chesta Gupta", credential: "DNB Anesthesia", role: REVIEWER, group: "panel" },
  { slug: "ankit-faujdar", name: "Dr. Ankit Faujdar", credential: "MBBS", role: REVIEWER, group: "panel" },
  { slug: "eshan-rao", name: "Dr. Eshan Rao", credential: "MBBS, RMO", role: REVIEWER, group: "panel" },
  { slug: "abu-obaida", name: "Dr. Abu Obaida", credential: "MBBS", role: REVIEWER, group: "panel" },
];

const RESOURCE_TYPES = [["Ebook", "ebooks"], ["Guide", "guides"], ["Template", "templates"], ["Checklist", "checklists"], ["Sample report", "sample-reports"]];
const TOPICS = [["Medical SEO", "medical-seo"], ["Local SEO", "local-seo"], ["Paid Advertising", "paid-advertising"], ["Websites & Conversion", "websites-conversion"],
  ["Reputation & Reviews", "reputation-reviews"], ["Content Marketing", "content-marketing"], ["Social Media", "social-media"],
  ["Strategy & Growth", "strategy-growth"], ["Compliance & Ethics", "compliance-ethics"]];
const SPECIALITIES = [
  ["Doctors & Medical Practices", "doctors-medical-practices"], ["Dental Practices", "dental-practices"], ["Orthopedics", "orthopedic-practices"],
  ["Cardiology", "cardiology-practices"], ["Dermatology", "dermatology-skin-clinics"], ["OB-GYN & Women's Health", "ob-gyn-womens-health"],
  ["Pediatrics", "pediatric-practices"], ["Ophthalmology & Eye Care", "ophthalmology-eye-care"], ["Physical Therapy", "physical-therapy-physiotherapy"],
  ["Clinics & Multispecialty Groups", "medical-clinics-multispecialty-groups"], ["Hospitals & Health Systems", "hospitals"],
  ["Multi-Location Groups", "multi-location-healthcare-groups"], ["Senior Care", "senior-care"], ["Diagnostic Labs & Imaging", "diagnostic-labs-imaging-centers"],
  ["Oncology", "oncology-cancer-care"], ["Healthcare Startups", "healthtech-startups"], ["Healthcare SaaS & Telehealth", "digital-health"],
  ["Medical Devices & MedTech", "medical-device-medtech"], ["Pharma & Biotech", "pharma-biotech"], ["Mental & Behavioral Health", "mental-behavioral-health"],
  ["Addiction Treatment", "addiction-treatment-rehab"], ["Fertility & IVF", "fertility-ivf-clinics"], ["Holistic Health", "holistic-health"],
  ["Consumer Health & Wellness", "consumer-health-wellness-nutraceuticals"], ["Veterinary", "veterinary"],
];

async function seedAuthors() {
  if (await Author.countDocuments()) return;
  const stamp = now();
  await Author.insertMany(TEAM.map((p, i) => ({ ...p, order: i, photo: `/images/team/${p.slug}.jpg`, avatar: `/images/team/faces/${p.slug}.jpg`, created_at: stamp, updated_at: stamp })));
}

// One-time refresh of the original seeded profile; skipped once an admin has edited it.
const updateArbaz = () =>
  Author.updateOne({ slug: "arbaz-fatmi", credential: "Healthcare Marketing Expert" }, { $set: { credential: ARBAZ_CREDENTIAL, bio: ARBAZ_BIO, updated_at: now() } });

const termDocs = (kind: string, items: string[][]) => {
  const stamp = now();
  return items.map(([name, slug], order) => ({ kind, name, slug, order, created_at: stamp, updated_at: stamp }));
};

async function seedResources() {
  if (!(await Term.countDocuments({ kind: "resource_type" }))) await Term.insertMany(termDocs("resource_type", RESOURCE_TYPES));
  if (await Resource.countDocuments()) return;
  const types = Object.fromEntries((await Term.find({ kind: "resource_type" }).select("slug").lean<{ _id: unknown; slug: string }[]>()).map((d) => [d.slug, String(d._id)]));
  const stamp = now();
  const base = { status: "published", published_at: stamp, created_at: stamp, updated_at: stamp };
  await Resource.insertMany([
    { ...base, title: "A Doctor's Guide to Digital Success: 15 Digital Growth Strategies", slug: "doctors-guide-to-digital-success", type_id: types["ebooks"],
      description: "15 digital growth strategies that set top practices apart. A free PDF guide from DocWin Digital.",
      cover_image: "/images/assets/ebook-cover.jpg", cover_alt: "Cover of A Doctor's Guide to Digital Success", delivery: "gated",
      file_url: "/downloads/15-digital-growth-strategies-docwin.pdf", file_name: "15-digital-growth-strategies-docwin.pdf", cta_label: "Get the free guide", featured: true,
      seo_title: "A Doctor's Guide to Digital Success (Free Ebook)", seo_description: "Download A Doctor's Guide to Digital Success: 15 digital growth strategies that set top practices apart." },
    { ...base, title: "Sample Audit: The DocWin Growth Score", slug: "sample-marketing-audit-report", type_id: types["sample-reports"],
      description: "A preview of the 18-page report you receive, prepared for a demonstration dental practice.",
      cover_image: "/images/assets/sample-report-cover.jpg", cover_alt: "Cover page of the DocWin Growth Score sample report", delivery: "download",
      file_url: "/downloads/docwin-sample-growth-score.pdf", file_name: "docwin-sample-growth-score.pdf", cta_label: "View the sample (PDF)" },
  ]);
}

async function seedTerms() {
  for (const [kind, items] of [["topic", TOPICS], ["speciality", SPECIALITIES]] as const) {
    if (!(await Term.countDocuments({ kind }))) await Term.insertMany(termDocs(kind, items as string[][]));
  }
}

async function seedSamplePost() {
  if ((await Setting.exists({ key: "sample_post_seeded" })) || (await Post.countDocuments())) return;
  const people = Object.fromEntries((await Author.find().select("slug").lean<{ _id: unknown; slug: string }[]>()).map((d) => [d.slug, String(d._id)]));
  const terms = Object.fromEntries((await Term.find().select("kind slug").lean<{ _id: unknown; kind: string; slug: string }[]>()).map((d) => [`${d.kind}:${d.slug}`, String(d._id)]));
  const { html, toc, readingTime } = processArticle(sample.CONTENT);
  const stamp = now();
  const ids = (keys: string[]) => keys.filter((k) => k in terms).map((k) => terms[k]);
  await Post.create({
    title: sample.TITLE, slug: sample.SLUG, subtitle: sample.SUBTITLE, excerpt: sample.EXCERPT, content_html: html, toc, reading_time: readingTime,
    cover_image: "/images/blog/sample-dentist-consultation.jpg", cover_alt: "Dentist explaining an X-ray on a screen to a patient in the dental chair",
    author_id: people["arbaz-fatmi"] ?? "", reviewer_id: people["wali-rahmani"] ?? "",
    topic_ids: ids(["topic:local-seo", "topic:reputation-reviews", "topic:websites-conversion"]), speciality_ids: ids(["speciality:dental-practices"]),
    seo_title: sample.SEO_TITLE, seo_description: sample.SEO_DESCRIPTION, status: "published", published_at: stamp, created_at: stamp, updated_at: stamp,
  });
  await Setting.updateOne({ key: "sample_post_seeded" }, { $set: { value: true, updated_at: stamp } }, { upsert: true });
}

async function seedCms() {
  for (const M of [Post, Author, Resource]) {
    await M.collection.createIndex({ slug: 1 }, { unique: true });
    await M.collection.createIndex({ old_slugs: 1 });
  }
  await Term.collection.createIndex({ kind: 1, slug: 1 }, { unique: true });
  await Post.collection.createIndex({ status: 1, published_at: -1 });
  await Setting.collection.createIndex({ key: 1 }, { unique: true });
  await FileRec.collection.createIndex({ storage_path: 1 });
  await seedAuthors();
  await updateArbaz();
  await seedResources();
  await seedTerms();
  await seedSamplePost();
}

export async function bootstrap() {
  await connectDb();
  await RateHit.collection.createIndex({ at: 1 }, { expireAfterSeconds: RATE_WINDOW });
  await seedAdmin();
  await seedCms();
  await initStorage().catch((e) => console.error("Storage init failed:", e));
}
