import { Linkedin } from "lucide-react";
import { Container } from "@/components/ui-kit";
import { Breadcrumbs } from "@/components/hubs/Breadcrumbs";
import { Avatar } from "@/components/blog/Avatar";
import { authorHref } from "@/components/blog/PostCard";
import type { Author } from "@/lib/cms";

export function AuthorHeader({ author: a, count }: { author: Author; count: number }) {
  return (
    <section className="border-b border-ink-900/[0.06] bg-paper" data-testid="author-profile-header">
      <Container className="pb-12 pt-6 sm:pb-16 sm:pt-10">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blogs/" }, { name: a.name, path: authorHref(a.slug) }]} />
        <div className="reveal mt-10 flex flex-col gap-7 sm:mt-12 md:flex-row md:items-center md:gap-10">
          <Avatar name={a.name} src={a.avatar || a.photo} size={144} className="ring-[6px] ring-white shadow-[0_24px_50px_-24px_rgba(11,25,44,0.5)]" testId="author-avatar-img" />
          <div className="max-w-3xl">
            {a.role && <span className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-[12.5px] font-semibold text-brand-700" data-testid="author-role-badge">{a.role}</span>}
            <h1 className="display-1 mt-4 lg:text-[3.4rem]" data-testid="author-name-h1">{a.name}</h1>
            {a.credential && <p className="mt-2 text-[15px] font-medium text-ink-600" data-testid="author-credential">{a.credential}</p>}
            {a.bio && <p className="mt-5 text-[16px] leading-[1.7] text-ink-600" data-testid="author-bio-p">{a.bio}</p>}
            {a.specialties.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2" data-testid="author-specialties-chips">
                {a.specialties.map((s) => <li key={s} className="rounded-full bg-white px-3 py-1.5 text-[13px] font-medium text-ink-700 ring-1 ring-ink-900/10">{s}</li>)}
              </ul>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-5 text-[14px]">
              <span className="font-semibold text-ink-900" data-testid="author-post-count">{count} published article{count === 1 ? "" : "s"}</span>
              {a.linkedin && (
                <a href={a.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-brand-700 hover:underline" data-testid="author-linkedin">
                  <Linkedin aria-hidden className="size-4" /> LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
