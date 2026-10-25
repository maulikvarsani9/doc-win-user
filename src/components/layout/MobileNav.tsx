"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ArrowRight, Mail } from "lucide-react";
import { serviceCategories, servicesIn } from "@/content/services";
import { audienceGroups, audiencesIn } from "@/content/audiences";
import { aboutLinks, ebookLink, resourceLinks, site } from "@/content/site";
import { CtaLink } from "@/components/leads/CtaLink";
import { btn } from "@/components/ui-kit";

type Section = { name?: string; links: { href: string; label: string }[] };

function Group({ title, id, all, sections }: { title: string; id: string; all?: { href: string; label: string }; sections: Section[] }) {
  return (
    <details className="group border-b border-ink-100">
      <summary data-testid={`mobile-accordion-${id}`} className="flex cursor-pointer list-none items-center justify-between py-[18px] text-[1.15rem] font-medium tracking-[-0.01em] text-ink-900 [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown aria-hidden className="size-5 text-ink-400 transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="space-y-6 pb-6">
        {all && (
          <Link href={all.href} className="inline-flex items-center gap-2 text-[15px] font-medium text-brand-700" data-testid={`mobile-all-${id}`}>
            {all.label} <ArrowRight aria-hidden className="size-4" />
          </Link>
        )}
        {sections.map((s, i) => (
          <div key={s.name ?? i}>
            {s.name && <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">{s.name}</p>}
            <ul className="mt-2.5 space-y-2.5">
              {s.links.map((l) => <li key={l.href}><Link href={l.href} className="text-[15px] text-ink-700">{l.label}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
    </details>
  );
}

const serviceSections = serviceCategories.map((c) => ({ name: c.name, links: servicesIn(c.id).map((s) => ({ href: `/services/${s.slug}/`, label: s.name })) }));
const audienceSections = audienceGroups.map((g) => ({ name: g.name, links: audiencesIn(g.id).map((a) => ({ href: `/who-we-serve/${a.slug}/`, label: a.name })) }));
const resourceSections = [{ links: [...resourceLinks, ebookLink] }];
const aboutSections = [{ links: aboutLinks }];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(0);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const toggle = () => { if (!open) setSession((n) => n + 1); setOpen(!open); };

  return (
    <div className="lg:hidden">
      <button type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={toggle} className="grid size-11 place-items-center rounded-full border border-ink-900/15 bg-white text-ink-900" data-testid="mobile-menu-toggle">
        {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>
      <div
        id="mobile-menu"
        hidden={!open}
        onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setOpen(false); }}
        className="fixed inset-x-0 bottom-0 top-[76px] z-40 overflow-y-auto bg-white px-5 pb-12 pt-2"
        data-testid="mobile-menu"
      >
        <div key={session}>
          <Group title="Services" id="services" all={{ href: "/services/", label: "View all services" }} sections={serviceSections} />
          <Group title="Who We Serve" id="who-we-serve" all={{ href: "/who-we-serve/", label: "View all industries" }} sections={audienceSections} />
          <Group title="Resources" id="resources" sections={resourceSections} />
          <Group title="About" id="about" sections={aboutSections} />
          <Link href="/contact/" className="flex items-center justify-between border-b border-ink-100 py-[18px] text-[1.15rem] font-medium tracking-[-0.01em] text-ink-900" data-testid="mobile-contact-us">
            Contact Us <ArrowRight aria-hidden className="size-5 text-ink-400" />
          </Link>
        </div>
        <a href={`mailto:${site.email}`} className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-brand-700" data-testid="mobile-email-link">
          <Mail aria-hidden className="size-4" />{site.email}
        </a>
        <div className="mt-8 grid gap-3">
          <CtaLink kind="contact" className={btn("dark", "lg", "w-full")} testId="mobile-cta-strategy">Book a Strategy Call</CtaLink>
          <CtaLink kind="audit" className={btn("outline", "lg", "w-full")} testId="mobile-cta-audit">Get a Free Marketing Audit</CtaLink>
        </div>
      </div>
    </div>
  );
}
