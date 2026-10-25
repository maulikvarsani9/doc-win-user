import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/ui-kit";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { serviceSchema } from "@/lib/seo";
import { audienceIcons } from "@/components/icons";
import { audienceBySlug, audienceGroups, audiences } from "@/content/audiences";
import type { Audience, AudiencePage } from "@/content/types";
import { LinkChips, PageFaqs } from "../shared";
import { audienceProof } from "@/content/proof";
import { MiniAuditBox } from "@/components/proof/MiniAuditBox";
import { AudienceHero, AudienceUnderstanding } from "./AudienceHero";
import { AudienceApproach, AudienceConsiderations, AudienceProof, AudiencePriorities, AudienceServices } from "./AudienceSections";

export function AudienceTemplate({ audience, page }: { audience: Audience; page: AudiencePage }) {
  const group = audienceGroups.find((g) => g.id === audience.group)!;
  const path = `/who-we-serve/${audience.slug}/`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Who We Serve", path: "/who-we-serve/" }, { name: audience.name, path }];
  const related = page.related.map((slug) => audienceBySlug(slug)!).map((a) => ({ href: `/who-we-serve/${a.slug}/`, label: a.name, slug: a.slug }));
  const proof = audienceProof(audience.slug, audience.group);
  const mini = <MiniAuditBox b2b={proof.b2b} testId="audience-mini-audit" className={proof.b2b ? undefined : "pt-0 sm:pt-0"} />;
  const image = `/images/stock/${audience.slug}.jpg`;
  return (
    <>
      <JsonLd data={serviceSchema({ name: page.seoTitle.split(" | ")[0], description: page.metaDescription, path, audience: audience.name })} />
      <AudienceHero audience={audience} page={page} group={group} icon={audienceIcons[audience.slug]} image={image} crumbs={crumbs} stats={proof.stats} logos={proof.logos} />
      <AudienceUnderstanding audience={audience} page={page} quote={proof.quotes[1]} />
      <AudiencePriorities page={page} />
      {!proof.b2b && mini}
      <AudienceServices page={page} />
      {proof.b2b && mini}
      <AudienceConsiderations page={page} />
      <AudienceApproach page={page} short={audience.name} />
      <AudienceProof t={proof.quotes[0]} />
      <PageFaqs title={`Marketing FAQs for ${audience.name}`} faqs={page.faqs} testId="audience-faqs" aside={<LinkChips title="Related industries" links={related} testPrefix="audience-related" />} />
      <RelatedArticles title={`Articles for ${audience.name.toLowerCase()}`} speciality={audience.slug} testId="audience-related-articles" />
      <FinalCta title={page.cta.title} text={page.cta.text} testId="audience-final-cta" photo={proof.ctaPhoto ?? audiences.indexOf(audience) + 3} />
    </>
  );
}
