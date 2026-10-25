import Image from "next/image";
import { ArrowRight, CheckCircle2, type LucideIcon } from "lucide-react";
import { Container, btn } from "@/components/ui-kit";
import { Breadcrumbs, type Crumb } from "@/components/hubs/Breadcrumbs";
import { CtaLink } from "@/components/leads/CtaLink";
import { FaceStack } from "@/components/team/FaceStack";
import type { ServiceCategory, ServicePage } from "@/content/types";
import { HeroChip, ReviewedBy } from "../shared";
import { StatBand } from "@/components/proof/StatBand";

type HeroImage = { src: string; alt: string } | null;

function ServiceVisual({ icon: Icon, panel, image }: { icon: LucideIcon; panel: ServicePage["panel"]; image: HeroImage }) {
  return (
    <div className="relative mx-auto w-full max-w-[470px] pb-10 sm:pb-12" data-testid="service-visual">
      {image ? (
        <div className="relative ml-auto aspect-[4/3] w-[90%] overflow-hidden rounded-[1.5rem] bg-ink-100 shadow-[0_30px_60px_-35px_rgba(11,25,44,0.5)] sm:rounded-[2rem]" data-testid="service-hero-image">
          <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 430px, 90vw" className="object-cover" />
        </div>
      ) : (
        <div aria-hidden className="absolute -right-2 -top-3 h-[72%] w-[72%] rounded-[1.75rem] bg-brand-600 sm:-right-5 sm:-top-5 sm:rounded-[2.25rem]" />
      )}
      <div className={`panel-grid relative ${image ? "-mt-16 sm:-mt-24 sm:w-[92%]" : ""} overflow-hidden rounded-[1.5rem] bg-ink-900 p-5 text-white shadow-[0_40px_80px_-40px_rgba(11,25,44,0.7)] sm:rounded-[2rem] sm:p-7`}>
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-signal-400 ring-1 ring-white/10"><Icon aria-hidden className="size-5" /></span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-300">Workstream</p>
            <p className="text-[15px] font-medium leading-snug">{panel.title}</p>
          </div>
        </div>
        <ul className="mt-6 space-y-2.5">
          {panel.rows.map(([label, status]) => (
            <li key={label} className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.06] px-3.5 py-3 ring-1 ring-white/10 sm:px-4">
              <span className="flex min-w-0 items-center gap-2.5 text-[13.5px] text-ink-100 sm:text-[14px]"><CheckCircle2 aria-hidden className="size-4 shrink-0 text-signal-400" /><span className="truncate">{label}</span></span>
              <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-0.5 text-[11.5px] font-semibold text-signal-300">{status}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[11.5px] text-ink-400">Illustrative workflow</p>
      </div>
      <div className={`absolute bottom-0 ${image ? "right-0" : "left-4 sm:-left-6"} flex items-center gap-3 rounded-2xl bg-white p-3 pr-4 shadow-[0_24px_50px_-20px_rgba(11,25,44,0.5)] ring-1 ring-ink-900/[0.06]`}>
        <FaceStack slugs={["chesta-gupta", "ankit-faujdar", "eshan-rao"]} size="size-7" />
        <span>
          <span className="block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-500">Medical review</span>
          <span className="block text-[13px] font-semibold text-ink-900">Built into the workflow</span>
        </span>
      </div>
    </div>
  );
}

export function ServiceHero({ page, category, icon, crumbs, stats, image }: { page: ServicePage; category: ServiceCategory; icon: LucideIcon; crumbs: Crumb[]; stats: { id: string; value: string; label: string }[]; image: HeroImage }) {
  return (
    <section className="relative overflow-hidden bg-paper" data-testid="service-hero">
      <Container className="pb-14 pt-6 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-12">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid gap-12 sm:mt-12 lg:mt-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="reveal lg:col-span-7 lg:pr-6">
            <HeroChip href={`/services/#${category.id}`} icon={icon} label={category.name} testId="service-hero-category" />
            <h1 className="display-1 mt-6 sm:mt-7 lg:text-[3.4rem] xl:text-[3.85rem]" data-testid="service-hero-heading">{page.h1}</h1>
            <p className="lead mt-5 max-w-2xl sm:mt-7">{page.intro}</p>
            <div className="cta-row mt-8 sm:mt-10">
              <CtaLink kind="contact" className={btn("dark", "lg")} testId="service-hero-cta-strategy">Book a Strategy Call <ArrowRight aria-hidden /></CtaLink>
              <CtaLink kind="audit" className={btn("outline", "lg")} testId="service-hero-cta-audit">Get a Free Marketing Audit</CtaLink>
            </div>
            <StatBand stats={stats} className="mt-8 max-w-xl sm:mt-10" testId="service-hero-stats" />
            <ReviewedBy className="mt-6 sm:mt-7" />
          </div>
          <div className="reveal reveal-2 lg:col-span-5">
            <ServiceVisual icon={icon} panel={page.panel} image={image} />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function CategoryPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-ink-100 sm:rounded-[2rem]">
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
    </div>
  );
}
