import { Container, SectionHeader } from "@/components/ui-kit";
import { FounderCard } from "./FounderCard";
import type { Person } from "@/content/team";
import { StatChips } from "@/components/proof/StatBand";
import { hubStats, statList } from "@/content/proof";

export function Leadership({ founders }: { founders: Person[] }) {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-32" data-testid="team-leadership">
      <Container>
        <SectionHeader
          eyebrow="Leadership"
          title="Founded by a Doctor and a Healthcare Marketer"
          lead="Clinical experience, healthcare marketing and health-tech product experience, brought together in one team."
          action={<StatChips stats={statList(hubStats.team)} testId="team-stats" />}
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {founders.map((f) => <FounderCard key={f.slug} person={f} testId={`team-founder-${f.slug}`} />)}
        </div>
      </Container>
    </section>
  );
}
