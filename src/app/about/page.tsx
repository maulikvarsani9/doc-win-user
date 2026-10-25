import { JsonLd } from "@/components/ui-kit";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutProofBand } from "@/components/about/AboutProofBand";
import { AboutMissionVision } from "@/components/about/AboutMissionVision";
import { AboutHowWeWork } from "@/components/about/AboutHowWeWork";
import { AboutDifference } from "@/components/about/AboutDifference";
import { AboutTeam } from "@/components/about/AboutTeam";
import { AboutAudiences } from "@/components/about/AboutAudiences";
import { AboutStory } from "@/components/about/AboutStory";
import { FinalCta } from "@/components/home/FinalCta";
import { aboutCta } from "@/content/about";
import { getTeam } from "@/lib/cms";
import { pageMetadata, peopleSchema, webPageSchema } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About DocWin Digital | Doctor-Guided Healthcare Marketing",
  description: "DocWin Digital is a healthcare-only marketing agency. Practicing doctors review the content we create. Meet the team and see how we work.",
  path: "/about/",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about/" },
];

export const revalidate = 300;

export default async function AboutPage() {
  const { founders, panel } = await getTeam();
  const people = founders.map((p) => ({ name: p.name, jobTitle: p.role, description: p.bio || p.credential, image: p.photo }));
  return (
    <>
      <JsonLd data={webPageSchema("AboutPage", "About DocWin Digital", "/about/")} />
      <JsonLd data={peopleSchema(people)} />
      <AboutHero crumbs={crumbs} founders={founders} />
      <AboutProofBand />
      <AboutMissionVision />
      <AboutHowWeWork />
      <AboutDifference />
      <AboutTeam founders={founders} panel={panel} />
      <AboutAudiences />
      <AboutStory />
      <FinalCta title={aboutCta.title} text={aboutCta.text} testId="about-final-cta" photo={3} />
    </>
  );
}
