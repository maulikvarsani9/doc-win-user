import { notFound } from "next/navigation";
import { DraftPage } from "@/components/templates/DraftPage";
import { ServiceTemplate } from "@/components/templates/service/ServiceTemplate";
import { serviceBySlug, services, servicesIn, serviceCategories } from "@/content/services";
import { servicePages } from "@/content/service-pages";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  const p = servicePages[s.slug];
  const path = `/services/${s.slug}/`;
  if (!p) return pageMetadata({ title: `${s.name} | DocWin Digital`, description: s.description, path, noindex: true });
  return pageMetadata({ title: p.seoTitle, description: p.metaDescription, path, noindex: s.status !== "ready-for-review", image: { url: `/images/og/service-${s.slug}.jpg`, width: 1200, height: 630 } });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  const page = servicePages[s.slug];
  if (page) return <ServiceTemplate service={s} page={page} />;
  const cat = serviceCategories.find((c) => c.id === s.category)!;
  const related = servicesIn(s.category).filter((x) => x.slug !== s.slug).slice(0, 3);
  return (
    <DraftPage
      eyebrow={cat.name}
      title={s.name}
      intro={s.description}
      template="Service Page"
      crumbs={[{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }, { name: s.name, path: `/services/${s.slug}/` }]}
      status={s.status}
      primaryKeyword={s.primaryKeyword}
      supportingKeywords={s.supportingKeywords}
      reviewNote={s.reviewNote}
      related={related.map((r) => ({ href: `/services/${r.slug}/`, name: r.name, description: r.description, linkLabel: r.linkLabel }))}
    />
  );
}
