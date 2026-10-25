import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Person } from "@/content/team";

export function PortraitCard({ person, testId, sizes, large }: { person: Person; testId: string; sizes: string; large?: boolean }) {
  return (
    <figure className="group" data-testid={testId}>
      <div className={cn("relative aspect-[4/5] overflow-hidden bg-[#F4E4D8]", large ? "rounded-[1.75rem]" : "rounded-[1.25rem]")}>
        <Image
          src={person.photo}
          alt={`${person.name}, ${person.credential}`}
          fill
          sizes={sizes}
          className="object-cover object-[50%_14%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <figcaption className={large ? "mt-5" : "mt-3"}>
        <span className={cn("block font-display font-bold leading-tight tracking-[-0.015em] text-ink-900", large ? "text-[1.2rem]" : "text-[15px]")}>{person.name}</span>
        <span className={cn("mt-1 block font-medium text-ink-500", large ? "text-[14.5px]" : "text-[12.5px]")}>{person.credential}</span>
      </figcaption>
    </figure>
  );
}
