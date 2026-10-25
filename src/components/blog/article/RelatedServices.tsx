import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/lib/cms";
import { relatedPages } from "@/content/topic-links";

export function RelatedServices({ post }: { post: Post }) {
  const links = relatedPages(post.topics.map((t) => t.slug), post.specialities.map((s) => s.slug));
  if (!links.length) return null;
  return (
    <nav aria-labelledby="article-related-services" className="mt-10 rounded-[1.5rem] bg-paper p-6 sm:p-8" data-testid="article-related-services">
      <h2 id="article-related-services" className="font-display text-[1.2rem] font-medium tracking-[-0.015em] text-ink-900">How DocWin can help</h2>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group inline-flex items-center gap-2 text-[15px] font-semibold text-brand-700 hover:underline" data-testid={`article-related-${l.slug}`}>
              {l.label} <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
