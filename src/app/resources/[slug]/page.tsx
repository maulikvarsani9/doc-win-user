import Image from "next/image";
import { notFound, permanentRedirect } from "next/navigation";
import { Container, JsonLd } from "@/components/ui-kit";
import { Breadcrumbs } from "@/components/hubs/Breadcrumbs";
import { PlannedDraft, plannedMetadata } from "@/components/templates/PlannedRoute";
import { ResourceAction } from "@/components/resources/ResourceAction";
import { ResourceCard, resourceHref } from "@/components/resources/ResourceCard";
import { getResource, getResources, isMoved, media, type Resource } from "@/lib/cms";
import { abs, brandTitle, pageMetadata } from "@/lib/seo";
import { plannedByPath } from "@/content/pages";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

async function load(slug: string) {
  const res = await getResource(slug);
  if (isMoved(res)) permanentRedirect(resourceHref(res.redirect));
  return res?.resource ?? null;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const r = await load(slug);
  if (!r) return plannedMetadata(["resources", slug]) ?? {};
  const title = brandTitle(r.seo_title || `${r.title}${r.type ? ` (Free ${r.type.name})` : ""}`);
  return pageMetadata({ title, description: r.seo_description || r.description, path: resourceHref(r.slug), noindex: r.noindex, image: r.cover_image || undefined });
}

async function More({ r }: { r: Resource }) {
  const { items } = await getResources({ type: r.type?.slug, exclude: r.id, per_page: 3 });
  if (!items.length) return null;
  return (
    <section className="bg-paper py-14 sm:py-20" data-testid="resource-more">
      <Container>
        <h2 className="font-display text-[1.6rem] tracking-[-0.015em] text-ink-900 sm:text-[2rem]">More resources</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">{items.map((x, i) => <ResourceCard key={x.id} r={x} testId={`resource-more-${i}`} />)}</div>
      </Container>
    </section>
  );
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  const r = await load(slug);
  if (!r) {
    if (plannedByPath(`resources/${slug}`)) return <PlannedDraft slug={["resources", slug]} />;
    notFound();
  }
  return (
    <>
      <section className="bg-paper" data-testid="resource-detail-container">
        <Container className="pb-14 pt-6 sm:pb-20 sm:pt-10">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Resources", path: "/resources/" }, { name: r.title, path: resourceHref(r.slug) }]} />
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="reveal lg:col-span-7">
              {r.type && <span className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-[12.5px] font-semibold text-brand-700" data-testid="resource-type-badge">{r.type.name}</span>}
              <h1 className="display-1 mt-5 lg:text-[3.2rem]" data-testid="resource-title-h1">{r.title}</h1>
              {r.description && <p className="lead mt-5 max-w-2xl" data-testid="resource-description">{r.description}</p>}
              {r.cover_image && (
                <div className="relative mt-10 aspect-[4/3] max-w-xl overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-ink-900/[0.06]" data-testid="resource-cover-preview">
                  <Image src={media(r.cover_image)} alt={r.cover_alt || r.title} fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-contain p-8 drop-shadow-[0_24px_40px_rgba(11,25,44,0.28)]" />
                </div>
              )}
            </div>
            <div className="lg:sticky lg:top-28 lg:col-span-5"><ResourceAction r={r} /></div>
          </div>
        </Container>
      </section>
      {r.body_html && (
        <section className="bg-white py-14 sm:py-20">
          <div className="article-prose mx-auto max-w-[720px] px-5 sm:px-8" data-testid="resource-body" dangerouslySetInnerHTML={{ __html: r.body_html }} />
        </section>
      )}
      <More r={r} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CreativeWork", name: r.title, description: r.description, url: abs(resourceHref(r.slug)),
        ...(r.cover_image && !r.cover_image.startsWith("/api/") ? { image: abs(r.cover_image) } : {}), isAccessibleForFree: true, publisher: { "@id": abs("/#organization") } }} />
    </>
  );
}
