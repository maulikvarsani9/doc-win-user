"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string; active?: boolean; testId: string };

export const ToolButton = forwardRef<HTMLButtonElement, Props>(function ToolButton({ label, active, testId, className, children, ...rest }, ref) {
  return (
    <button ref={ref} type="button" title={label} aria-label={label} aria-pressed={active} data-testid={testId} {...rest}
      className={cn("grid h-8 min-w-8 place-items-center rounded-md px-1.5 text-[13px] font-semibold text-ink-700 transition-colors duration-150 hover:bg-ink-900/[0.06] disabled:opacity-40 [&_svg]:size-4", active && "bg-ink-900 text-white hover:bg-ink-800", className)}>
      {children}
    </button>
  );
});
