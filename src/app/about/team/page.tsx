import { JsonLd } from "@/components/ui-kit";
import { TeamHero } from "@/components/team/TeamHero";
import { Leadership } from "@/components/team/Leadership";
import { PanelGrid } from "@/components/team/PanelGrid";
import { ReviewProcess } from "@/components/team/ReviewProcess";
import { FinalCta } from "@/components/home/FinalCta";
import { MiniAuditBox } from "@/components/proof/MiniAuditBox";
import { getTeam } from "@/lib/cms";
import { pageMetadata, peopleSchema } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Team & Medical Review Panel | DocWin Digital",
  description: "Meet the doctors and marketers behind DocWin Digital: co-founders Dr. Wali Rahmani and Arbaz Fatmi, and the practicing doctors on our medical review panel.",
  path: "/about/team/",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about/" },
  { name: "Our Team", path: "/about/team/" },
];

export const revalidate = 300;

export default async function TeamPage() {
  const { founders, panel } = await getTeam();
  const people = [...founders, ...panel].map((p) => ({ name: p.name, jobTitle: p.role, description: p.bio || p.credential, image: p.photo }));
  return (
    <>
      <JsonLd data={peopleSchema(people)} />
      <TeamHero crumbs={crumbs} people={[...founders, ...panel]} />
      <Leadership founders={founders} />
      <PanelGrid panel={panel} />
      <MiniAuditBox testId="team-mini-audit" />
      <ReviewProcess />
      <FinalCta
        title="Work With a Doctor-Led Marketing Team"
        text="Start with a free marketing audit. We'll show you how your practice appears to patients online, and what to fix first."
        testId="team-final-cta"
        photo={4}
      />
    </>
  );
}
