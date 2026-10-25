import type { Metadata } from "next";
import { site } from "@/content/site";
import type { Faq } from "@/content/types";

type OgImage = { url: string; width: number; height: number; alt?: string };

interface PageSeo {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  image?: string | OgImage;
  article?: { publishedTime?: string; modifiedTime?: string; authors?: string[]; tags?: string[] };
}

export function pageMetadata({ title, description, path, noindex, image, article }: PageSeo): Metadata {
  const index = site.allowIndexing && !noindex;
  const img = typeof image === "string" ? { url: image } : image ?? { url: site.ogImage, width: 1200, height: 630 };
  const images = [{ alt: title, ...img }];
  const og = { siteName: site.name, locale: "en_US", title, description, url: path, images };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: article ? { ...og, type: "article", ...article } : { ...og, type: "website" },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
  };
}

export const abs = (path: string) => (/^https?:\/\//.test(path) ? path : `${site.url}${path}`);
export const brandTitle = (t: string) => (/docwin/i.test(t) || t.length + site.name.length + 3 > 60 ? t : `${t} | ${site.name}`);

type SchemaPerson = { name: string; slug: string; credential?: string; role?: string; bio?: string; avatar?: string; linkedin?: string };

export const personSchema = (p: SchemaPerson) => ({
  "@type": "Person",
  "@id": abs(`/blogs/author/${p.slug}/#person`),
  name: p.name,
  url: abs(`/blogs/author/${p.slug}/`),
  ...(p.role ? { jobTitle: p.role } : {}),
  ...(p.credential ? { honorificSuffix: p.credential } : {}),
  ...(p.bio ? { description: p.bio } : {}),
  ...(p.avatar && !p.avatar.startsWith("http") ? { image: abs(p.avatar) } : {}),
  ...(p.linkedin ? { sameAs: [p.linkedin] } : {}),
  worksFor: { "@id": abs("/#organization") },
});

export const blogPostingSchema = (p: { title: string; description: string; path: string; image?: string; published?: string | null; modified?: string; author?: SchemaPerson | null; reviewer?: SchemaPerson | null; keywords: string[]; words?: number }) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: p.title,
  description: p.description,
  url: abs(p.path),
  mainEntityOfPage: { "@type": "WebPage", "@id": abs(p.path) },
  ...(p.image ? { image: [abs(p.image)] } : {}),
  ...(p.published ? { datePublished: p.published } : {}),
  ...(p.modified ? { dateModified: p.modified } : {}),
  ...(p.author ? { author: personSchema(p.author) } : {}),
  ...(p.reviewer ? { contributor: personSchema(p.reviewer) } : {}),
  ...(p.keywords.length ? { keywords: p.keywords.join(", ") } : {}),
  publisher: { "@id": abs("/#organization") },
  inLanguage: "en",
});

const AREA = ["US", "CA", "GB", "AU"].map((c) => ({ "@type": "Country", name: c }));

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": abs("/#organization"),
  name: site.name,
  url: abs("/"),
  logo: { "@type": "ImageObject", url: abs(site.logo), width: 943, height: 265 },
  image: abs(site.ogImage),
  description: site.description,
  slogan: site.tagline,
  email: site.email,
  sameAs: site.social.map((s) => s.href),
  contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: site.email, availableLanguage: ["English"], areaServed: AREA }],
  areaServed: AREA,
  knowsAbout: ["Healthcare marketing", "Medical SEO", "Healthcare advertising", "Medical website design", "Healthcare reputation management", "Healthcare content marketing"],
  founder: site.founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role })),
});

export const webPageSchema = (type: "AboutPage" | "ContactPage" | "CollectionPage", name: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": type,
  "@id": abs(`${path}#webpage`),
  name,
  url: abs(path),
  isPartOf: { "@id": abs("/#website") },
  about: { "@id": abs("/#organization") },
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": abs("/#website"),
  name: site.name,
  url: abs("/"),
  publisher: { "@id": abs("/#organization") },
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
});

export const itemListSchema = (name: string, items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: abs(it.path) })),
});

export const peopleSchema = (people: { name: string; jobTitle: string; description: string; image: string }[]) => ({
  "@context": "https://schema.org",
  "@graph": people.map((p) => ({ "@type": "Person", ...p, image: abs(p.image), worksFor: { "@id": abs("/#organization") } })),
});

export const faqSchema = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const serviceSchema = ({ name, description, path, audience = "Healthcare organizations" }: { name: string; description: string; path: string; audience?: string }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  serviceType: name,
  description,
  url: abs(path),
  provider: { "@id": abs("/#organization") },
  areaServed: AREA,
  audience: { "@type": "BusinessAudience", audienceType: audience },
});
