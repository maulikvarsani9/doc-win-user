import sanitizeHtml from "sanitize-html";

const TAGS = ["p", "br", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s", "del", "a", "ul", "ol", "li", "blockquote", "img",
  "figure", "figcaption", "table", "thead", "tbody", "tfoot", "tr", "th", "td", "hr", "code", "pre", "div", "span", "sup", "sub", "mark"];
const ATTRS = { a: ["href", "title", "target", "rel"], img: ["src", "alt", "title", "width", "height"], div: ["data-callout", "data-cta"],
  th: ["colspan", "rowspan"], td: ["colspan", "rowspan"], ol: ["start"] };
const CALLOUTS = new Set(["tip", "note", "takeaway", "caution"]);
const CTA_MARKERS = new Set(["audit", "doctor"]);
const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", mdash: "—", ndash: "–", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“" };

export const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);

const unescape = (s: string) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) =>
    e[0] === "#" ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : ENTITIES[e.toLowerCase()] ?? m);

export const plainText = (html: string) => unescape((html || "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

export function firstParagraph(html: string, limit = 280) {
  for (const [, inner] of (html || "").matchAll(/<p>([\s\S]*?)<\/p>/g)) {
    const text = plainText(inner);
    if (text) return text.length <= limit ? text : text.slice(0, limit).replace(/ [^ ]*$/, "").replace(/[,.;:]+$/, "") + "…";
  }
  return "";
}

export function sanitize(raw: string) {
  const clean = sanitizeHtml(raw || "", { allowedTags: TAGS, allowedAttributes: ATTRS, allowedSchemes: ["http", "https", "mailto", "tel"] })
    .replace(/data-callout="([^"]*)"/g, (_m, v: string) => `data-callout="${CALLOUTS.has(v) ? v : "note"}"`);
  return clean.replace(/<div data-cta="([^"]*)"><\/div>/g, (m, v: string) => (CTA_MARKERS.has(v) ? m : ""));
}

// Sanitize HTML, add heading ids, build the table of contents and estimate reading time.
export function processArticle(raw: string) {
  const seen: Record<string, number> = {};
  const toc: { id: string; text: string; level: number }[] = [];
  const html = sanitize(raw)
    .replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (m, level: string, inner: string) => {
      const text = plainText(inner);
      if (!text) return m;
      const base = slugify(text) || "section";
      seen[base] = (seen[base] ?? 0) + 1;
      const id = seen[base] === 1 ? base : `${base}-${seen[base]}`;
      toc.push({ id, text, level: Number(level) });
      return `<h${level} id="${id}">${inner}</h${level}>`;
    })
    .replaceAll("<img ", '<img loading="lazy" ');
  const words = plainText(html).split(" ").filter(Boolean).length;
  return { html, toc, readingTime: Math.max(1, Math.ceil(words / 225)) };
}
