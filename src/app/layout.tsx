import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { homeSeo } from "@/content/home";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HideOnAdmin } from "@/components/layout/HideOnAdmin";
import { FloatingEmail } from "@/components/layout/FloatingEmail";
import { LeadDialogProvider } from "@/components/leads/LeadDialogProvider";
import { JsonLd } from "@/components/ui-kit";
import { organizationSchema } from "@/lib/seo";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", axes: ["opsz"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: homeSeo.title, template: `%s | ${site.name}` },
  description: homeSeo.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body>
        <a href="#main" className="sr-only z-50 rounded-full bg-ink-900 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <LeadDialogProvider>
          <HideOnAdmin><SiteHeader /></HideOnAdmin>
          <main id="main">{children}</main>
          <HideOnAdmin><SiteFooter /><FloatingEmail /></HideOnAdmin>
        </LeadDialogProvider>
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
