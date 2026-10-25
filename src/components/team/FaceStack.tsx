import Image from "next/image";
import { cn } from "@/lib/utils";
import { face } from "@/content/team";

export function FaceStack({ slugs = [], people, ring = "ring-white", size = "size-9", className }: { slugs?: string[]; people?: { slug: string; avatar: string }[]; ring?: string; size?: string; className?: string }) {
  const faces = people ?? slugs.map((s) => ({ slug: s, avatar: face(s) }));
  return (
    <span className={cn("flex shrink-0 -space-x-2.5", className)} aria-hidden>
      {faces.map((f) => (
        <Image key={f.slug} src={f.avatar} alt="" width={72} height={72} className={cn("rounded-full object-cover ring-2", size, ring)} />
      ))}
    </span>
  );
}
