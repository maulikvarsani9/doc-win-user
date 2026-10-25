import { Check, FileText, Stethoscope } from "lucide-react";

const checks = ["Clinical accuracy", "No outcome guarantees", "Plain language"];

export function ReviewMock() {
  return (
    <figure className="relative" data-testid="review-mock">
      <div className="rounded-[1.6rem] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(11,25,44,0.35)] ring-1 ring-ink-900/[0.05] sm:p-8 lg:mr-16">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-ink-50 text-ink-700"><FileText aria-hidden className="size-4" /></span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-500">Patient-education article</span>
          </div>
          <span className="rounded-full bg-signal-100 px-2.5 py-1 text-[11px] font-semibold text-signal-700">In medical review</span>
        </div>
        <p className="mt-6 font-display text-[1.35rem] font-medium leading-snug tracking-[-0.02em] text-ink-900">Recovering after knee replacement: what to expect</p>
        <p className="mt-4 text-[15px] leading-[1.75] text-ink-600">
          Recovery looks different for everyone. With regular physical therapy,{" "}
          <mark className="rounded bg-signal-100 px-1 text-ink-900 underline decoration-signal-500 decoration-wavy decoration-1 underline-offset-4">most patients are pain-free within two weeks</mark>{" "}
          and return to normal activity soon after.
        </p>
        <div className="mt-5 space-y-2.5" aria-hidden>
          <div className="h-2.5 w-full rounded-full bg-ink-100" />
          <div className="h-2.5 w-4/5 rounded-full bg-ink-100" />
        </div>
        <ul className="mt-7 flex flex-wrap gap-2 border-t border-ink-100 pt-5">
          {checks.map((c) => (
            <li key={c} className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-[12.5px] font-semibold text-brand-700">
              <Check aria-hidden className="size-3.5" strokeWidth={3} />{c}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative -mt-6 ml-6 rounded-[1.25rem] bg-ink-900 p-5 text-white shadow-[0_30px_60px_-25px_rgba(11,25,44,0.7)] sm:ml-auto sm:max-w-[330px] lg:absolute lg:-right-2 lg:top-[46%] lg:mt-0" data-testid="review-mock-comment">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-signal-500 text-ink-900"><Stethoscope aria-hidden className="size-4" /></span>
          <span>
            <span className="block text-[13.5px] font-semibold">Panel physician</span>
            <span className="block text-[12px] text-ink-300">Medical reviewer · comment</span>
          </span>
        </div>
        <p className="mt-3.5 text-[14px] leading-relaxed text-ink-100">
          Avoid promising outcomes. Suggest: “Recovery timelines vary. Your care team will set goals with you.”
        </p>
      </div>
      <figcaption className="mt-5 text-[12px] text-ink-500 lg:mt-6">Illustrative example of a medical review comment.</figcaption>
    </figure>
  );
}
