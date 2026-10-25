import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container, btn } from "@/components/ui-kit";
import { CtaLink } from "@/components/leads/CtaLink";
import { site } from "@/content/site";
import { SocialLinks } from "./SocialLinks";

const columns = [
  {
    title: "Services",
    links: [
      ["Medical SEO", "/services/medical-seo/"], ["Google Business Profile & Listings", "/services/google-business-profile-listing-management/"],
      ["Google Ads", "/services/google-ads-healthcare/"], ["Meta Ads", "/services/meta-ads-healthcare/"],
      ["Medical Website Design", "/services/medical-website-design/"], ["Reputation Management", "/services/healthcare-reputation-management/"],
      ["All services", "/services/"],
    ],
  },
  {
    title: "Who We Serve",
    links: [
      ["Medical Practices", "/who-we-serve/doctors-medical-practices/"], ["Dental Practices", "/who-we-serve/dental-practices/"],
      ["Hospitals & Health Systems", "/who-we-serve/hospitals/"], ["Multi-Location Groups", "/who-we-serve/multi-location-healthcare-groups/"],
      ["Healthcare SaaS & Telehealth", "/who-we-serve/digital-health/"], ["All industries", "/who-we-serve/"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Resources & Guides", "/resources/"], ["A Doctor's Guide to Digital Success", "/resources/doctors-guide-to-digital-success/"],
      ["Blog", "/blogs/"], ["Case Studies", "/case-studies/"],
    ],
  },
  {
    title: "Company",
    links: [["About Us", "/about/"], ["Our Team", "/about/team/"], ["Contact", "/contact/"], ["Free Marketing Audit", "/free-marketing-audit/"]],
  },
];

const legal = [["Privacy Policy", "/privacy-policy/"], ["Cookie Policy", "/cookie-policy/"], ["Terms & Conditions", "/terms-and-conditions/"], ["Disclaimer", "/disclaimer/"]];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-300" data-testid="site-footer">
      <Container className="pt-14 sm:pt-20 lg:pt-24">
        <div className="grid gap-9 sm:gap-12 lg:grid-cols-12 lg:items-end">
          <figure className="lg:col-span-8" data-testid="footer-mission">
            <span aria-hidden className="block font-display text-[3.5rem] font-normal leading-[0.6] text-signal-500 sm:text-[4.5rem]">“</span>
            <blockquote className="mt-3 font-display text-[1.3rem] font-normal leading-[1.4] tracking-[-0.012em] text-white sm:mt-4 sm:text-[2.1rem] sm:leading-[1.35]">{site.mission}</blockquote>
            <figcaption className="mt-4 text-[13.5px] text-ink-400 sm:mt-6 sm:text-[14px]">The DocWin Digital mission</figcaption>
          </figure>
          <div className="cta-row lg:col-span-4 lg:justify-end">
            <CtaLink kind="contact" className={btn("signal", "lg")} testId="footer-cta-strategy">Book a Strategy Call <ArrowRight aria-hidden /></CtaLink>
            <CtaLink kind="audit" className={btn("outlineLight", "lg")} testId="footer-cta-audit">Request Free Audit</CtaLink>
          </div>
        </div>

        <div className="mt-12 grid gap-10 border-t border-white/[0.08] pt-10 sm:mt-20 sm:gap-12 sm:pt-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="DocWin Digital home" className="inline-flex" data-testid="footer-logo">
              <Image src={site.logoWhite} alt="DocWin Digital" width={608} height={171} unoptimized className="h-10 w-auto sm:h-12" />
            </Link>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ink-200 sm:mt-6">{site.tagline}</p>
            <p className="mt-3 max-w-xs text-[13.5px] leading-relaxed text-ink-400" data-testid="footer-markets">Working with healthcare organizations worldwide, including the US, Canada, the UK and Australia. Please don&apos;t send patient health information through this website.</p>
            <SocialLinks />
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4 sm:gap-10 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white sm:text-[13px]">{col.title}</p>
                <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
                  {col.links.map(([label, href]) => (
                    <li key={href}><Link href={href} className="text-[14px] leading-snug text-ink-300 transition-colors hover:text-white sm:text-[14.5px]">{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.08] py-7 text-[13px] text-ink-400 sm:mt-16 sm:py-8 sm:text-[13.5px] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} DocWin Digital. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 sm:gap-x-6">
            {legal.map(([label, href]) => <li key={href}><Link href={href} className="transition-colors hover:text-white" data-testid={`footer-legal-${href.replace(/\//g, "")}`}>{label}</Link></li>)}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
