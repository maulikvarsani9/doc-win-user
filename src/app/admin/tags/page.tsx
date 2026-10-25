"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { PageHeader } from "@/components/admin/ui";
import { TermTable } from "@/components/admin/tags/TermTable";

const TABS = [
  { value: "topic", label: "Topics", text: "Marketing subjects such as Local SEO or Paid Advertising. Topics with 3+ published posts get an indexable category page." },
  { value: "speciality", label: "Specialities", text: "Who the article is for, such as Dental Practices or Cardiology." },
  { value: "resource_type", label: "Resource types", text: "Formats for the Resources hub, such as Ebook, Checklist or Template." },
] as const;

export default function AdminTagsPage() {
  return (
    <>
      <PageHeader title="Topics & specialities" text="Tags power the blog and resource filters. You can also create tags while editing a post." />
      <Tabs.Root defaultValue="topic" className="px-5 pb-12 sm:px-8">
        <Tabs.List className="mb-6 inline-flex gap-1 rounded-lg bg-white p-1 ring-1 ring-ink-900/[0.08]" aria-label="Tag types">
          {TABS.map((t) => (
            <Tabs.Trigger key={t.value} value={t.value} className="rounded-md px-3.5 py-1.5 text-[13.5px] font-semibold text-ink-600 transition-colors data-[state=active]:bg-ink-900 data-[state=active]:text-white" data-testid={`admin-tags-tab-${t.value}`}>
              {t.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {TABS.map((t) => (
          <Tabs.Content key={t.value} value={t.value}>
            <p className="mb-4 max-w-2xl text-[13.5px] text-ink-500">{t.text}</p>
            <TermTable kind={t.value} />
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </>
  );
}
