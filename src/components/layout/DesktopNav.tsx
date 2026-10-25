"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav, type NavMenu } from "@/content/site";
import { MegaServices, MegaAudiences, MenuResources, MenuAbout } from "./MegaMenus";

const panels: Record<NavMenu, { Panel: () => React.ReactNode; wide: boolean }> = {
  services: { Panel: MegaServices, wide: true },
  audiences: { Panel: MegaAudiences, wide: true },
  resources: { Panel: MenuResources, wide: false },
  about: { Panel: MenuAbout, wide: false },
};

const testId = (label: string) => `nav-${label.toLowerCase().replace(/\s+/g, "-")}`;
const isMouse = (e: React.PointerEvent) => e.pointerType === "mouse";

export function DesktopNav() {
  const [open, setOpen] = useState<NavMenu | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const cancelClose = () => clearTimeout(timer.current);
  const closeSoon = () => { cancelClose(); timer.current = setTimeout(() => setOpen(null), 250); };

  useEffect(() => setOpen(null), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const onDown = (e: PointerEvent) => { if (!navRef.current?.contains(e.target as Node)) setOpen(null); };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => { window.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown); clearTimeout(timer.current); };
  }, []);

  return (
    <nav ref={navRef} aria-label="Main" className="hidden lg:block"
      onPointerLeave={(e) => isMouse(e) && closeSoon()}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null); }}>
      <ul className="flex items-center gap-0.5">
        {mainNav.map((item) => {
          const active = item.match.some((m) => pathname.startsWith(m));
          const isOpen = open === item.menu;
          const { Panel, wide } = panels[item.menu];
          return (
            <li key={item.menu} className={cn(!wide && "relative")}
              onPointerEnter={(e) => { if (isMouse(e)) { cancelClose(); setOpen(item.menu); } }}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`menu-${item.menu}`}
                onClick={() => { cancelClose(); setOpen(isOpen ? null : item.menu); }}
                className={cn(
                  "flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[15px] transition-colors duration-200 xl:px-3.5",
                  isOpen ? "bg-ink-900/[0.05] text-ink-900" : active ? "text-brand-700" : "text-ink-700 hover:text-ink-900",
                )}
                data-testid={testId(item.label)}
              >
                {item.label}
                <ChevronDown aria-hidden className={cn("size-4 text-ink-400 transition-transform duration-300", isOpen && "rotate-180 text-ink-700")} />
              </button>
              <div
                id={`menu-${item.menu}`}
                onPointerEnter={cancelClose}
                onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setOpen(null); }}
                className={cn(
                  "absolute top-full transition-[opacity,transform,visibility] duration-200 ease-out",
                  wide ? "inset-x-0 pt-4" : "left-1/2 w-[600px] -translate-x-1/2 pt-2",
                  isOpen ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-1.5 opacity-0",
                )}
                data-testid={`menu-${item.menu}`}
              >
                {wide && <span aria-hidden className="absolute inset-x-0 -top-6 h-10" />}
                <div className={cn("relative", wide && "mx-auto max-w-[1240px] px-5 sm:px-8")}>
                  <div className="overflow-hidden rounded-[1.5rem] border border-ink-900/[0.07] bg-white shadow-[0_40px_80px_-30px_rgba(11,25,44,0.35)]">
                    <Panel />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
        <li>
          <Link href="/contact/" className={cn("whitespace-nowrap rounded-full px-3 py-2 text-[15px] transition-colors duration-200 xl:px-3.5", pathname.startsWith("/contact") ? "text-brand-700" : "text-ink-700 hover:text-ink-900")}
            onPointerEnter={(e) => isMouse(e) && setOpen(null)} data-testid="nav-contact-us">
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
}
