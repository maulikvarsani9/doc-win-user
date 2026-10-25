import Link from "next/link";
import { FileText } from "lucide-react";
import { btn } from "@/components/ui-kit";

export function EmptyState({ title, text, href, label, testId }: { title: string; text: string; href?: string; label?: string; testId: string }) {
  return (
    <div className="mx-auto max-w-xl rounded-[1.5rem] bg-paper px-6 py-14 text-center sm:px-10 sm:py-16" data-testid={testId}>
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-white text-brand-600 ring-1 ring-ink-900/[0.06]"><FileText aria-hidden className="size-6" /></span>
      <h2 className="mt-6 font-display text-[1.4rem] font-normal tracking-[-0.015em] text-ink-900">{title}</h2>
      <p className="mt-3 text-[15.5px] leading-[1.65] text-ink-600">{text}</p>
      {href && label && <Link href={href} className={btn("outline", "md", "mt-7")} data-testid={`${testId}-link`}>{label}</Link>}
    </div>
  );
}
