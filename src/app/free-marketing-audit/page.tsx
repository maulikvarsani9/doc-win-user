import { Container, Eyebrow } from "@/components/ui-kit";
import { Breadcrumbs } from "@/components/hubs/Breadcrumbs";
import { AuditForm } from "@/components/leads/AuditForm";
import { AuditChecklist } from "@/components/home/AuditSection";
import { SampleReportStack } from "@/components/home/SampleReportStack";
import { sampleReport } from "@/content/home";
import { btn } from "@/components/ui-kit";
import { Download } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Free Healthcare Marketing Audit for Practices | DocWin Digital",
  description: "Request a free healthcare marketing audit. We review 50 touchpoints across 10 categories that shape how patients find and choose your practice.",
  path: "/free-marketing-audit/",
});

export default function FreeAuditPage() {
  return (
    <>
      <section className="bg-paper" data-testid="audit-page">
        <Container className="pb-16 pt-6 sm:pb-24 sm:pt-10 lg:pb-28 lg:pt-12">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Free Marketing Audit", path: "/free-marketing-audit/" }]} />
          <div className="mt-8 grid gap-10 sm:mt-12 sm:gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-12">
            <div className="lg:col-span-5">
              <Eyebrow>Free marketing audit</Eyebrow>
              <h1 className="display-1 mt-5 sm:mt-6 lg:text-[3.6rem]" data-testid="audit-heading">Free Healthcare Marketing Audit</h1>
              <p className="lead mt-5 sm:mt-6">
                Know what&apos;s working, what isn&apos;t, and where your biggest growth opportunities are. We evaluate 50 key touchpoints across 10 categories that influence how patients find and choose your practice.
              </p>
            </div>
            <div className="lg:col-span-7 lg:row-span-2">
              <div className="-mx-1 rounded-[1.5rem] bg-white p-5 shadow-[0_40px_80px_-40px_rgba(11,25,44,0.4)] ring-1 ring-ink-900/[0.05] sm:mx-0 sm:rounded-[2rem] sm:p-10">
                <h2 className="text-[1.4rem] font-normal tracking-[-0.018em] sm:text-2xl">Request your audit</h2>
                <p className="mb-6 mt-1.5 text-[14.5px] text-ink-600 sm:mb-8 sm:mt-2 sm:text-[15px]">Fields marked * are required.</p>
                <AuditForm formId="audit-page" />
              </div>
            </div>
            <div className="lg:col-span-5">
              <h2 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Your marketing audit covers</h2>
              <AuditChecklist dark={false} />
            </div>
          </div>
        </Container>
      </section>
      <section className="py-16 sm:py-24" data-testid="audit-sample-section">
        <Container className="grid items-center gap-10 sm:gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="display-2">What Your Audit Report Looks Like</h2>
            <p className="lead mt-5">Your results arrive as {sampleReport.name}: an overall score benchmarked against leading practices, a breakdown of all 10 categories and a prioritized roadmap.</p>
            <a href={sampleReport.pdfUrl} target="_blank" rel="noopener" className={btn("outline", "lg", "mt-7 w-full sm:mt-8 sm:w-auto")} data-testid="audit-page-sample-pdf"><Download aria-hidden /> Open the Sample Report (PDF)</a>
          </div>
          <div className="rounded-[1.75rem] sm:rounded-[2.5rem] bg-ink-900 px-6 py-10 sm:px-12 sm:py-14 lg:col-span-7">
            <SampleReportStack id="sample-audit" />
          </div>
        </Container>
      </section>
    </>
  );
}
