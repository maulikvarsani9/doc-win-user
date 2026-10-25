"use client";

import { useParams } from "next/navigation";
import { ResourceEditor } from "@/components/admin/resources/ResourceEditor";

export default function EditResourcePage() {
  const { id } = useParams<{ id: string }>();
  return <ResourceEditor key={id} id={id} />;
}
