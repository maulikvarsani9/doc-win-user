import type { Ctas, Post } from "@/lib/cms";
import { Container } from "@/components/ui-kit";
import { PostCard } from "@/components/blog/PostCard";
import { ArticleCover, ArticleHeader } from "./ArticleHeader";
import { ReadingProgress } from "./ReadingProgress";
import { Toc } from "./Toc";
import { buildBlocks } from "./blocks";
import { InlineAuditCta, SidebarAuditCta } from "./AuditCtas";
import { DoctorPanelCta } from "./DoctorPanelCta";
import { MobileAuditPill } from "./MobileAuditPill";
import { AuthorBio } from "./AuthorBio";
import { RelatedServices } from "./RelatedServices";

type Faces = { slug: string; avatar: string }[];

function Body({ post, ctas, faces }: { post: Post; ctas: Ctas; faces: Faces }) {
  const { blocks, doctorAtEnd } = buildBlocks(post, ctas);
  return (
    <>
      <div data-testid="article-prose-body">
        {blocks.map((b, i) =>
          b.kind === "html" ? <div key={i} className="article-prose" dangerouslySetInnerHTML={{ __html: b.html }} />
            : b.kind === "audit" ? <InlineAuditCta key={i} cta={ctas.audit} /> : <DoctorPanelCta key={i} cta={ctas.doctor} faces={faces} />,
        )}
      </div>
      {doctorAtEnd && <DoctorPanelCta cta={ctas.doctor} faces={faces} />}
    </>
  );
}

function Related({ posts }: { posts: Post["related"] }) {
  if (!posts.length) return null;
  return (
    <section className="bg-paper py-14 sm:py-20" data-testid="related-articles-grid">
      <Container>
        <h2 className="font-display text-[1.6rem] tracking-[-0.015em] text-ink-900 sm:text-[2rem]">Keep reading</h2>
        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {posts.map((p, i) => <PostCard key={p.id} post={p} guide={p.ultimate_guide} testId={`related-article-${i}`} />)}
        </div>
      </Container>
    </section>
  );
}

export function ArticleView({ post, ctas, faces }: { post: Post; ctas: Ctas; faces: Faces }) {
  const sidebar = ctas.audit.sidebar_enabled && post.show_audit_sidebar;
  const pill = ctas.audit.mobile_enabled && post.show_audit_sidebar;
  const toc = post.toc.length > 1;
  return (
    <article data-testid="blog-article">
      <ReadingProgress targetId="article-content" />
      <ArticleHeader post={post} />
      <ArticleCover post={post} />
      <div className="mx-auto grid max-w-[1360px] gap-10 px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[220px_minmax(0,1fr)_300px] xl:gap-12">
        <aside className="hidden xl:block">{toc && <div className="sticky top-28"><Toc items={post.toc} variant="desktop" /></div>}</aside>
        <div id="article-content" className="mx-auto w-full min-w-0 max-w-[720px]">
          {toc && <div className="mb-10 xl:hidden"><Toc items={post.toc} variant="mobile" /></div>}
          <Body post={post} ctas={ctas} faces={faces} />
          <AuthorBio post={post} />
          <RelatedServices post={post} />
        </div>
        <aside className="hidden lg:block">{sidebar && <div className="sticky top-28"><SidebarAuditCta cta={ctas.audit} /></div>}</aside>
      </div>
      <Related posts={post.related} />
      {pill && <MobileAuditPill text={ctas.audit.mobile_text} href={ctas.audit.href} />}
    </article>
  );
}
