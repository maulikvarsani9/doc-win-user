"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, BookOpen, Check, Building2, Gauge, Mail, PenLine, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { serviceCategories, servicesIn, services } from "@/content/services";
import { audienceGroups, audiencesIn } from "@/content/audiences";
import { aboutLinks, ebookLink, resourceLinks, type NavLink } from "@/content/site";
import { ebook } from "@/content/home";
import { CtaLink } from "@/components/leads/CtaLink";
import { FaceStack } from "@/components/team/FaceStack";
import { ClientFaces } from "@/components/home/ClientFaces";

const heading = "mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500";
const icons = { book: BookOpen, pen: PenLine, gauge: Gauge, building: Building2, users: Users, mail: Mail };

function AllLink({ href, children, testId }: { href: string; children: React.ReactNode; testId: string }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 text-[14.5px] font-medium text-brand-700 hover:text-brand-800" data-testid={testId}>
      {children} <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

function DoctorAside() {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-ink-900 p-6 text-white">
      <div>
        <FaceStack slugs={["wali-rahmani", "nehan-fatima", "yasir-niyazi", "pooja-singh"]} ring="ring-ink-900" size="size-9" />
        <p className="mt-5 text-[1.15rem] leading-snug tracking-[-0.01em]">Every patient-facing message is reviewed by a practicing doctor.</p>
        <Link href="/about/team/" className="mt-3 inline-block text-[13.5px] text-ink-300 underline-offset-4 hover:text-white hover:underline" data-testid="mega-services-panel-link">Meet our doctor panel</Link>
        <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-[13.5px] text-ink-200">
          {["Medical accuracy", "Ethical communication", "Clinical credibility"].map((t) => (
            <li key={t} className="flex items-center gap-2"><Check aria-hidden className="size-3.5 text-signal-400" strokeWidth={3} />{t}</li>
          ))}
        </ul>
      </div>
      <CtaLink kind="audit" className="group mt-8 inline-flex items-center gap-2 text-[14.5px] font-medium text-signal-400 hover:text-signal-300" testId="mega-services-audit">
        Get a free marketing audit <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
      </CtaLink>
    </div>
  );
}

export function MegaServices() {
  const [active, setActive] = useState(serviceCategories[0].id);
  return (
    <div className="grid grid-cols-[232px_1fr_260px] gap-2 p-3">
      <div role="tablist" aria-orientation="vertical" aria-label="Service categories" className="flex flex-col gap-0.5 py-2">
        {serviceCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={active === c.id}
            aria-controls={`mega-cat-${c.id}`}
            onMouseEnter={() => setActive(c.id)}
            onFocus={() => setActive(c.id)}
            onClick={() => setActive(c.id)}
            className={cn("flex items-center justify-between rounded-xl px-4 py-2.5 text-left text-[14.5px] transition-colors duration-150", active === c.id ? "bg-paper font-medium text-ink-900" : "text-ink-600 hover:text-ink-900")}
            data-testid={`mega-cat-${c.id}`}
          >
            {c.name}
            <span className="text-[12px] tabular-nums text-ink-400">{servicesIn(c.id).length}</span>
          </button>
        ))}
      </div>
      <div className="flex min-h-[472px] flex-col rounded-2xl bg-paper/70 p-6">
        {serviceCategories.map((c) => (
          <div key={c.id} id={`mega-cat-${c.id}`} role="tabpanel" hidden={active !== c.id} className="flex-1">
            <p className="text-[1.15rem] tracking-[-0.01em] text-ink-900">{c.name}</p>
            <p className="mt-1 text-[13.5px] text-ink-500">{c.blurb}</p>
            <ul className="mt-5 grid grid-cols-2 gap-1">
              {servicesIn(c.id).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/`} className="block rounded-xl p-3 transition-colors duration-150 hover:bg-white" data-testid={`mega-service-${s.slug}`}>
                    <span className="block text-[14.5px] font-medium leading-snug text-ink-900">{s.name}</span>
                    <span className="mt-1 line-clamp-2 block text-[13px] leading-relaxed text-ink-500">{s.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="mt-4 border-t border-ink-900/[0.06] pt-4">
          <AllLink href="/services/" testId="mega-services-all">Explore all {services.length} services</AllLink>
        </div>
      </div>
      <DoctorAside />
    </div>
  );
}

export function MegaAudiences() {
  return (
    <div className="grid grid-cols-[1fr_260px] gap-2 p-3">
      <div className="grid grid-cols-4 gap-6 p-5">
        {audienceGroups.map((g) => (
          <div key={g.id}>
            <p className={heading}>{g.name}</p>
            <ul>
              {audiencesIn(g.id).map((a) => (
                <li key={a.slug}>
                  <Link href={`/who-we-serve/${a.slug}/`} className="block py-[5px] text-[14.5px] leading-snug text-ink-700 transition-colors hover:text-brand-600" data-testid={`mega-audience-${a.slug}`}>{a.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-between rounded-2xl bg-paper p-6">
        <div>
          <ClientFaces count={4} size="size-9" ring="ring-paper" />
          <p className="mt-5 text-[1.15rem] leading-snug tracking-[-0.01em] text-ink-900">From solo practices to health systems and healthcare companies.</p>
        </div>
        <div className="mt-8"><AllLink href="/who-we-serve/" testId="mega-audiences-all">Explore all industries</AllLink></div>
      </div>
    </div>
  );
}

function LinkList({ links, testPrefix }: { links: NavLink[]; testPrefix: string }) {
  return (
    <ul className="flex flex-col gap-0.5">
      {links.map((l) => {
        const Icon = icons[l.icon];
        return (
          <li key={l.href}>
            <Link href={l.href} className="group flex items-start gap-3.5 rounded-xl p-3 transition-colors duration-150 hover:bg-paper" data-testid={`${testPrefix}-${l.href.split("/").filter(Boolean).pop()}`}>
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-white"><Icon aria-hidden className="size-[17px]" strokeWidth={1.8} /></span>
              <span>
                <span className="block text-[14.5px] font-medium text-ink-900">{l.label}</span>
                <span className="mt-0.5 block text-[13px] leading-snug text-ink-500">{l.text}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function MenuResources() {
  return (
    <div className="grid grid-cols-[1fr_220px] gap-2 p-3">
      <LinkList links={resourceLinks} testPrefix="menu-resources" />
      <Link href={ebookLink.href} className="group flex flex-col rounded-2xl bg-ink-900 p-4 text-white" data-testid="menu-resources-ebook">
        <span className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-ink-800">
          <Image src={ebook.cover} alt="" fill sizes="200px" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
        </span>
        <span className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-signal-400">Free ebook</span>
        <span className="mt-1 text-[14.5px] leading-snug">{ebookLink.label}</span>
      </Link>
    </div>
  );
}

export function MenuAbout() {
  return (
    <div className="grid grid-cols-[1fr_220px] gap-2 p-3">
      <LinkList links={aboutLinks} testPrefix="menu-about" />
      <Link href="/about/team/" className="group flex flex-col justify-between rounded-2xl bg-paper p-5" data-testid="menu-about-founders">
        <FaceStack slugs={["wali-rahmani", "arbaz-fatmi"]} ring="ring-paper" size="size-11" />
        <span className="mt-6 block text-[14.5px] leading-snug text-ink-900">Founded by a doctor and a healthcare marketer.</span>
        <span className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-brand-700">Meet the team <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" /></span>
      </Link>
    </div>
  );
}
