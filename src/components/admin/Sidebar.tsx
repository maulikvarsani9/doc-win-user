"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, FileText, FolderDown, LogOut, Megaphone, Tag, Users } from "lucide-react";
import type { User } from "@/lib/admin-types";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin/posts/", label: "Blog posts", icon: FileText, id: "posts" },
  { href: "/admin/authors/", label: "Authors & team", icon: Users, id: "authors" },
  { href: "/admin/tags/", label: "Topics & specialities", icon: Tag, id: "tags" },
  { href: "/admin/resources/", label: "Resources", icon: FolderDown, id: "resources" },
  { href: "/admin/ctas/", label: "CTAs", icon: Megaphone, id: "ctas" },
];

export function Sidebar({ user, onLogout }: { user: User; onLogout: () => void }) {
  const path = usePathname() ?? "";
  const link = (n: (typeof NAV)[number], compact?: boolean) => {
    const active = path.startsWith(n.href);
    return (
      <Link key={n.id} href={n.href} data-testid={`admin-nav-${n.id}${compact ? "-mobile" : ""}`} aria-current={active ? "page" : undefined}
        className={cn("flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-[14px] font-medium transition-colors duration-150", active ? "bg-white/10 text-white" : "text-ink-300 hover:bg-white/5 hover:text-white")}>
        <n.icon className="size-4" aria-hidden />{n.label}
      </Link>
    );
  };
  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-ink-900 p-4 lg:flex" data-testid="admin-sidebar">
        <Link href="/admin/posts/" className="px-2 py-3"><Image src="/brand/docwin-logo-white.png" alt="DocWin Digital" width={943} height={265} className="h-8 w-auto" /></Link>
        <p className="mt-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">Content admin</p>
        <nav className="mt-3 space-y-1">{NAV.map((n) => link(n))}</nav>
        <div className="mt-auto space-y-1 border-t border-white/10 pt-4">
          <a href="/blogs/" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[14px] text-ink-300 hover:bg-white/5 hover:text-white" data-testid="admin-view-site"><ExternalLink className="size-4" aria-hidden />View blog</a>
          <button type="button" onClick={onLogout} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[14px] text-ink-300 hover:bg-white/5 hover:text-white" data-testid="admin-logout"><LogOut className="size-4" aria-hidden />Sign out</button>
          <p className="truncate px-3 pt-2 text-[12px] text-ink-500" data-testid="admin-user-email">{user.email}</p>
        </div>
      </aside>
      <header className="sticky top-0 z-30 bg-ink-900 lg:hidden" data-testid="admin-topbar">
        <div className="flex items-center justify-between px-4 py-3">
          <Image src="/brand/docwin-logo-white.png" alt="DocWin Digital" width={943} height={265} className="h-7 w-auto" />
          <button type="button" onClick={onLogout} className="text-[13px] font-medium text-ink-300" data-testid="admin-logout-mobile">Sign out</button>
        </div>
        <nav className="no-scrollbar flex gap-1 overflow-x-auto px-3 pb-3">{NAV.map((n) => link(n, true))}</nav>
      </header>
    </>
  );
}
