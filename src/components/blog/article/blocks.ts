import type { Ctas, Post } from "@/lib/cms";

export type Block = { kind: "html"; html: string } | { kind: "audit" | "doctor" };
type Kind = "audit" | "doctor";

const MARKER = /<div data-cta="(audit|doctor)"><\/div>/;

function place(html: string, kind: Kind, afterH2: number) {
  let i = 0;
  let placed = false;
  const out = html.replace(/<h2[\s>]/g, (m) => {
    i += 1;
    if (placed || i !== afterH2 + 1) return m;
    placed = true;
    return `<div data-cta="${kind}"></div>${m}`;
  });
  return placed ? out : `${out}<div data-cta="${kind}"></div>`;
}

export function buildBlocks(post: Post, ctas: Ctas) {
  const on = { audit: ctas.audit.inline_enabled && post.show_audit_inline, doctor: ctas.doctor.enabled && post.show_doctor_panel };
  const manual = (k: Kind) => post.content_html.includes(`data-cta="${k}"`);
  let html = post.content_html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, "</table></div>");
  if (on.audit && !manual("audit")) html = place(html, "audit", ctas.audit.inline_after_h2);
  const doctorAtEnd = on.doctor && !manual("doctor") && ctas.doctor.position === "end";
  if (on.doctor && !manual("doctor") && ctas.doctor.position === "after_h2") html = place(html, "doctor", ctas.doctor.after_h2);

  const parts = html.split(MARKER);
  const used = new Set<Kind>();
  const blocks: Block[] = [];
  parts.forEach((part, i) => {
    if (i % 2 === 0) {
      if (part.trim()) blocks.push({ kind: "html", html: part });
      return;
    }
    const k = part as Kind;
    if (on[k] && !used.has(k)) {
      used.add(k);
      blocks.push({ kind: k });
    }
  });
  return { blocks, doctorAtEnd };
}
