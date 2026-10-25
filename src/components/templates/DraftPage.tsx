import { Container, Eyebrow, ReviewFlag, btn } from "@/components/ui-kit";
import { CtaLink } from "@/components/leads/CtaLink";
import { Breadcrumbs, type Crumb } from "@/components/hubs/Breadcrumbs";
import { DirectoryCard } from "@/components/hubs/DirectoryCard";
import { site } from "@/content/site";
import type { PageStatus } from "@/content/types";

const statusLabel: Record<PageStatus, string> = {
  "ready-for-review": "Ready for review",
  draft: "Copy pending: template approved, page not yet written",
  "hold-proof": "On hold: proof or portfolio needed before publishing",
  planned: "Planned: copy not yet written",
};

interface Props {
  eyebrow: string;
  title: string;
  intro: string;
  template: string;
  crumbs: Crumb[];
  status: PageStatus;
  primaryKeyword?: string;
  supportingKeywords?: string[];
  reviewNote?: string;
  related?: { href: string; name: string; description: string; linkLabel: string }[];
}

export function DraftPage(p: Props) {
  return (
    <>
      <section className="bg-paper" data-testid="draft-hero">
        <Container className="pb-14 pt-6 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-12">
          <Breadcrumbs items={p.crumbs} />
          <div className="mt-8 max-w-4xl sm:mt-12 lg:mt-16">
            <Eyebrow>{p.eyebrow}</Eyebrow>
            <h1 className="display-1 mt-6 lg:text-[3.8rem]" data-testid="draft-heading">{p.title}</h1>
            <p className="lead mt-6 max-w-3xl">{p.intro}</p>
            <div className="cta-row mt-8 sm:mt-10">
              <CtaLink kind="contact" className={btn("dark", "lg")} testId="draft-cta-strategy">Book a Strategy Call</CtaLink>
              <CtaLink kind="audit" className={btn("outline", "lg")} testId="draft-cta-audit">Request a Free Marketing Audit</CtaLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20" data-testid="draft-status">
        <Container className="grid gap-6 lg:grid-cols-12">
          <div className="rounded-[2rem] border border-dashed border-ink-900/20 p-6 sm:p-10 lg:col-span-7">
            <h2 className="text-2xl font-normal tracking-[-0.02em]">This page is being prepared</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-600">
              The full page will be written using the approved {p.template} template. Until it is published, it is hidden from search engines. In the meantime, book a strategy call and we&apos;ll talk through your situation directly.
            </p>
          </div>
          {site.showReviewFlags && (
            <dl className="space-y-4 rounded-[2rem] bg-paper p-8 text-sm sm:p-10 lg:col-span-5" data-testid="draft-planning-details">
              <div><ReviewFlag>Internal review only</ReviewFlag></div>
              <div><dt className="font-semibold text-ink-900">Status</dt><dd className="mt-1 text-ink-600">{statusLabel[p.status]}</dd></div>
              {p.primaryKeyword && <div><dt className="font-semibold text-ink-900">Primary keyword</dt><dd className="mt-1 text-ink-600">{p.primaryKeyword}</dd></div>}
              {p.supportingKeywords?.length ? <div><dt className="font-semibold text-ink-900">Supporting keywords</dt><dd className="mt-1 text-ink-600">{p.supportingKeywords.join(" · ")}</dd></div> : null}
              {p.reviewNote && <div><dt className="font-semibold text-ink-900">Needs from DocWin</dt><dd className="mt-1 text-ink-600">{p.reviewNote}</dd></div>}
            </dl>
          )}
        </Container>
      </section>

      {p.related?.length ? (
        <section className="pb-16 sm:pb-24" data-testid="draft-related">
          <Container>
            <h2 className="text-2xl font-normal tracking-[-0.02em]">Related</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {p.related.map((r) => <DirectoryCard key={r.href} href={r.href} name={r.name} description={r.description} linkLabel={r.linkLabel} testId={`related-${r.href.split("/").filter(Boolean).pop()}`} />)}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
