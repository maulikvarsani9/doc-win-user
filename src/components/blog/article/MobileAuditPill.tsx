"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileAuditPill({ text, href }: { text: string; href: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector("footer");
      const inline = document.querySelector('[data-testid="blog-incontent-audit-cta"]');
      const visible = (el: Element | null, margin = 0) => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight - margin && r.bottom > 0;
      };
      setShow(window.scrollY > 700 && !visible(footer) && !visible(inline, 40));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={cn("fixed inset-x-4 bottom-4 z-40 transition-[opacity,transform] duration-300 lg:hidden", show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0")}>
      <Link href={href} className="flex h-[3.25rem] items-center justify-center gap-2 rounded-full bg-signal-500 px-5 text-[15px] font-bold text-ink-900 shadow-[0_18px_40px_-12px_rgba(11,25,44,0.55)] ring-1 ring-signal-300/60" data-testid="blog-mobile-floating-cta">
        {text} <ArrowRight aria-hidden className="size-4" />
      </Link>
    </div>
  );
}
