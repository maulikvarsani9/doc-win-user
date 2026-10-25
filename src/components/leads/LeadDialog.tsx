"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Download, X } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { AuditForm } from "./AuditForm";
import { AuditAside, AuditStrip, ContactAside, ContactStrip } from "./DialogAside";
import { btn } from "@/components/ui-kit";
import { sampleReport } from "@/content/home";
import { cn } from "@/lib/utils";
import type { DialogKind } from "./LeadDialogProvider";

const copy = {
  contact: { title: "Book a Strategy Call", text: "Tell us about your organization and goals. We'll get back to you to arrange a time." },
  audit: { title: "Request Your Free Marketing Audit", text: "We'll review 50 touchpoints across 10 categories that shape how patients find and choose you." },
  sample: { title: "Sample Audit: The DocWin Growth Score™", text: "A preview of the 18-page report you receive, prepared for a demonstration dental practice." },
};

function SampleViewer({ onRequest }: { onRequest: () => void }) {
  return (
    <div className="space-y-6">
      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8" data-testid="sample-viewer">
        {sampleReport.pages.map((p, i) => (
          <div key={p.src} className="relative aspect-[595/964] w-[78%] shrink-0 snap-center overflow-hidden rounded-2xl bg-ink-50 ring-1 ring-ink-900/10 sm:w-[46%]">
            <Image src={p.src} alt={p.alt} fill sizes="(min-width: 640px) 300px, 78vw" className="object-cover object-top" priority={i === 0} />
          </div>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <a href={sampleReport.pdfUrl} target="_blank" rel="noopener" className={btn("outline", "md")} data-testid="sample-modal-open-pdf">
          <Download aria-hidden /> Open Full Sample (PDF)
        </a>
        <button type="button" onClick={onRequest} className={btn("primary", "md")} data-testid="sample-modal-request-audit">
          Get My Free Marketing Audit
        </button>
      </div>
    </div>
  );
}

export function LeadDialog({ kind, onKindChange }: { kind: DialogKind | null; onKindChange: (k: DialogKind | null) => void }) {
  const c = kind ? copy[kind] : copy.contact;
  const toSample = () => onKindChange("sample");
  const aside = kind === "contact" ? <ContactAside /> : kind === "audit" ? <AuditAside onSample={toSample} /> : null;
  return (
    <Dialog.Root open={kind !== null} onOpenChange={(o) => !o && onKindChange(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink-950/60 backdrop-blur-[6px] data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          data-testid={`${kind ?? "lead"}-modal`}
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-[1.5rem] bg-white shadow-[0_50px_100px_-30px_rgba(6,17,30,0.6)] outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-10 data-[state=open]:duration-300 sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[92vh] sm:w-[calc(100%-1.5rem)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[1.75rem] sm:data-[state=open]:slide-in-from-bottom-0 sm:data-[state=open]:zoom-in-[0.97]",
            kind === "sample" ? "sm:max-w-3xl" : "sm:max-w-xl md:max-w-4xl",
          )}
        >
          <div className={cn(aside && "md:grid md:min-h-full md:grid-cols-[320px_minmax(0,1fr)]")}>
          {aside && <aside className="hidden bg-ink-950 md:block">{aside}</aside>}
          <div className="min-w-0">
          <div className="sticky top-0 z-10 border-b border-ink-100 bg-white px-5 pb-4 pr-16 pt-5 sm:static sm:px-8 sm:pb-5 sm:pt-7">
            <span aria-hidden className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-ink-200 sm:hidden" />
            <Dialog.Title className="font-display text-[1.35rem] font-normal leading-tight tracking-[-0.015em] text-ink-900 sm:text-[1.6rem]">{c.title}</Dialog.Title>
            <Dialog.Description className="mt-1.5 text-[14.5px] leading-relaxed text-ink-600 sm:mt-2 sm:text-[15px]">{c.text}</Dialog.Description>
            <Dialog.Close className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-ink-900/10 text-ink-700 transition-colors hover:border-ink-900/40 hover:text-ink-900 sm:right-5 sm:top-6" data-testid="lead-modal-close">
              <X aria-hidden className="size-4" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>
          <div className="px-5 pb-8 pt-5 sm:px-8 sm:py-7">
            {kind === "contact" && <><ContactStrip /><ContactForm formId="contact-modal" /></>}
            {kind === "audit" && <><AuditStrip onSample={toSample} /><AuditForm formId="audit-modal" /></>}
            {kind === "sample" && <SampleViewer onRequest={() => onKindChange("audit")} />}
          </div>
          </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
