import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container, btn } from "@/components/ui-kit";
import { CtaLink } from "@/components/leads/CtaLink";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { HeaderShell } from "./HeaderShell";

export function SiteHeader() {
  return (
    <HeaderShell>
      <Container className="flex h-[76px] items-center gap-4 lg:gap-6 xl:gap-10">
        <Link href="/" className="-ml-1 shrink-0 rounded-lg p-1" aria-label="DocWin Digital home" data-testid="nav-logo">
          <Image src="/brand/docwin-logo.png" alt="DocWin Digital" width={943} height={265} priority unoptimized className="h-[38px] w-auto sm:h-[42px]" />
        </Link>
        <DesktopNav />
        <div className="ml-auto flex items-center gap-2">
          <CtaLink kind="audit" className={btn("ghost", "sm", "hidden md:inline-flex lg:hidden 2xl:inline-flex")} testId="header-cta-audit">Free Marketing Audit</CtaLink>
          <CtaLink kind="contact" className={btn("dark", "sm", "hidden pl-5 sm:inline-flex")} testId="header-cta-strategy">
            Book a Strategy Call <ArrowRight aria-hidden />
          </CtaLink>
          <MobileNav />
        </div>
      </Container>
    </HeaderShell>
  );
}
