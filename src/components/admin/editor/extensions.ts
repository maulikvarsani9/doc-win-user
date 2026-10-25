import { Node, mergeAttributes } from "@tiptap/core";

export const CALLOUTS = [
  { value: "tip", label: "Tip" },
  { value: "note", label: "Note" },
  { value: "takeaway", label: "Key takeaway" },
  { value: "caution", label: "Caution" },
] as const;

export const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "(paragraph | bulletList | orderedList)+",
  defining: true,
  addAttributes() {
    return {
      variant: {
        default: "note",
        parseHTML: (el) => el.getAttribute("data-callout") || "note",
        renderHTML: (attrs) => ({ "data-callout": attrs.variant }),
      },
    };
  },
  parseHTML() {
    return [{ tag: "div[data-callout]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes), 0];
  },
});

export const CtaMarker = Node.create({
  name: "ctaMarker",
  group: "block",
  atom: true,
  selectable: true,
  draggable: true,
  addAttributes() {
    return {
      kind: {
        default: "audit",
        parseHTML: (el) => el.getAttribute("data-cta") || "audit",
        renderHTML: (attrs) => ({ "data-cta": attrs.kind }),
      },
    };
  },
  parseHTML() {
    return [{ tag: "div[data-cta]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes)];
  },
});

export const cleanPastedHtml = (html: string) =>
  html
    .replace(/<h1(\s|>)/gi, "<h2$1").replace(/<\/h1>/gi, "</h2>")
    .replace(/<h[56](\s|>)/gi, "<h4$1").replace(/<\/h[56]>/gi, "</h4>")
    .replace(/\sstyle="[^"]*"/gi, "")
    .replace(/<span[^>]*>(&nbsp;|\s)*<\/span>/gi, " ");
