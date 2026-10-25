import { CategoryPage, categoryMetadata } from "@/components/blog/CategoryPage";
import type { SearchParams } from "@/lib/listing";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }>; searchParams: SearchParams };

export async function generateMetadata({ params, searchParams }: Props) {
  return categoryMetadata("speciality", (await params).slug, searchParams);
}

export default async function SpecialityPage({ params, searchParams }: Props) {
  return <CategoryPage kind="speciality" slug={(await params).slug} searchParams={searchParams} />;
}
