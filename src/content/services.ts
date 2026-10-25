import type { Service, ServiceCategory } from "./types";

export const serviceCategories: ServiceCategory[] = [
  { id: "search-visibility", name: "Search & Visibility", blurb: "Be found when people look for the care or solutions you provide." },
  { id: "paid-advertising", name: "Paid Advertising", blurb: "Reach people actively searching or likely to need your services, within each platform's healthcare policies." },
  { id: "websites-reputation", name: "Websites & Reputation", blurb: "Turn interest into enquiries, and protect the trust patients place in you." },
  { id: "content-engagement", name: "Content & Engagement", blurb: "Educate, stay in touch and nurture relationships after the first visit." },
  { id: "brand-creative", name: "Brand & Creative", blurb: "Look and sound like the organization you are." },
  { id: "strategy-growth", name: "Strategy & Growth", blurb: "Decide where to focus before you spend." },
  { id: "technology-data", name: "Technology & Data", blurb: "Specialized builds and data support for organizations with technical needs.", quiet: true },
];

export const services: Service[] = [
  {
    slug: "medical-seo", name: "Medical SEO Services", category: "search-visibility",
    description: "Technical, on-page and content SEO for healthcare websites, including condition and treatment pages, site structure and search performance reporting.",
    benefit: "More qualified visitors from organic search over time.", linkLabel: "Explore medical SEO",
    primaryKeyword: "medical SEO services", supportingKeywords: ["SEO for doctors", "medical practice SEO", "healthcare SEO agency", "SEO for medical practices"], status: "ready-for-review",
  },
  {
    slug: "google-business-profile-listing-management", name: "Google Business Profile & Healthcare Listing Management", category: "search-visibility",
    description: "Setup, optimization and upkeep of your Google Business Profile and key healthcare directories, so hours, locations and provider details stay accurate.",
    benefit: "Patients see correct, consistent information when they search nearby.", linkLabel: "Manage your listings",
    primaryKeyword: "Google Business Profile management for doctors", supportingKeywords: ["healthcare listing management", "medical directory listing management", "Google Business Profile optimization for healthcare practices", "doctor local search visibility"], status: "ready-for-review",
  },
  {
    slug: "healthcare-ai-search-visibility", name: "Healthcare AEO & AI Search Visibility", category: "search-visibility",
    description: "Structuring your content and entity information so AI assistants and answer engines can interpret it accurately.",
    benefit: "Clearer representation in AI-generated answers. Citation is never guaranteed.", linkLabel: "Learn about AI search visibility",
    primaryKeyword: "healthcare AI search optimization", supportingKeywords: ["healthcare answer engine optimization", "generative engine optimization for healthcare", "AI search visibility for doctors", "medical practice AI visibility"], status: "ready-for-review",
  },
  {
    slug: "google-ads-healthcare", name: "Google Ads for Healthcare", category: "paid-advertising",
    description: "Search, Performance Max and local campaigns built around appointment-intent searches, with conversion tracking that keeps health information away from ad platforms.",
    benefit: "Visibility for high-intent searches while organic presence builds.", linkLabel: "See Google Ads management",
    primaryKeyword: "Google Ads for doctors", supportingKeywords: ["Google Ads for medical practices", "healthcare PPC agency", "medical PPC management", "Google Ads management for healthcare providers"], status: "ready-for-review",
    reviewNote: "Confirm Performance Max is actively managed.",
  },
  {
    slug: "meta-ads-healthcare", name: "Meta Ads for Healthcare", category: "paid-advertising",
    description: "Facebook and Instagram campaigns for awareness, service promotion and lead generation, planned around Meta's health-related targeting restrictions.",
    benefit: "Reach local or niche audiences with creative that builds familiarity.", linkLabel: "See Meta Ads services",
    primaryKeyword: "Facebook ads for doctors", supportingKeywords: ["Meta Ads for healthcare", "Instagram ads for medical practices", "healthcare paid social advertising", "Facebook advertising for healthcare providers"], status: "ready-for-review",
  },
  {
    slug: "medical-website-design", name: "Medical Website Design & Development", category: "websites-reputation",
    description: "Design and build of fast, accessible, mobile-friendly healthcare websites with clear service pages, provider bios and appointment pathways.",
    benefit: "A website that helps visitors understand your care and take the next step.", linkLabel: "View website design services",
    primaryKeyword: "medical website design", supportingKeywords: ["doctor website design", "healthcare website design agency", "medical website development", "website design for medical practices"], status: "ready-for-review",
  },
  {
    slug: "healthcare-reputation-management", name: "Healthcare Online Reputation & Review Management", category: "websites-reputation",
    description: "Review monitoring, compliant review-request workflows and response guidance that respects patient privacy.",
    benefit: "A reputation that reflects the care you actually deliver.", linkLabel: "Explore reputation management",
    primaryKeyword: "doctor reputation management", supportingKeywords: ["online reputation management for doctors", "healthcare review management", "medical practice reputation management", "healthcare reputation management"], status: "ready-for-review",
  },
  {
    slug: "healthcare-social-media-marketing", name: "Healthcare Social Media Marketing & Management", category: "content-engagement",
    description: "Organic content planning, publishing and community management for the platforms your patients or buyers actually use.",
    benefit: "A consistent, credible presence without your team managing it daily.", linkLabel: "See social media management",
    primaryKeyword: "healthcare social media marketing", supportingKeywords: ["social media management for doctors", "medical practice social media marketing", "healthcare social media agency", "social media marketing for healthcare providers"], status: "ready-for-review",
  },
  {
    slug: "healthcare-content-marketing", name: "Healthcare Content Marketing & Medical Writing", category: "content-engagement",
    description: "Patient-education articles, service pages, guides and B2B content written for accuracy and readability.",
    benefit: "Content people can trust and search engines can understand.", linkLabel: "Explore content & medical writing",
    primaryKeyword: "healthcare content marketing", supportingKeywords: ["medical content writing services", "healthcare copywriting services", "medical blog writing services", "content marketing for medical practices"], status: "ready-for-review",
    reviewNote: "Confirm the scope of clinical review.",
  },
  {
    slug: "healthcare-email-marketing", name: "Healthcare Email Marketing", category: "content-engagement",
    description: "Newsletters, announcements and campaign emails with consent-based list practices that follow local email laws such as CAN-SPAM, CASL and the UK GDPR.",
    benefit: "Stay in touch with patients and prospects you've already earned.", linkLabel: "See email marketing",
    primaryKeyword: "healthcare email marketing", supportingKeywords: ["medical practice email marketing", "email marketing for doctors", "healthcare email campaigns", "patient email marketing services"], status: "ready-for-review",
  },
  {
    slug: "healthcare-marketing-automation", name: "Healthcare Marketing Automation & CRM Workflows", category: "content-engagement",
    description: "Lead routing, follow-up sequences, intake-form workflows and CRM setup that connect marketing to your front desk or sales team.",
    benefit: "Fewer enquiries lost between first contact and booking.", linkLabel: "Explore automation & CRM",
    primaryKeyword: "healthcare marketing automation", supportingKeywords: ["healthcare CRM automation", "medical practice marketing automation", "healthcare lead nurturing", "patient engagement automation"], status: "ready-for-review",
  },
  {
    slug: "healthcare-branding", name: "Healthcare Branding Services", category: "brand-creative",
    description: "Brand strategy, positioning, naming support and visual identity for new practices, rebrands and healthcare companies.",
    benefit: "A clear, distinctive identity patients and partners recognize.", linkLabel: "Explore healthcare branding",
    primaryKeyword: "healthcare branding agency", supportingKeywords: ["medical branding agency", "healthcare brand strategy", "medical practice branding", "healthcare brand identity design"], status: "ready-for-review",
    reviewNote: "Portfolio required before publishing.",
  },
  {
    slug: "healthcare-graphic-design", name: "Healthcare Graphic Design", category: "brand-creative",
    description: "Ongoing design production: social graphics, brochures, signage, presentations and ad creative, built to your brand standards.",
    benefit: "Professional, consistent materials without hiring in-house.", linkLabel: "See graphic design services",
    primaryKeyword: "healthcare graphic design services", supportingKeywords: ["medical graphic design", "healthcare marketing design", "medical practice graphic design", "healthcare social media design"], status: "ready-for-review",
  },
  {
    slug: "healthcare-video-production", name: "Healthcare Video Production", category: "brand-creative",
    description: "Provider introductions, facility tours, explainer and animation videos, and short-form social video.",
    benefit: "Help people feel familiar with your team before they visit.", linkLabel: "Explore video production",
    primaryKeyword: "healthcare video production", supportingKeywords: ["medical video production company", "healthcare video production services", "medical animation services", "healthcare explainer video production"], status: "ready-for-review",
    reviewNote: "Video reel required before publishing.",
  },
  {
    slug: "healthcare-marketing-strategy", name: "Healthcare Marketing Strategy & Planning", category: "strategy-growth",
    description: "Market and competitor review, channel priorities, budgets and a measurable plan for practices and healthcare organizations.",
    benefit: "A clear plan grounded in your goals and capacity.", linkLabel: "See strategy & planning",
    primaryKeyword: "healthcare marketing strategy", supportingKeywords: ["healthcare marketing consultant", "medical practice marketing strategy", "healthcare marketing plan", "healthcare marketing consulting services"], status: "ready-for-review",
  },
  {
    slug: "b2b-healthcare-marketing", name: "B2B Healthcare Marketing & Demand Generation", category: "strategy-growth",
    description: "Account-based campaigns, content and lead generation for companies selling to providers, health systems or payers.",
    benefit: "A steadier pipeline of qualified business conversations.", linkLabel: "Explore B2B healthcare marketing",
    primaryKeyword: "B2B healthcare marketing agency", supportingKeywords: ["healthcare demand generation agency", "B2B medical marketing agency", "B2B healthcare lead generation", "healthcare B2B marketing"], status: "ready-for-review",
    reviewNote: "B2B case evidence required before publishing.",
  },
  {
    slug: "healthcare-software-app-development", name: "Healthcare Software & App Development", category: "technology-data",
    description: "Custom web applications, patient-facing apps and internal tools for healthcare organizations and digital health companies.",
    benefit: "Software designed around healthcare workflows and users.", linkLabel: "Explore software & app development",
    primaryKeyword: "healthcare software development company", supportingKeywords: ["healthcare app development company", "medical app development services", "healthcare web application development", "digital health software development"], status: "ready-for-review",
    reviewNote: "Portfolio and technical lead required before publishing.",
  },
  {
    slug: "data-management", name: "Healthcare Data Management", category: "technology-data",
    description: "Organizing, securing and governing the marketing and enquiry data your organization collects.",
    benefit: "Cleaner, better-protected data you can act on.", linkLabel: "Learn about data management",
    primaryKeyword: "healthcare data management services", supportingKeywords: ["privacy-aware marketing data management", "healthcare marketing data privacy"], status: "ready-for-review",
    reviewNote: "Scope (marketing vs clinical data) and any 'compliant' claim need confirmation.",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const servicesIn = (category: string) => services.filter((s) => s.category === category);
