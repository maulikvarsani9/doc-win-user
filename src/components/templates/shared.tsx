import Link from "next/link";
import { Container, JsonLd } from "@/components/ui-kit";
import { FaqList } from "@/components/hubs/FaqList";
import { FaceStack } from "@/components/team/FaceStack";
import { faqSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { Faq } from "@/content/types";

export const stepCols: Record<number, string> = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-3" };

export function ReviewedBy({ className, text = "Patient-facing work is reviewed by practicing doctors" }: { className?: string; text?: string }) {
  return (
    <Link href="/about/team/" className={cn("group inline-flex items-center gap-3 text-[13.5px] text-ink-600 sm:text-[14px]", className)} data-testid="reviewed-by-link">
      <FaceStack slugs={["wali-rahmani", "nehan-fatima", "yasir-niyazi"]} size="size-8" className="shrink-0" />
      <span className="group-hover:text-ink-900">{text}</span>
    </Link>
  );
}

export function HeroChip({ href, icon: Icon, label, testId }: { href: string; icon: React.ComponentType<{ className?: string }>; label: string; testId: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-[13px] font-semibold text-ink-700 ring-1 ring-ink-900/[0.07] transition-colors hover:text-ink-900" data-testid={testId}>
      <span className="grid size-7 place-items-center rounded-full bg-brand-50 text-brand-600"><Icon className="size-3.5" /></span>
      {label}
    </Link>
  );
}

export function PageFaqs({ title, faqs, aside, testId }: { title: string; faqs: Faq[]; aside?: React.ReactNode; testId: string }) {
  return (
    <section className="bg-paper py-16 sm:py-24 lg:py-28" data-testid={testId}>
      <Container className="grid gap-8 sm:gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="display-3">{title}</h2>
          {aside && <div className="mt-8 sm:mt-10">{aside}</div>}
        </div>
        <div className="lg:col-span-8"><FaqList faqs={faqs} /></div>
      </Container>
      <JsonLd data={faqSchema(faqs)} />
    </section>
  );
}

export function LinkChips({ title, links, testPrefix }: { title: string; links: { href: string; label: string; slug: string }[]; testPrefix: string }) {
  return (
    <div>
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-500">{title}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-flex rounded-full border border-ink-900/15 bg-white px-4 py-2 text-[14px] font-medium text-ink-800 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-white" data-testid={`${testPrefix}-${l.slug}`}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LegalNote() {
  return <p className="text-[13px] leading-relaxed text-ink-500">This isn&apos;t legal advice. Rules differ by country, state and province, so confirm specific requirements with your own legal or compliance adviser.</p>;
}
