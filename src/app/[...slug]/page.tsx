import { notFound } from "next/navigation";
import { PlannedDraft, plannedMetadata } from "@/components/templates/PlannedRoute";
import { plannedByPath, plannedPages } from "@/content/pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return plannedPages.filter((p) => !/^(blogs|resources)\//.test(p.path)).map((p) => ({ slug: p.path.split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  return plannedMetadata((await params).slug) ?? {};
}

export default async function PlannedRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const slug = (await params).slug;
  if (!plannedByPath(slug.join("/"))) notFound();
  return <PlannedDraft slug={slug} />;
}
