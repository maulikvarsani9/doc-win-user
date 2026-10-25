import Image from "next/image";
import { media } from "@/lib/cms-types";
import { cn } from "@/lib/utils";

const initials = (n: string) => n.replace(/^Dr\.?\s+/, "").split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();

export function Avatar({ name, src, size, className, testId }: { name: string; src?: string; size: number; className?: string; testId?: string }) {
  const style = { width: size, height: size };
  if (src) return <Image src={media(src)} alt="" width={size * 2} height={size * 2} style={style} className={cn("shrink-0 rounded-full object-cover", className)} data-testid={testId} />;
  return (
    <span aria-hidden style={{ ...style, fontSize: Math.max(11, size / 2.8) }} className={cn("grid shrink-0 place-items-center rounded-full bg-brand-100 font-semibold text-brand-700", className)} data-testid={testId}>
      {initials(name)}
    </span>
  );
}
