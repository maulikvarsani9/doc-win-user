import { CategoryPage, categoryMetadata } from "@/components/blog/CategoryPage";
import type { SearchParams } from "@/lib/listing";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }>; searchParams: SearchParams };

export async function generateMetadata({ params, searchParams }: Props) {
  return categoryMetadata("topic", (await params).slug, searchParams);
}

export default async function TopicPage({ params, searchParams }: Props) {
  return <CategoryPage kind="topic" slug={(await params).slug} searchParams={searchParams} />;
}
