import { Clock, Mail, MessageSquareText, Search, Route } from "lucide-react";
import { Container, Eyebrow, JsonLd } from "@/components/ui-kit";
import { Breadcrumbs } from "@/components/hubs/Breadcrumbs";
import { ContactForm } from "@/components/leads/ContactForm";
import { FaceStack } from "@/components/team/FaceStack";
import { stats } from "@/content/proof";
import { site } from "@/content/site";
import { pageMetadata, webPageSchema } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact DocWin Digital | Healthcare Marketing Consultation",
  description: "Contact DocWin Digital to book a healthcare marketing consultation or strategy call. Email arbaz@docwindigital.com. We typically respond within 24 hours.",
  path: "/contact/",
});

const steps = [
  { icon: MessageSquareText, title: "Tell us about your goals", body: "Share a little about your organization and what you'd like to change." },
  { icon: Search, title: "We review your situation", body: "We look at your current website, listings and marketing before we talk." },
  { icon: Route, title: "Get practical next steps", body: "On the call, we recommend where to start, and where not to spend yet." },
];

function Reassurance() {
  return (
    <div className="mt-8 space-y-3 sm:mt-10">
      <p className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-[14px] sm:rounded-full sm:py-2 font-semibold text-ink-900 ring-1 ring-ink-900/[0.06]" data-testid="contact-response-time">
        <Clock aria-hidden className="size-4 text-signal-600" />We typically respond within 24 hours.
      </p>
      <a href={`mailto:${site.email}`} className="group flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-ink-900/[0.06] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-24px_rgba(11,25,44,0.45)]" data-testid="contact-email-link">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-white"><Mail aria-hidden className="size-5" /></span>
        <span className="min-w-0">
          <span className="block text-[13px] text-ink-500">Prefer email? Write to us directly</span>
          <span className="block text-[15px] font-semibold text-ink-900 group-hover:text-brand-700 sm:text-[15.5px]">{site.email.split("@")[0]}@<wbr />{site.email.split("@")[1]}</span>
        </span>
      </a>
      <div className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-ink-900/[0.06]" data-testid="contact-panel-proof">
        <FaceStack slugs={["wali-rahmani", "nehan-fatima", "yasir-niyazi", "pooja-singh"]} size="size-8 sm:size-9" />
        <p className="text-[14px] leading-snug sm:text-[14.5px] text-ink-700"><span className="font-semibold text-ink-900">{stats.panel.value} practicing doctors</span> on our review panel</p>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <section className="bg-paper" data-testid="contact-page">
      <JsonLd data={webPageSchema("ContactPage", "Contact DocWin Digital", "/contact/")} />
      <Container className="pb-16 pt-6 sm:pb-24 sm:pt-10 lg:pb-32 lg:pt-12">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact/" }]} />
        <div className="mt-8 grid gap-10 sm:mt-12 sm:gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-12">
          <div className="lg:col-span-5">
            <Eyebrow>Contact us</Eyebrow>
            <h1 className="display-1 mt-5 sm:mt-6 lg:text-[3.6rem]" data-testid="contact-heading">Let&apos;s Grow Your Practice Together</h1>
            <p className="lead mt-5 sm:mt-6">Tell us what you want to achieve. We&apos;ll review your current marketing and reply with practical next steps, with no obligation.</p>
            <Reassurance />
          </div>
          <div className="lg:col-span-7 lg:row-span-2">
            <div className="-mx-1 rounded-[1.5rem] bg-white p-5 shadow-[0_40px_80px_-40px_rgba(11,25,44,0.4)] ring-1 ring-ink-900/[0.05] sm:mx-0 sm:rounded-[2rem] sm:p-10">
              <h2 className="text-[1.4rem] font-normal tracking-[-0.018em] sm:text-2xl">Send us a message</h2>
              <p className="mb-6 mt-1.5 text-[14.5px] text-ink-600 sm:mb-8 sm:mt-2 sm:text-[15px]">It takes about a minute. Fields marked * are required.</p>
              <ContactForm formId="contact-page" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink-500">What happens next</p>
            <ol className="mt-5 space-y-6 sm:space-y-7">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4" data-testid={`contact-step-${i}`}>
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-brand-600"><s.icon aria-hidden className="size-5" /></span>
                  <span>
                    <span className="block font-display text-lg font-medium text-ink-900">{s.title}</span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-ink-600">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
