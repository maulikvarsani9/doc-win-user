import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui-kit";
import { Breadcrumbs } from "@/components/hubs/Breadcrumbs";
import { legalDocs, type LegalDoc } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const legalMetadata = (d: LegalDoc) => pageMetadata({ title: `${d.title} | DocWin Digital`, description: d.description, path: `/${d.slug}/` });

const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const crumbs = [{ name: "Home", path: "/" }, { name: doc.title, path: `/${doc.slug}/` }];
  return (
    <section className="bg-white" data-testid={`legal-page-${doc.slug}`}>
      <div className="bg-paper">
        <Container className="pb-12 pt-6 sm:pb-16 sm:pt-10 lg:pt-12">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 max-w-3xl sm:mt-12">
            <Eyebrow>Legal</Eyebrow>
            <h1 className="display-1 mt-5 lg:text-[3.4rem]" data-testid="legal-heading">{doc.title}</h1>
            <p className="lead mt-5">{doc.intro}</p>
            <p className="mt-5 text-[13.5px] text-ink-500">Last updated: [date to confirm]</p>
          </div>
        </Container>
      </div>
      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-16 lg:py-20">
        <aside className="lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="flex gap-3 rounded-2xl bg-signal-50 p-4 text-[14px] leading-relaxed text-ink-800 ring-1 ring-signal-500/30" role="note" data-testid="legal-review-flag">
              <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0 text-signal-600" />
              <p><strong className="font-semibold">Draft pending legal review.</strong> This page has not yet been verified by legal counsel. Items in [brackets] still need confirmation.</p>
            </div>
            <nav aria-label="On this page" className="hidden lg:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">On this page</p>
              <ul className="mt-3 space-y-2 text-[14.5px]">
                {doc.sections.map((s) => <li key={s.heading}><a href={`#${anchor(s.heading)}`} className="text-ink-600 hover:text-brand-700">{s.heading}</a></li>)}
              </ul>
            </nav>
          </div>
        </aside>
        <article className="max-w-[68ch] space-y-10 lg:col-span-8" data-testid="legal-body">
          {doc.sections.map((s) => (
            <section key={s.heading} id={anchor(s.heading)} className="scroll-mt-28">
              <h2 className="font-display text-[1.35rem] font-medium tracking-[-0.015em] text-ink-900 sm:text-[1.5rem]">{s.heading}</h2>
              {s.body.map((p) => <p key={p} className="mt-3 text-[16px] leading-[1.75] text-ink-700">{p}</p>)}
              {s.list && <ul className="mt-3 list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-ink-700 marker:text-brand-600">{s.list.map((l) => <li key={l}>{l}</li>)}</ul>}
            </section>
          ))}
          <nav aria-label="Legal pages" className="flex flex-wrap gap-x-5 gap-y-2 border-t border-ink-900/10 pt-6 text-[14px]" data-testid="legal-other-links">
            {legalDocs.filter((d) => d.slug !== doc.slug).map((d) => <Link key={d.slug} href={`/${d.slug}/`} className="font-medium text-brand-700 hover:underline">{d.title}</Link>)}
          </nav>
        </article>
      </Container>
    </section>
  );
}
