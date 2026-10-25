import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import { site } from "@/content/site";

const icons = { LinkedIn: Linkedin, Instagram, Facebook } as const;

export function SocialLinks() {
  return (
    <div className="mt-6 space-y-4" data-testid="footer-contact">
      <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-[14.5px] font-medium text-white underline-offset-4 hover:underline" data-testid="footer-email-link">
        <Mail aria-hidden className="size-4 text-signal-400" />{site.email}
      </a>
      <ul className="flex gap-2.5" aria-label="DocWin Digital on social media">
        {site.social.map((s) => {
          const Icon = icons[s.label as keyof typeof icons];
          return (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`DocWin Digital on ${s.label}`}
                className="grid size-10 place-items-center rounded-full bg-white/[0.06] text-ink-200 ring-1 ring-white/10 transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-ink-900"
                data-testid={`footer-social-${s.label.toLowerCase()}`}>
                <Icon aria-hidden className="size-[18px]" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
