import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

const variants = {
  primary: "bg-brand-600 text-white shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_10px_24px_-12px_rgba(0,106,168,0.65)] hover:bg-brand-700",
  dark: "bg-ink-900 text-white shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_10px_24px_-14px_rgba(11,25,44,0.7)] hover:bg-ink-800",
  signal: "bg-signal-500 text-ink-900 shadow-[0_1px_0_rgba(255,255,255,0.35)_inset] hover:bg-signal-400",
  outline: "border border-ink-900/15 bg-white text-ink-900 hover:border-ink-900/40 hover:bg-white",
  outlineLight: "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
  ghost: "text-ink-900 hover:bg-ink-900/5",
  light: "bg-white text-ink-900 hover:bg-ink-50",
};
const sizes = { sm: "h-10 px-4 text-[14px]", md: "h-12 px-6 text-[15px]", lg: "h-[3.4rem] px-7 text-[15.5px]" };

export type BtnVariant = keyof typeof variants;

export const btn = (variant: BtnVariant = "primary", size: keyof typeof sizes = "md", extra?: string) =>
  cn(
    "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-[-0.005em] transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-0.5",
    variants[variant],
    sizes[size],
    extra,
  );

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8", className)}>{children}</div>;
}

export function Eyebrow({ children, tone = "brand", className }: { children: React.ReactNode; tone?: "brand" | "light"; className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em]", tone === "light" ? "text-ink-200" : "text-brand-700", className)}>
      <span aria-hidden className="font-display text-[15px] font-medium leading-none text-signal-500">+</span>
      {children}
    </p>
  );
}

export function SectionHeader({ eyebrow, title, lead, action, tone = "dark", className }: {
  eyebrow?: string; title: React.ReactNode; lead?: string; action?: React.ReactNode; tone?: "dark" | "light"; className?: string;
}) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-12 lg:items-end", className)}>
      <div className="lg:col-span-8">
        {eyebrow && <Eyebrow tone={tone === "light" ? "light" : "brand"} className="mb-5">{eyebrow}</Eyebrow>}
        <h2 className={cn("display-2 max-w-[18ch]", tone === "light" && "text-white")}>{title}</h2>
        {lead && <p className={cn("lead mt-5 max-w-2xl", tone === "light" && "text-ink-300")}>{lead}</p>}
      </div>
      {action && <div className="lg:col-span-4 lg:justify-self-end">{action}</div>}
    </div>
  );
}

export function ArrowLink({ href, children, tone = "dark", testId }: { href: string; children: React.ReactNode; tone?: "dark" | "light"; testId?: string }) {
  return (
    <Link
      href={href}
      data-testid={testId}
      className={cn(
        "group -my-2.5 inline-flex items-center gap-2 py-2.5 text-[15px] font-semibold decoration-2 underline-offset-[6px] hover:underline",
        tone === "light" ? "text-white decoration-signal-500" : "text-brand-700 decoration-brand-200",
      )}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

export function ReviewFlag({ children, testId }: { children: React.ReactNode; testId?: string }) {
  if (!site.showReviewFlags) return null;
  return (
    <span data-testid={testId} className="inline-flex items-center rounded-full border border-dashed border-signal-600/50 bg-signal-50 px-2.5 py-0.5 text-[11px] font-semibold text-signal-700">
      {children}
    </span>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
