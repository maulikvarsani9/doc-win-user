import Image from "next/image";
import { ArrowRight, Search, ShieldCheck, TrendingUp } from "lucide-react";
import { Container, btn } from "@/components/ui-kit";
import { CtaLink } from "@/components/leads/CtaLink";
import { FaceStack } from "@/components/team/FaceStack";
import { heroReviewCard as c, resultStats } from "@/content/home";
import { cn } from "@/lib/utils";

const heroStats = [
  { ...resultStats[0], icon: TrendingUp, position: "sm:right-[-1.25rem] sm:top-[43%] lg:right-[-0.5rem] xl:right-[-2rem]" },
  { ...resultStats[1], icon: Search, position: "sm:bottom-10 sm:left-[-0.5rem] lg:left-[-2.25rem]" },
];
const cardShell = "reveal absolute hidden rounded-[1.1rem] bg-white/95 shadow-[0_24px_50px_-20px_rgba(11,25,44,0.45)] ring-1 ring-ink-900/[0.06] backdrop-blur sm:block";

function ReviewCard() {
  return (
    <div className={cn(cardShell, "reveal-2 p-3.5 sm:left-[-1.5rem] sm:top-12 sm:w-[264px] xl:left-[-3.25rem]")} data-testid="hero-float-card-review">
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600"><ShieldCheck aria-hidden className="size-[18px]" strokeWidth={2} /></span>
        <div className="min-w-0">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-500">{c.label}</p>
          <p className="truncate text-[14px] font-semibold text-ink-900">{c.value}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-ink-100 pt-2.5 text-[12px]">
        <span className="text-ink-500">{c.meta}</span>
        <span className="rounded-full bg-brand-50 px-2 py-0.5 font-semibold text-brand-700">{c.status}</span>
      </div>
    </div>
  );
}

function StatCard({ index }: { index: number }) {
  const s = heroStats[index];
  return (
    <div className={cn(cardShell, `reveal-${index + 3}`, "p-4 sm:w-[236px]", s.position)} data-testid={`hero-stat-card-${index}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="font-display text-[2.15rem] leading-none tracking-[-0.01em] text-ink-900">{s.value}</span>
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-signal-100 text-signal-700"><s.icon aria-hidden className="size-4" strokeWidth={2} /></span>
      </div>
      <p className="mt-2 text-[13px] leading-snug text-ink-600">{s.label}</p>
    </div>
  );
}

function MobileStats() {
  return (
    <div className="absolute inset-x-3 bottom-3 z-10 grid grid-cols-2 gap-2 sm:hidden" data-testid="hero-stats-mobile">
      {heroStats.map((s) => (
        <div key={s.value} className="rounded-xl bg-white/95 p-3 shadow-[0_16px_36px_-18px_rgba(11,25,44,0.55)] ring-1 ring-ink-900/[0.06] backdrop-blur">
          <p className="font-display text-[1.6rem] leading-none tracking-[-0.01em] text-ink-900">{s.value}</p>
          <p className="mt-1.5 text-[11.5px] leading-snug text-ink-600">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function Underline() {
  return (
    <svg aria-hidden viewBox="0 0 320 16" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-[0.28em] w-full text-signal-500">
      <path d="M3 11.5C72 4.5 170 2.5 317 8.5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function DoctorsChip() {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3.5 text-[12px] leading-tight sm:gap-3 sm:pr-4 text-ink-700 shadow-[0_6px_20px_-12px_rgba(11,25,44,0.35)] ring-1 ring-ink-900/[0.06] sm:text-[14px]" data-testid="hero-proof-chip">
      <FaceStack slugs={["wali-rahmani", "nehan-fatima", "yasir-niyazi"]} ring="ring-white" size="size-6 sm:size-8" />
      <span><strong className="font-semibold text-ink-900">10+ Practicing Doctors</strong> on Our Review Panel</span>
    </p>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper" data-testid="home-hero">
      <Container className="grid items-center gap-7 pb-14 pt-4 sm:gap-16 sm:pb-24 sm:pt-12 lg:grid-cols-12 lg:gap-4 lg:pb-32 lg:pt-14">
        <div className="reveal lg:col-span-6 lg:pr-8">
          <DoctorsChip />
          <h1 className="display-1 mt-4 sm:mt-8" data-testid="hero-heading">
            The Healthcare Digital Marketing Agency{" "}
            <span className="text-brand-600">Guided by <span className="relative inline-block whitespace-nowrap">Practicing Doctors<Underline /></span></span>
          </h1>
          <p className="lead mt-4 max-w-[34rem] sm:mt-8" data-testid="hero-subheading">
            <span className="sm:hidden">Doctor-reviewed marketing that improves visibility, builds patient trust and drives growth.</span>
            <span className="hidden sm:inline">We help healthcare practices and organizations improve online visibility, build patient trust, and drive growth with doctor-reviewed marketing.</span>
          </p>
          <div className="cta-row mt-6 sm:mt-10">
            <CtaLink kind="contact" className={btn("dark", "lg", "h-12 sm:h-[3.4rem]")} testId="hero-cta-contact">Contact Us <ArrowRight aria-hidden /></CtaLink>
            <CtaLink kind="audit" className={btn("outline", "lg", "h-12 sm:h-[3.4rem]")} testId="hero-cta-audit">Request Free Audit</CtaLink>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="reveal reveal-1 relative mx-auto w-full max-w-[540px] lg:mr-2">
            <div aria-hidden className="absolute -right-3 -top-3 h-[72%] w-[78%] rounded-[1.75rem] bg-brand-600 sm:-right-6 sm:-top-6 sm:rounded-[2.4rem]" />
            <div aria-hidden className="absolute -bottom-5 -left-5 hidden size-28 rounded-[1.75rem] border-2 border-dashed border-signal-500/60 sm:block" />
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] bg-ink-200 shadow-[0_40px_80px_-40px_rgba(11,25,44,0.6)] sm:aspect-[4/5] sm:rounded-[2.25rem]" data-testid="hero-image">
              <Image src="/images/hero-consultation.jpg" alt="Physician listening to a patient during a consultation" fill priority quality={60} sizes="(min-width: 1024px) 540px, 92vw" className="object-cover object-[42%_30%]" />
            </div>
            <ReviewCard />
            <StatCard index={0} />
            <StatCard index={1} />
            <MobileStats />
          </div>
        </div>
      </Container>
    </section>
  );
}
