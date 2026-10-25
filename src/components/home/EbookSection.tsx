import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui-kit";
import { EbookForm } from "@/components/leads/EbookForm";
import { ebook } from "@/content/home";

function Cover() {
  return (
    <div className="relative w-[150px] sm:w-[270px]" data-testid="ebook-cover">
      <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-2 rotate-[-1deg] rounded-r-xl bg-white/40" />
      <div aria-hidden className="absolute inset-0 translate-x-1.5 translate-y-1 rounded-r-xl bg-white/70" />
      <div className="relative aspect-[841/1190] -rotate-[4deg] overflow-hidden rounded-l-[4px] rounded-r-xl shadow-[0_50px_80px_-30px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:-rotate-2">
        <Image src={ebook.cover} alt={`Cover of ${ebook.guideName}: ${ebook.title}`} fill sizes="(min-width: 640px) 270px, 150px" className="object-cover" />
        <span aria-hidden className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 to-transparent" />
      </div>
    </div>
  );
}

export function EbookSection() {
  return (
    <section id="free-guide" className="bg-white py-16 sm:py-24 lg:py-32" data-testid="home-ebook">
      <Container>
        <div className="on-scroll grid overflow-hidden rounded-[1.75rem] bg-brand-700 sm:rounded-[2.75rem] lg:grid-cols-12">
          <div className="relative flex items-center justify-center overflow-hidden bg-brand-800 px-8 py-10 sm:py-16 lg:col-span-5 lg:py-20">
            <div aria-hidden className="absolute -left-24 -top-24 size-80 rounded-full border border-white/10" />
            <div aria-hidden className="absolute -bottom-32 -right-20 size-96 rounded-full border border-white/10" />
            <Cover />
          </div>
          <div className="p-6 pb-8 sm:p-12 lg:col-span-7 lg:p-16">
            <Eyebrow tone="light">Free guide · {ebook.guideName}</Eyebrow>
            <h2 className="display-3 mt-4 text-white sm:mt-5 sm:text-[2.6rem]">{ebook.title}</h2>
            <p className="mt-4 max-w-xl text-[16px] leading-[1.65] text-brand-100 sm:mt-5 sm:text-[17px] sm:leading-[1.7]">A practical guide for doctors who want more visibility, more trust and a steadier flow of new patients.</p>
            <div className="mt-7 sm:mt-9"><EbookForm /></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
