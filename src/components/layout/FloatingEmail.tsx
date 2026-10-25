import { Mail } from "lucide-react";
import { site } from "@/content/site";

export function FloatingEmail() {
  return (
    <a href={`mailto:${site.email}`} aria-label={`Email DocWin Digital at ${site.email}`}
      className="group fixed bottom-6 right-6 z-30 hidden h-12 items-center gap-0 overflow-hidden rounded-full bg-ink-900 pl-3.5 pr-3.5 text-white shadow-[0_18px_40px_-14px_rgba(11,25,44,0.6)] ring-1 ring-white/10 transition-[padding,background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:pr-5 focus-visible:pr-5 lg:inline-flex"
      data-testid="floating-email-btn">
      <Mail aria-hidden className="size-5 shrink-0" />
      <span className="max-w-0 whitespace-nowrap text-[14px] font-medium opacity-0 transition-[max-width,opacity,margin] duration-300 group-hover:ml-2.5 group-hover:max-w-[240px] group-hover:opacity-100 group-focus-visible:ml-2.5 group-focus-visible:max-w-[240px] group-focus-visible:opacity-100">
        {site.email}
      </span>
    </a>
  );
}
