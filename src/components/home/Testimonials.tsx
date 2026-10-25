import Image from "next/image";
import { Star } from "lucide-react";
import { Container, SectionHeader, btn } from "@/components/ui-kit";
import { CtaLink } from "@/components/leads/CtaLink";
import { testimonials, type Testimonial } from "@/content/home";
import { cn } from "@/lib/utils";
import { TestimonialGrid } from "./TestimonialGrid";

const MOBILE_VISIBLE = 3;

export function Stars({ className = "size-3.5" }: { className?: string }) {
  return (
    <span role="img" aria-label="Rated 5 out of 5" className="flex gap-0.5 text-signal-500">
      {[0, 1, 2, 3, 4].map((i) => <Star key={i} aria-hidden className={`${className} fill-current`} strokeWidth={0} />)}
    </span>
  );
}

function TestimonialCard({ t, i }: { t: Testimonial; i: number }) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-2xl border border-ink-900/[0.07] bg-white p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-brand-600/25 hover:shadow-[0_20px_40px_-26px_rgba(11,25,44,0.4)]",
        i >= MOBILE_VISIBLE && "hidden group-data-[expanded=true]/grid:flex sm:flex",
      )}
      data-testid={`testimonial-card-${i}`}
    >
      <Stars />
      <blockquote className="mt-3.5 flex-1 text-[14.5px] leading-[1.65] text-ink-700 sm:mt-4">“{t.quote}”</blockquote>
      <figcaption className="mt-4 flex items-center gap-3 border-t border-ink-900/[0.06] pt-4 sm:mt-5">
        <Image src={t.photo} alt={t.name} width={44} height={44} className="size-11 shrink-0 rounded-full object-cover ring-1 ring-ink-900/10" />
        <span className="min-w-0">
          <span className="block truncate text-[14.5px] font-medium text-ink-900" data-testid={`testimonial-name-${i}`}>{t.name}</span>
          <span className="block text-[13px] text-ink-500">{t.specialty}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section className="bg-paper py-16 sm:py-24 lg:py-32" data-testid="home-testimonials">
      <Container>
        <SectionHeader
          eyebrow="Client stories"
          title="Trusted by Professionals Worldwide"
          lead="Hear from healthcare providers who've transformed their practices with DocWin."
          action={<CtaLink kind="contact" className={btn("outline", "lg", "hidden sm:inline-flex")} testId="testimonials-cta">Book a Strategy Call</CtaLink>}
        />
        <TestimonialGrid total={testimonials.length}>
          {testimonials.map((t, i) => <TestimonialCard key={t.name} t={t} i={i} />)}
        </TestimonialGrid>
      </Container>
    </section>
  );
}
