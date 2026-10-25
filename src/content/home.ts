import type { BlogTeaser, Faq } from "./types";

export const homeFaqs: Faq[] = [
  { q: "What does a healthcare digital marketing agency do?", a: "It plans and runs the online channels patients use to find and choose care: search and local listings, your website, paid ads, reviews, content and social media. DocWin Digital works only with healthcare organizations, so every campaign is planned around patient trust, health advertising rules and privacy from the start." },
  { q: "What does “guided by practicing doctors” mean?", a: "A panel of 10+ practicing doctors reviews the patient-facing content we create, such as website copy, articles and ads, for clinical accuracy and responsible communication before it goes live. Our co-founder, Dr. Wali Rahmani, is a physician who built his own practice." },
  { q: "Who does DocWin Digital work with?", a: "Doctors and medical practices, dental and specialty clinics, hospitals and multi-location groups, and healthcare companies such as healthtech, medtech and pharma brands. We work with healthcare organizations in the US, Canada and worldwide." },
  { q: "Why choose a healthcare-specific marketing agency?", a: "Healthcare marketing comes with rules that general agencies often learn on the job: health-related ad policies on Google and Meta, patient privacy, claims you shouldn't make, and the trust patients need before they book. We plan for these from day one and report on enquiries and booked patients, not vanity metrics." },
  { q: "How long does healthcare marketing take to show results?", a: "It depends on the channel. Paid ads can bring enquiries soon after launch, while SEO, listings and reputation work usually build over several months. We agree on goals and timelines with you up front, and we never promise rankings or patient numbers." },
  { q: "How can we get started with DocWin Digital?", a: "Book a strategy call, or request a free marketing audit. The audit reviews 50 touchpoints across 10 categories and gives you a prioritized report. We typically respond within 24 hours." },
];

export const homeSeo = {
  title: "Healthcare Digital Marketing Agency | DocWin Digital",
  description:
    "A healthcare digital marketing agency guided by practicing doctors. SEO, ads, websites and reputation management for practices, clinics and health brands.",
  primaryKeyword: "healthcare digital marketing agency",
};

export const ebook = {
  title: "15 Digital Growth Strategies That Set Top Practices Apart",
  guideName: "A Doctor's Guide to Digital Success",
  cover: "/images/assets/ebook-cover.jpg",
  pdfUrl: "/downloads/15-digital-growth-strategies-docwin.pdf" as string | null,
};

export const heroReviewCard = { label: "Medical review", value: "Patient-education article", meta: "Checked by a panel physician", status: "Approved" };

export const resultStats = [
  { value: "150%", label: "Average patient increase" },
  { value: "#1", label: "Google rankings achieved for client keywords" },
  { value: "4.9/5", label: "Client satisfaction rating" },
  { value: "100+", label: "Doctors served" },
  { value: "60%", label: "Lower patient acquisition cost" },
];

export const serviceTabs = [
  {
    id: "reputation", tab: "Reputation", title: "Build Your Online Reputation",
    summary: "Build, protect and grow your reputation with ongoing review management.",
    points: ["Review monitoring across Google and key healthcare directories", "Review-request workflows that follow platform rules", "Response guidance that never confirms someone is a patient"],
    image: "/images/reputation-consult.jpg", alt: "Doctor talking with a patient during a consultation",
    chip: { label: "Review response", value: "Drafted with a privacy check" },
    links: [{ href: "/services/healthcare-reputation-management/", label: "Explore reputation management" }],
  },
  {
    id: "local-search", tab: "Local Search", title: "Dominate Local Search",
    summary: "Show up when nearby patients search for the care you provide.",
    points: ["Medical SEO for service, condition and location pages", "Google Business Profile setup and upkeep", "Consistent practice details across healthcare directories"],
    image: "/images/local-search-phone.jpg", alt: "Physician taking a phone call in a clinic corridor",
    chip: { label: "Local profile", value: "Hours & services updated" },
    links: [{ href: "/services/medical-seo/", label: "Explore medical SEO" }, { href: "/services/google-business-profile-listing-management/", label: "Manage your listings" }],
  },
  {
    id: "social", tab: "Social Media", title: "Engage on Social Media",
    summary: "Build trust and credibility, and grow your brand with consistent, accurate content.",
    points: ["Content calendars planned around your services", "Patient-education posts written in plain language", "Community management and comment moderation"],
    image: "/images/social-tablet.jpg", alt: "Clinician reviewing content on a tablet",
    chip: { label: "Next post", value: "Scheduled after medical review" },
    links: [{ href: "/services/healthcare-social-media-marketing/", label: "See social media management" }],
  },
  {
    id: "paid-ads", tab: "Paid Ads", title: "Reach Patients with Paid Ads",
    summary: "Targeted Google and Meta campaigns that reach the right patients at the right time.",
    points: ["Google Search and local campaigns for appointment-intent searches", "Facebook and Instagram campaigns planned within health-targeting rules", "Conversion tracking that keeps health information out of ad platforms"],
    image: "/images/ads-video-call.jpg", alt: "Doctor on a video consultation at his desk",
    chip: { label: "Conversion tracking", value: "No health data sent to ad platforms" },
    links: [{ href: "/services/google-ads-healthcare/", label: "See Google Ads management" }, { href: "/services/meta-ads-healthcare/", label: "See Meta Ads services" }],
  },
  {
    id: "patient-data", tab: "Patient Data", title: "Secure Patient Data",
    summary: "Privacy-aware data management that keeps patient and marketing data organized and protected.",
    points: ["Enquiry and lead data organized in one place", "Consent records for email communication", "Analytics configured to exclude health information"],
    image: "/images/data-laptop.jpg", alt: "Physician working on a laptop in her office",
    chip: { label: "Email consent", value: "Recorded with date & source" },
    links: [{ href: "/services/data-management/", label: "Learn about data management" }],
  },
];

