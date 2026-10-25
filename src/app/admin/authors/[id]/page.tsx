"use client";

import { useParams } from "next/navigation";
import { AuthorEditor } from "@/components/admin/authors/AuthorEditor";

export default function EditAuthorPage() {
  const { id } = useParams<{ id: string }>();
  return <AuthorEditor key={id} id={id} />;
}
