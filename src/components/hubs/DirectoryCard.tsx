import Link from "next/link";
import { ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { ReviewFlag } from "@/components/ui-kit";
import { IconTile } from "@/components/icons";

interface Props {
  href: string;
  name: string;
  description: string;
  linkLabel: string;
  benefit?: string;
  flag?: string;
  icon?: LucideIcon;
  testId: string;
}

export function DirectoryCard({ href, name, description, linkLabel, benefit, flag, icon, testId }: Props) {
  return (
    <article className="group relative grid grid-cols-[auto_1fr] items-center gap-x-3.5 rounded-[1.25rem] bg-white p-5 ring-1 ring-ink-900/[0.07] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(11,25,44,0.35)] hover:ring-ink-900/[0.12] sm:flex sm:flex-col sm:items-stretch sm:rounded-[1.6rem] sm:p-7" data-testid={testId}>
      <div className={icon ? "sm:flex sm:items-start sm:justify-between sm:gap-4" : "hidden sm:flex sm:justify-end"}>
        {icon && <IconTile icon={icon} />}
        <span aria-hidden className="hidden size-9 place-items-center rounded-full border border-ink-900/10 text-ink-400 transition-[background-color,color,border-color,transform] duration-300 group-hover:rotate-45 group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white sm:grid">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <h4 className={`${icon ? "" : "col-span-2 "}font-display text-[1.1rem] font-medium leading-snug tracking-[-0.015em] text-ink-900 sm:mt-6 sm:text-[1.25rem]`}>{name}</h4>
      {flag && <div className="col-span-2 mt-4 sm:mt-5"><ReviewFlag>{flag}</ReviewFlag></div>}
      <p className="col-span-2 mt-3 text-[14.5px] leading-[1.6] text-ink-600 sm:text-[15px] sm:leading-[1.65]">{description}</p>
      {benefit && <p className="col-span-2 mt-4 border-l-2 border-signal-500 pl-3.5 text-[14px] font-medium leading-snug text-ink-800 sm:mt-5 sm:text-[14.5px]">{benefit}</p>}
      <Link href={href} className="col-span-2 mt-4 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-brand-700 after:absolute after:inset-0 after:rounded-[1.25rem] sm:mt-auto sm:pt-7 sm:text-[15px] sm:after:rounded-[1.6rem]" data-testid={`${testId}-link`}>
        {linkLabel} <ArrowRight aria-hidden className="size-4 sm:hidden" />
      </Link>
    </article>
  );
}
