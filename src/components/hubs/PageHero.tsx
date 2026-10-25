import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { Container, Eyebrow, btn } from "@/components/ui-kit";
import { CtaLink } from "@/components/leads/CtaLink";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

interface Props {
  eyebrow: string;
  title: string;
  intro: string;
  crumbs: Crumb[];
  jumpTitle: string;
  jump: { id: string; label: string; count: number }[];
  testId: string;
  image?: { src: string; alt: string };
  children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, intro, crumbs, jumpTitle, jump, testId, image, children }: Props) {
  return (
    <section className="bg-paper" data-testid={testId}>
      <Container className="pb-14 pt-6 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-12">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid grid-cols-1 gap-10 sm:mt-12 sm:gap-14 lg:mt-16 lg:grid-cols-12 lg:items-end">
          <div className="reveal lg:col-span-7">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="display-1 mt-5 sm:mt-6 lg:text-[3.9rem]" data-testid={`${testId}-heading`}>{title}</h1>
            <p className="lead mt-5 max-w-2xl sm:mt-7">{intro}</p>
            <div className="cta-row mt-8 sm:mt-10">
              <CtaLink kind="contact" className={btn("dark", "lg")} testId={`${testId}-cta-strategy`}>Book a Strategy Call</CtaLink>
              <CtaLink kind="audit" className={btn("outline", "lg")} testId={`${testId}-cta-audit`}>Request a Free Marketing Audit</CtaLink>
            </div>
            {children}
          </div>
          <div className="reveal reveal-2 min-w-0 space-y-5 lg:col-span-5">
          {image && (
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-ink-100 shadow-[0_30px_60px_-35px_rgba(11,25,44,0.45)] sm:rounded-[2rem]" data-testid={`${testId}-image`}>
              <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 500px, 100vw" className="object-cover" />
            </div>
          )}
          <nav aria-label="On this page" className="min-w-0 sm:rounded-[2rem] sm:bg-white sm:p-8 sm:shadow-[0_30px_60px_-35px_rgba(11,25,44,0.35)] sm:ring-1 sm:ring-ink-900/[0.05]" data-testid={`${testId}-jump`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">{jumpTitle}</p>
            <ul className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:mt-4 sm:block sm:divide-y sm:divide-ink-100 sm:overflow-visible sm:px-0 sm:pb-0">
              {jump.map((j) => (
                <li key={j.id} className="shrink-0">
                  <a href={`#${j.id}`} className="group flex items-center justify-between gap-2.5 whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-[14px] font-semibold text-ink-900 ring-1 ring-ink-900/[0.08] sm:gap-4 sm:whitespace-normal sm:rounded-none sm:bg-transparent sm:px-0 sm:py-3.5 sm:text-[15px] sm:ring-0" data-testid={`jump-${j.id}`}>
                    <span className="transition-colors group-hover:text-brand-700">{j.label}</span>
                    <span className="flex items-center gap-3 text-[13px] font-medium text-ink-500 sm:text-sm">
                      {j.count}
                      <ArrowDownRight aria-hidden className="hidden size-4 text-ink-300 transition-colors group-hover:text-brand-600 sm:block" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          </div>
        </div>
      </Container>
    </section>
  );
}
