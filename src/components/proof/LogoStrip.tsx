import Image from "next/image";
import { clientLogos } from "@/content/home";
import { cn } from "@/lib/utils";

type Props = { first?: string[]; label?: string; tone?: "light" | "dark"; className?: string; testId?: string };

export function LogoStrip({ first = [], label = "Healthcare organizations we've worked with", tone = "light", className, testId = "logo-strip" }: Props) {
  const logos = [...clientLogos.filter((l) => first.includes(l.slug)), ...clientLogos.filter((l) => !first.includes(l.slug))];
  return (
    <div className={className} data-testid={testId}>
      <p className={cn("text-[11px] font-semibold uppercase tracking-[0.15em]", tone === "dark" ? "text-ink-300" : "text-ink-500")}>{label}</p>
      <ul className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-6" aria-label={label}>
        {logos.map((l) => (
          <li key={l.slug} className="flex items-center" data-testid={`${testId}-${l.slug}`}>
            <Image
              src={`/images/logos/${l.slug}.png`}
              alt={l.name}
              width={l.width}
              height={l.height}
              style={{ "--w": `${l.width}px` } as React.CSSProperties}
              className={cn(
                "h-auto w-[calc(var(--w)*0.5)] max-w-none opacity-80 transition-opacity duration-200 hover:opacity-100 sm:w-[calc(var(--w)*0.52)]",
                tone === "dark" && "brightness-0 invert opacity-60",
              )}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
