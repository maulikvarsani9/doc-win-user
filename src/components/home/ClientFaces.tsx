import Image from "next/image";
import { cn } from "@/lib/utils";
import { testimonials } from "@/content/home";

export function ClientFaces({ count = 4, size = "size-8", ring = "ring-white", className }: { count?: number; size?: string; ring?: string; className?: string }) {
  return (
    <span className={cn("flex -space-x-2", className)} aria-hidden>
      {testimonials.slice(0, count).map((t) => (
        <Image key={t.name} src={t.photo} alt="" width={64} height={64} className={cn("rounded-full object-cover ring-2", size, ring)} />
      ))}
    </span>
  );
}
