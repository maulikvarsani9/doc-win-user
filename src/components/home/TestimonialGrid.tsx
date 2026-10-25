"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { btn } from "@/components/ui-kit";

export function TestimonialGrid({ children, total }: { children: React.ReactNode; total: number }) {
  const [all, setAll] = useState(false);
  return (
    <>
      <div data-expanded={all} className="group/grid mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4" data-testid="testimonial-grid">
        {children}
      </div>
      {!all && (
        <button type="button" onClick={() => setAll(true)} className={btn("outline", "md", "mt-5 w-full sm:hidden")} data-testid="testimonials-show-all">
          Show all {total} reviews <ChevronDown aria-hidden />
        </button>
      )}
    </>
  );
}
