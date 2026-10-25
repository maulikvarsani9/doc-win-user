import { JsonLd } from "@/components/ui-kit";
import { FinalCta } from "@/components/home/FinalCta";
import { categoryIcons, serviceIcons } from "@/components/icons";
import { audienceBySlug } from "@/content/audiences";
import { serviceCategories, services } from "@/content/services";
import type { Service, ServicePage } from "@/content/types";
import { serviceSchema } from "@/lib/seo";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { topicForService } from "@/content/topic-links";
import { serviceProof } from "@/content/proof";
import { MiniAuditBox } from "@/components/proof/MiniAuditBox";
import { LinkChips, PageFaqs } from "../shared";
import { ServiceHero } from "./ServiceHero";
import { serviceHeroImage } from "@/content/service-images";
import { ServiceApproach, ServiceIncluded, ServiceProblems } from "./ServiceSections";
import { ServiceContext, ServiceRelated, ServiceWhy } from "./ServiceExtras";

const photos: Record<string, { src: string; alt: string }> = {
  "search-visibility": { src: "/images/local-search-phone.jpg", alt: "Person searching for a nearby clinic on a phone" },
  "paid-advertising": { src: "/images/ads-video-call.jpg", alt: "Marketing team reviewing campaign performance on a video call" },
  "websites-reputation": { src: "/images/reputation-consult.jpg", alt: "Patient and clinician in a consultation" },
  "content-engagement": { src: "/images/social-tablet.jpg", alt: "Healthcare content being reviewed on a tablet" },
  "brand-creative": { src: "/images/stock/brand-creative.jpg", alt: "Brand identity color samples and sketches on a designer's desk" },
  "strategy-growth": { src: "/images/strategy-meeting.jpg", alt: "Healthcare leaders in a planning meeting" },
  "technology-data": { src: "/images/data-laptop.jpg", alt: "Analytics dashboard on a laptop" },
};

export function ServiceTemplate({ service, page }: { service: Service; page: ServicePage }) {
  const category = serviceCategories.find((c) => c.id === service.category)!;
  const icon = serviceIcons[service.slug] ?? categoryIcons[service.category];
  const path = `/services/${service.slug}/`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }, { name: service.name, path }];
  const proof = serviceProof(service.slug, service.category);
  const audiences = page.audiences.map((slug) => audienceBySlug(slug)!).map((a) => ({ href: `/who-we-serve/${a.slug}/`, label: a.name, slug: a.slug }));
  return (
    <>
      <JsonLd data={serviceSchema({ name: service.name, description: page.metaDescription, path })} />
      <ServiceHero page={page} category={category} icon={icon} crumbs={crumbs} stats={proof.stats} image={serviceHeroImage(service.slug)} />
      <ServiceProblems page={page} />
      <ServiceIncluded page={page} />
      <ServiceApproach page={page} />
      <MiniAuditBox b2b={proof.b2b} testId="service-mini-audit" className="pb-0 sm:pb-0" />
      <ServiceContext page={page} photo={photos[service.category]} />
      <ServiceWhy page={page} quotes={proof.quotes} />
      <ServiceRelated page={page} />
      <PageFaqs title={`${page.short} FAQs`} faqs={page.faqs} testId="service-faqs" aside={<LinkChips title="Often used by" links={audiences} testPrefix="service-audience" />} />
      <RelatedArticles title={`${page.short} articles`} topic={topicForService(service.slug)} testId="service-related-articles" />
      <FinalCta title={page.cta.title} text={page.cta.text} testId="service-final-cta" photo={services.indexOf(service) + 1} />
    </>
  );
}
