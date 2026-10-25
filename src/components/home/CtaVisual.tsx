import Image from "next/image";
import { cn } from "@/lib/utils";
import { resultStats } from "@/content/home";
import { ClientFaces } from "./ClientFaces";
import { Stars } from "./Testimonials";

const home = { src: "/images/cta-doctor.png", width: 715, height: 1000, alt: "Doctor in a white coat with a stethoscope and arms crossed" };

const specialty: Record<string, typeof home> = {
  dental: { src: "/images/cta/doctor-dental.png", width: 797, height: 1000, alt: "Smiling dentist in scrubs holding dental instruments" },
  mental: { src: "/images/cta/doctor-mental.png", width: 760, height: 1000, alt: "Smiling therapist in a cream shirt" },
  pharma: { src: "/images/cta/doctor-pharma.png", width: 960, height: 1000, alt: "Smiling scientist in a lab coat and safety glasses" },
};

const rotation = [
  { src: "/images/cta/doctor-a.png", width: 896, height: 1000, alt: "Smiling healthcare professional in a white coat with a stethoscope" },
  { src: "/images/cta/doctor-f.png", width: 738, height: 1000, alt: "Smiling female doctor in a white coat with arms crossed" },
  { src: "/images/cta/doctor-g.png", width: 778, height: 1000, alt: "Doctor in a white coat holding a clipboard" },
  { src: "/images/cta/doctor-h.png", width: 749, height: 1000, alt: "Smiling senior doctor in a white coat with arms crossed" },
];

const growth = resultStats[0];
const rating = resultStats[2];

function GrowthLine() {
  const line = "M0 132 C 50 128, 80 118, 125 104 S 205 92, 250 70 S 330 36, 400 20";
  return (
    <svg aria-hidden viewBox="0 0 400 160" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[52%] w-full">
      <defs>
        <linearGradient id="cta-growth-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3D97CC" stopOpacity="0.42" />
          <stop offset="1" stopColor="#3D97CC" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L400 160 L0 160Z`} fill="url(#cta-growth-fill)" />
      <path d={line} fill="none" stroke="#7FBEE3" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function RatingBadge() {
  return (
    <div className="absolute bottom-[6%] left-[4%] z-20 max-w-[58%] rounded-xl bg-white px-3 py-2.5 sm:max-w-none sm:rounded-2xl shadow-[0_24px_50px_-20px_rgba(6,17,30,0.6)] sm:p-3.5 sm:pr-5" data-testid="cta-visual-rating">
      <div className="flex items-center gap-3">
        <span className="hidden sm:block"><ClientFaces count={3} size="size-8" /></span>
        <div>
          <Stars className="size-3" />
          <p className="mt-1 text-[12.5px] leading-tight text-ink-600 sm:text-[13px]"><span className="font-semibold text-ink-900">{rating.value}</span> <span className="sm:hidden">client rating</span><span className="hidden sm:inline">{rating.label.toLowerCase()}</span></p>
        </div>
      </div>
    </div>
  );
}

export type CtaPhoto = number | keyof typeof specialty;

export function CtaVisual({ className, photo }: { className?: string; photo?: CtaPhoto }) {
  const p = typeof photo === "string" ? specialty[photo] : photo ? rotation[(photo - 1) % rotation.length] : home;
  return (
    <div className={cn("relative aspect-[6/5] sm:aspect-[5/4]", className)} data-testid="cta-visual">
      <div aria-hidden className="panel-grid absolute inset-x-0 bottom-0 top-[16%] overflow-hidden rounded-[1.5rem] bg-ink-900 sm:rounded-[2.25rem]">
        <span className="absolute -right-[16%] top-[8%] aspect-square w-[70%] rounded-full bg-brand-600/60" />
        <GrowthLine />
      </div>
      <div className="absolute left-[6%] top-[24%] z-20 max-w-[42%] sm:top-[22%]" data-testid="cta-visual-stat">
        <p className="text-[2.6rem] font-normal leading-none tracking-[-0.01em] text-white sm:text-[3.4rem]">{growth.value}</p>
        <p className="mt-2 text-[13px] leading-snug text-ink-300 sm:text-[14px]">{growth.label}</p>
      </div>
      <Image
        src={p.src}
        alt={p.alt}
        width={p.width}
        height={p.height}
        sizes="(min-width: 1024px) 340px, 60vw"
        className="absolute bottom-0 right-[2%] z-10 h-[86%] w-auto max-w-[52%] object-contain object-bottom drop-shadow-[0_20px_30px_rgba(6,17,30,0.35)] sm:h-[98%] sm:max-w-[56%]"
        data-testid="cta-visual-photo"
      />
      <RatingBadge />
    </div>
  );
}
