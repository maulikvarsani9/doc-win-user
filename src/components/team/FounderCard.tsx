import Image from "next/image";
import type { Person } from "@/content/team";

export function FounderCard({ person, testId }: { person: Person; testId: string }) {
  return (
    <figure className="rounded-[1.5rem] bg-paper p-6 sm:grid sm:grid-cols-[176px_1fr] sm:gap-7 sm:rounded-[2rem] sm:p-9" data-testid={testId}>
      <div className="relative hidden aspect-[4/5] w-full overflow-hidden rounded-[1.25rem] bg-[#F4E4D8] sm:block">
        <Image src={person.photo} alt={`${person.name}, ${person.role}`} fill sizes="176px" className="object-cover object-[50%_12%]" />
      </div>
      <div className="flex flex-col">
        <blockquote className="font-display text-[1.08rem] font-normal leading-[1.55] tracking-[-0.005em] text-ink-900 sm:text-[1.28rem] sm:font-medium sm:leading-[1.5]">“{person.quote}”</blockquote>
        <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-900/10 pt-5 sm:mt-auto sm:block">
          <Image src={person.avatar} alt="" width={96} height={96} className="size-12 shrink-0 rounded-full object-cover sm:hidden" />
          <span>
            <span className="block font-semibold leading-snug text-ink-900">{person.name}<span className="font-normal text-ink-600">, {person.credential}</span></span>
            <span className="mt-0.5 block text-[14px] text-ink-600">{person.role}</span>
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
