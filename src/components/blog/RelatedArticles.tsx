import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui-kit";
import { PostCard } from "@/components/blog/PostCard";
import { getPosts } from "@/lib/cms";

type Props = { title: string; topic?: string; speciality?: string; testId: string };

export async function RelatedArticles({ title, topic, speciality, testId }: Props) {
  if (!topic && !speciality) return null;
  const { items } = await getPosts({ topic, speciality, per_page: 3 }, 300);
  if (!items.length) return null;
  const more = topic ? `/blogs/topic/${topic}/` : `/blogs/speciality/${speciality}/`;
  return (
    <section className="bg-white py-14 sm:py-20" data-testid={testId}>
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="display-3">{title}</h2>
          <Link href={items.length >= 3 ? more : "/blogs/"} className="inline-flex items-center gap-2 text-[15px] font-semibold text-brand-700 hover:underline" data-testid={`${testId}-more`}>
            {items.length >= 3 ? "More articles" : "Visit the blog"} <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {items.map((p, i) => <PostCard key={p.id} post={p} guide={p.ultimate_guide} testId={`${testId}-card-${i}`} />)}
        </div>
      </Container>
    </section>
  );
}
