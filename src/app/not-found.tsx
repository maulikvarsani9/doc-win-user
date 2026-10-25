import Link from "next/link";
import { Container, Eyebrow, btn } from "@/components/ui-kit";

export const metadata = { title: { absolute: "Page Not Found | DocWin Digital" }, robots: { index: false } };

const links = [
  ["Healthcare marketing services", "/services/"],
  ["Industries we serve", "/who-we-serve/"],
  ["Free marketing audit", "/free-marketing-audit/"],
  ["Contact DocWin", "/contact/"],
];

export default function NotFound() {
  return (
    <section className="bg-ink-50" data-testid="not-found-page">
      <Container className="py-28 lg:py-36">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-5xl font-normal leading-[1.04] tracking-[-0.02em] sm:text-6xl">We couldn&apos;t find that page</h1>
        <p className="mt-6 max-w-xl text-lg text-ink-600">The page may have moved or no longer exists. These are good places to continue:</p>
        <ul className="cta-row mt-8 sm:mt-10">
          {links.map(([label, href], i) => (
            <li key={href}><Link href={href} className={btn(i === 0 ? "dark" : "outline", "md")} data-testid={`not-found-link-${i}`}>{label}</Link></li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
