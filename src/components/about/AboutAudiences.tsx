import Link from "next/link";
import { Container, SectionHeader, ArrowLink } from "@/components/ui-kit";
import { IconTile, groupIcons } from "@/components/icons";
import { QuoteRow } from "@/components/proof/CompactQuote";
import { audienceGroups, audiences, audiencesIn } from "@/content/audiences";
import { quotes } from "@/content/proof";

export function AboutAudiences() {
  return (
    <section className="bg-brand-50/60 py-16 sm:py-24 lg:py-32" data-testid="about-audiences">
      <Container>
        <SectionHeader
          eyebrow="Who we serve"
          title="Built for Healthcare, From Single Practices to Pharma"
          action={<ArrowLink href="/who-we-serve/" testId="about-audiences-all">See all {audiences.length} audiences</ArrowLink>}
        />
        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {audienceGroups.map((g) => {
            const items = audiencesIn(g.id);
            return (
              <div key={g.id} className="flex flex-col rounded-[1.5rem] bg-white p-6 ring-1 ring-ink-900/[0.06] sm:p-7" data-testid={`about-group-${g.id}`}>
                <IconTile icon={groupIcons[g.id]} />
                <h3 className="mt-6 font-display text-[1.2rem] font-medium leading-tight tracking-[-0.015em]">{g.name}</h3>
                <p className="mt-2 flex-1 text-[14.5px] leading-[1.6] text-ink-600">{g.blurb}</p>
                <ul className="mt-5 space-y-1.5 border-t border-ink-900/[0.07] pt-4">
                  {items.slice(0, 3).map((a) => (
                    <li key={a.slug}><Link href={`/who-we-serve/${a.slug}/`} className="text-[14px] text-brand-700 underline-offset-4 hover:underline" data-testid={`about-audience-${a.slug}`}>{a.name}</Link></li>
                  ))}
                  {items.length > 3 && <li className="text-[13px] text-ink-500">+{items.length - 3} more</li>}
                </ul>
              </div>
            );
          })}
        </div>
        <QuoteRow items={quotes(["Dr. Colin Ashford", "Dr. Michelle Tanaka"])} className="mt-14 sm:mt-20" testId="about-quotes" />
      </Container>
    </section>
  );
}
