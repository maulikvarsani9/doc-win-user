"use client";

import Link from "next/link";
import * as HoverCard from "@radix-ui/react-hover-card";
import { ArrowRight, ShieldCheck } from "lucide-react";
import type { Author } from "@/lib/cms-types";
import { Avatar } from "@/components/blog/Avatar";
import { authorHref } from "@/components/blog/PostCard";

function ProfileCard({ a }: { a: Author }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3.5">
        <Avatar name={a.name} src={a.avatar || a.photo} size={60} />
        <div className="min-w-0">
          <p className="font-display text-[1.1rem] font-medium leading-tight text-ink-900">{a.name}</p>
          {a.credential && <p className="mt-0.5 text-[13px] text-ink-500">{a.credential}</p>}
        </div>
      </div>
      {a.role && <p className="text-[13px] font-semibold text-brand-700">{a.role}</p>}
      {a.bio && <p className="line-clamp-4 text-[13.5px] leading-[1.6] text-ink-600">{a.bio}</p>}
      {a.specialties.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">{a.specialties.slice(0, 4).map((s) => <li key={s} className="rounded-full bg-paper px-2.5 py-1 text-[11.5px] font-medium text-ink-700">{s}</li>)}</ul>
      )}
      <Link href={authorHref(a.slug)} className="inline-flex items-center gap-1.5 pt-1 text-[13.5px] font-semibold text-brand-700 hover:underline" data-testid="author-popover-profile-link">
        View profile &amp; articles <ArrowRight aria-hidden className="size-3.5" />
      </Link>
    </div>
  );
}

export function AuthorChip({ author }: { author: Author }) {
  return (
    <HoverCard.Root openDelay={150} closeDelay={120}>
      <HoverCard.Trigger asChild>
        <Link href={authorHref(author.slug)} className="-ml-1.5 inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 transition-colors duration-200 hover:bg-ink-900/[0.05]" data-testid="author-chip-trigger">
          <Avatar name={author.name} src={author.avatar || author.photo} size={42} className="ring-2 ring-white" />
          <span className="leading-tight">
            <span className="block text-[11.5px] font-medium uppercase tracking-[0.12em] text-ink-500">Written by</span>
            <span className="text-[14.5px] font-semibold text-ink-900">{author.name}</span>
          </span>
        </Link>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content side="bottom" align="start" sideOffset={10} className="z-[80] w-80 rounded-2xl bg-white p-5 shadow-[0_30px_70px_-25px_rgba(11,25,44,0.45)] ring-1 ring-ink-900/[0.08] data-[state=open]:animate-in data-[state=open]:fade-in-0" data-testid="author-popover-card">
          <ProfileCard a={author} />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

export function ReviewerChip({ reviewer }: { reviewer: Author }) {
  return (
    <Link href={authorHref(reviewer.slug)} className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-2 text-[13px] text-emerald-900 ring-1 ring-emerald-200/80 transition-colors duration-200 hover:bg-emerald-100" data-testid="reviewer-chip-tag">
      <ShieldCheck aria-hidden className="size-4 text-emerald-600" />
      <span>Medically reviewed by <span className="font-semibold">{reviewer.name}</span>{reviewer.credential && <span className="text-emerald-800/80">, {reviewer.credential}</span>}</span>
    </Link>
  );
}
