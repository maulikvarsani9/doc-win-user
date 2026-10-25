import Image from "next/image";
import { Container, Eyebrow, btn } from "@/components/ui-kit";
import { CtaLink } from "@/components/leads/CtaLink";
import { Breadcrumbs, type Crumb } from "@/components/hubs/Breadcrumbs";
import type { Person } from "@/content/team";
import { cn } from "@/lib/utils";

const columns = [["wali-rahmani", "pooja-singh"], ["nehan-fatima", "yasir-niyazi"], ["arbaz-fatmi", "chesta-gupta"]];
const offsets = ["", "translate-y-12", "translate-y-5"];

function Collage({ people }: { people: Person[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4" data-testid="team-hero-collage">
      {columns.map((col, i) => (
        <div key={i} className={cn("space-y-3 sm:space-y-4", offsets[i])}>
          {col.map((slug) => {
            const p = people.find((x) => x.slug === slug);
            if (!p) return null;
            return (
              <div key={slug} className="relative aspect-[3/4] overflow-hidden rounded-[1.1rem] bg-[#F4E4D8] sm:rounded-[1.5rem]">
                <Image src={p.photo} alt={`${p.name}, ${p.credential}`} fill priority={i === 0} sizes="(min-width: 1024px) 190px, 31vw" className="object-cover object-[50%_12%]" />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function TeamHero({ crumbs, people }: { crumbs: Crumb[]; people: Person[] }) {
  return (
    <section className="overflow-hidden bg-paper" data-testid="team-hero">
      <Container className="pb-20 pt-6 sm:pb-28 sm:pt-10 lg:pb-32 lg:pt-12">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid items-center gap-10 sm:mt-12 sm:gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="reveal lg:col-span-6 lg:pr-6">
            <Eyebrow>Our Team</Eyebrow>
            <h1 className="display-1 mt-6 lg:text-[3.9rem]" data-testid="team-heading">The Doctors and Marketers Behind DocWin Digital</h1>
            <p className="lead mt-7 max-w-xl">
              DocWin Digital was founded by a physician and a healthcare marketer turned health-tech founder. Today, a panel of 10+ practicing doctors reviews the patient-facing content we create for our clients.
            </p>
            <div className="cta-row mt-8 sm:mt-10">
              <CtaLink kind="contact" className={btn("dark", "lg")} testId="team-cta-strategy">Book a Strategy Call</CtaLink>
              <CtaLink kind="audit" className={btn("outline", "lg")} testId="team-cta-audit">Request a Free Marketing Audit</CtaLink>
            </div>
          </div>
          <div className="reveal reveal-2 lg:col-span-6"><Collage people={people} /></div>
        </div>
      </Container>
    </section>
  );
}
