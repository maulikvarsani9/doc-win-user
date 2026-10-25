import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/ui-kit";
import { breadcrumbSchema } from "@/lib/seo";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" data-testid="breadcrumbs">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-500">
        {items.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight aria-hidden className="size-3.5 text-ink-300" />}
            {i === items.length - 1 ? (
              <span aria-current="page" className="font-medium text-ink-700">{c.name}</span>
            ) : (
              <Link href={c.path} className="hover:text-ink-900 hover:underline">{c.name}</Link>
            )}
          </li>
        ))}
      </ol>
      <JsonLd data={breadcrumbSchema(items)} />
    </nav>
  );
}
