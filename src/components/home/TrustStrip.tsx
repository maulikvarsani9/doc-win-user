import Image from "next/image";
import { Container } from "@/components/ui-kit";
import { clientLogos, resultStats } from "@/content/home";

function Logos({ copy }: { copy?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16" aria-hidden={copy || undefined} aria-label={copy ? undefined : "Some of our clients"}>
      {clientLogos.map((l) => (
        <li key={l.slug} className="flex shrink-0 items-center" data-testid={copy ? undefined : `client-logo-${l.slug}`}>
          <Image
            src={`/images/logos/${l.slug}.png`}
            alt={copy ? "" : l.name}
            width={l.width}
            height={l.height}
            loading="eager"
            style={{ "--w": `${l.width}px` } as React.CSSProperties}
            className="h-auto w-[calc(var(--w)*0.85)] max-w-none sm:w-[calc(var(--w)*0.92)] xl:w-[var(--w)]"
          />
        </li>
      ))}
    </ul>
  );
}

function LogoMarquee() {
  return (
    <div className="marquee group relative w-full overflow-hidden lg:flex-1" data-testid="client-logos">
      <div className="marquee-track flex w-max group-hover:[animation-play-state:paused]">
        <Logos />
        <Logos copy />
      </div>
    </div>
  );
}

export function TrustStrip() {
  return (
    <section className="bg-white" data-testid="home-trust">
      <Container className="pb-4 pt-12 sm:pb-8 sm:pt-16 lg:pt-20">
        <div className="flex flex-col items-center gap-7 lg:flex-row lg:gap-12">
          <h2 className="max-w-[20rem] text-center lg:max-w-[16rem] font-sans text-[13px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-ink-500 lg:shrink-0 lg:text-left">
            Trusted by Healthcare Providers Across Specialties
          </h2>
          <LogoMarquee />
        </div>
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-ink-900/[0.07] bg-ink-900/[0.07] sm:mt-14 sm:rounded-[1.75rem] lg:grid-cols-5" data-testid="results-strip">
          {resultStats.map((s) => (
            <div key={s.label} className="flex flex-col bg-white p-5 last:col-span-2 sm:p-8 lg:last:col-span-1">
              <dt className="order-2 mt-2 max-w-[13rem] text-[13px] leading-snug text-ink-600 sm:mt-3 sm:text-[14px]">{s.label}</dt>
              <dd className="order-1 font-display text-[2.1rem] font-normal leading-none tracking-[-0.01em] text-ink-900 sm:text-[3.1rem]">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
