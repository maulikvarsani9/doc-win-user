export const site = {
  name: "DocWin Digital",
  url: process.env.NEXT_PUBLIC_SITE_URL!.replace(/\/$/, ""),
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
  showReviewFlags: process.env.NEXT_PUBLIC_SHOW_REVIEW_FLAGS === "true",
  tagline: "Healthcare digital marketing guided by practicing doctors.",
  description: "DocWin Digital is a healthcare digital marketing agency. Practicing doctors review the patient-facing content we create for practices, clinics and healthcare companies.",
  logo: "/brand/docwin-logo.png",
  logoWhite: "/brand/docwin-logo-white.png",
  ogImage: "/images/og-default.jpg",
  founders: [
    { name: "Dr. Wali Rahmani", credential: "MD (Medicine)", role: "Co-Founder & Chief Medical Officer" },
    { name: "Arbaz Fatmi", credential: "", role: "Co-Founder & Chief Marketing Officer" },
  ],
  email: "arbaz@docwindigital.com",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/docwindigital" },
    { label: "Instagram", href: "https://www.instagram.com/docwindigital/" },
    { label: "Facebook", href: "https://www.facebook.com/docwindigital" },
  ],
  mission:
    "Our mission is to help healthcare providers focus on what they do best, healing, while we handle what we do best: connecting them with the patients who need their care.",
};

export type NavMenu = "services" | "audiences" | "resources" | "about";

export const mainNav: { label: string; menu: NavMenu; match: string[] }[] = [
  { label: "Services", menu: "services", match: ["/services/"] },
  { label: "Who We Serve", menu: "audiences", match: ["/who-we-serve/"] },
  { label: "Resources", menu: "resources", match: ["/resources/", "/blogs/", "/free-marketing-audit/"] },
  { label: "About", menu: "about", match: ["/about/"] },
];

export interface NavLink { href: string; label: string; text: string; icon: "book" | "pen" | "gauge" | "building" | "users" | "mail" }

export const resourceLinks: NavLink[] = [
  { href: "/resources/", label: "Guides & Resources", text: "Practical playbooks for healthcare marketing", icon: "book" },
  { href: "/blogs/", label: "Blog", text: "Articles from our marketers and medical reviewers", icon: "pen" },
  { href: "/free-marketing-audit/", label: "Free Marketing Audit", text: "See what's working and what to fix first", icon: "gauge" },
];

export const aboutLinks: NavLink[] = [
  { href: "/about/", label: "About DocWin", text: "A doctor-founded healthcare marketing agency", icon: "building" },
  { href: "/about/team/", label: "Our Team & Doctor Panel", text: "Meet the doctors who review our work", icon: "users" },
  { href: "/contact/", label: "Contact Us", text: "Tell us what you want to achieve", icon: "mail" },
];

export const ebookLink = { href: "/resources/doctors-guide-to-digital-success/", label: "A Doctor's Guide to Digital Success" };
