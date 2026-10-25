"use client";

import Link from "next/link";
import { useLeadDialog, type DialogKind } from "./LeadDialogProvider";

const hrefs: Record<DialogKind, string> = {
  contact: "/contact/",
  audit: "/free-marketing-audit/",
  sample: "/free-marketing-audit/#sample-audit",
};

export function CtaLink({ kind, className, children, testId }: { kind: DialogKind; className?: string; children: React.ReactNode; testId?: string }) {
  const { open } = useLeadDialog();
  return (
    <Link
      href={hrefs[kind]}
      className={className}
      data-testid={testId}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        open(kind);
      }}
    >
      {children}
    </Link>
  );
}