export const auditCategories = [
  "Website Experience", "SEO", "Social Media", "Digital Presence & Reputation", "Trust & Credibility",
  "Branding & Visual Identity", "Blogs & Content Marketing", "Meta Ads", "Google Ads", "AI Search Presence",
];

export const sampleReport = {
  name: "The DocWin Growth Score™",
  pdfUrl: "/downloads/docwin-sample-growth-score.pdf",
  pages: [
    { src: "/images/assets/sample-report-cover.jpg", alt: "Sample DocWin Growth Score report: cover page with overall score and the ten categories assessed" },
    { src: "/images/assets/sample-report-summary.jpg", alt: "Sample report: executive summary comparing the practice score with the top 5% benchmark" },
    { src: "/images/assets/sample-report-categories.jpg", alt: "Sample report: score breakdown across the ten growth categories" },
  ],
};

export const whyPoints = [
  { title: "Doctor-Founded Advantage", body: "DocWin was co-founded by Dr. Wali Rahmani, a physician who built his own practice from the ground up. We understand the real pressures of running a practice because our founder has lived them." },
  { title: "Built with Compliance in Mind", body: "Practicing doctors review patient-facing content for accuracy and ethical communication. Forms, tracking and campaigns are built around patient-privacy laws such as HIPAA in the US, PIPEDA in Canada, the UK GDPR and Australia's Privacy Act." },
  { title: "Specialty Fluency", body: "From cardiology to dermatology, we speak your specialty's language and understand what your patients need to know before they book." },
];

export const blogTeasers: BlogTeaser[] = [
  { slug: "from-near-me-to-ai-search-healthcare-providers-2026", topic: "SEO & Content", author: "Arbaz Fatmi",
    title: "From ‘Near Me’ to ‘AI Search’: How Patients Will Find Healthcare Providers in 2026",
    excerpt: "Healthcare search is evolving from “near me” queries to AI-powered recommendations. Here’s how healthcare organizations can build a digital presence that gets found, understood, trusted and chosen." },
  { slug: "local-listings-strategy-for-healthcare-brands-visibility-beyond-google", topic: "Local Listings", author: "Dr. Yasir Niyazi",
    title: "Local Listings Strategy for Healthcare Brands: Visibility Beyond Google" },
  { slug: "how-google-business-profile-impacts-local-seo-for-healthcare-professionals", topic: "Google Business Profile", author: "Arbaz Fatmi",
    title: "How Google Business Profile Impacts Local SEO for Healthcare Professionals" },
];

export const clientLogos = [
  { slug: "heartline", name: "Heartline Cardiology Centre", width: 141, height: 43 },
  { slug: "greenfield", name: "Greenfield Community Hospital", width: 73, height: 52 },
  { slug: "movewell", name: "MoveWell Physiotherapy", width: 71, height: 52 },
  { slug: "himsure", name: "Himsure", width: 170, height: 33 },
  { slug: "yurvani", name: "Yurvani", width: 127, height: 37 },
  { slug: "pearldent", name: "PearlDent Family Dentistry", width: 64, height: 52 },
  { slug: "naturoveda", name: "Naturoveda Health World", width: 150, height: 40 },
];

export interface Testimonial {
  quote: string;
  name: string;
  specialty: string;
  photo: string;
}

const client = (slug: string) => `/images/clients/${slug}.jpg`;

export const testimonials: Testimonial[] = [
  { name: "Dr. Richard Bowman", specialty: "Pulmonologist", photo: client("richard-bowman"), quote: "Our respiratory clinic’s online presence now looks more professional and structured. DocWin improved local discoverability without aggressive marketing." },
  { name: "Dr. Nasreen Khan", specialty: "Cardiologist", photo: client("nasreen-khan"), quote: "DocWin helped present our cardiology services online in a professional and responsible manner. The website structure makes it easier for patients to understand available consultations without creating unrealistic expectations." },
  { name: "Dr. Deborah Whitfield", specialty: "Neurologist", photo: client("deborah-whitfield"), quote: "The team was careful with how neurological services were described on our website. The content feels informative and patient-friendly, which is important for sensitive specialties." },
  { name: "Dr. Michelle Tanaka", specialty: "Dentist", photo: client("michelle-tanaka"), quote: "DocWin helped build a modern website for my dental clinic that reflects professionalism and patient trust. The layout and content are clear and easy to understand." },
  { name: "Dr. Marcus Jefferson", specialty: "Orthopedic Surgeon", photo: client("marcus-jefferson"), quote: "DocWin’s team helped standardize our online information and contact details across platforms. This reduced confusion for patients trying to reach us." },
  { name: "Dr. Gregory Sullivan", specialty: "Radiologist", photo: client("gregory-sullivan"), quote: "DocWin helped me set up a professional website for my clinic and improve my local online visibility. The team was clear about what is allowed in medical marketing and avoided any misleading claims. The process was smooth and well-organized." },
  { name: "Dr. Renee Washington", specialty: "Radiologist", photo: client("renee-washington"), quote: "I run a radiology center and needed better visibility on Google. DocWin optimized our website and Google Business profile. We now receive more genuine patient inquiries without any misleading advertising. I appreciate their ethical approach to healthcare marketing." },
  { name: "Dr. Colin Ashford", specialty: "Cardiologist", photo: client("colin-ashford"), quote: "As a cardiologist, I was skeptical about digital marketing. DocWin Digital changed everything. They understand the medical field like no other agency. Our new patient appointments increased 180% in just 6 months." },
];
