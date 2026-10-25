"use client";

import { useEffect, useState } from "react";

export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      data-scrolled={scrolled}
      className="sticky top-0 z-40 border-b border-transparent bg-paper transition-[background-color,border-color,box-shadow] duration-300 data-[scrolled=true]:border-ink-900/[0.07] data-[scrolled=true]:bg-white data-[scrolled=true]:shadow-[0_10px_30px_-18px_rgba(11,25,44,0.35)]"
      data-testid="site-header"
    >
      {children}
    </header>
  );
}
