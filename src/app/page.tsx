import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { DoctorPanel } from "@/components/home/DoctorPanel";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { AuditSection } from "@/components/home/AuditSection";
import { WhyDocWin } from "@/components/home/WhyDocWin";
import { Testimonials } from "@/components/home/Testimonials";
import { EbookSection } from "@/components/home/EbookSection";
import { FinalCta } from "@/components/home/FinalCta";
import { BlogSection } from "@/components/home/BlogSection";
import { ArrowLink, JsonLd } from "@/components/ui-kit";
import { PageFaqs } from "@/components/templates/shared";
import { homeFaqs, homeSeo, serviceTabs } from "@/content/home";
import { pageMetadata, websiteSchema } from "@/lib/seo";
import { getTeam } from "@/lib/cms";

export const metadata = pageMetadata({ title: homeSeo.title, description: homeSeo.description, path: "/" });

export const revalidate = 300;

export default async function HomePage() {
  const { founders, panel } = await getTeam();
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <Hero />
      <TrustStrip />
      <DoctorPanel panel={panel} />
      <ServicesShowcase tabs={serviceTabs} />
      <AuditSection />
      <WhyDocWin founders={founders} />
      <Testimonials />
      <EbookSection />
      <PageFaqs title="Healthcare Marketing Questions, Answered" faqs={homeFaqs} testId="home-faqs"
        aside={<><p className="max-w-xs text-[15px] leading-relaxed text-ink-600">Have a question we haven&apos;t covered? Our team typically responds within 24 hours.</p><div className="mt-5"><ArrowLink href="/contact/" testId="home-faqs-contact">Contact us</ArrowLink></div></>} />
      <FinalCta title="Ready to Transform Your Practice's Digital Presence?" text="Your patients are searching online. Make sure they find you." testId="home-final-cta" />
      <BlogSection />
    </>
  );
}
