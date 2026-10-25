"use client";

import { useEditorState, type Editor } from "@tiptap/react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { Bold, ChevronDown, Italic, List, ListOrdered, Megaphone, MessageSquareQuote, Minus, Redo2, Table as TableIcon, Underline, Undo2 } from "lucide-react";
import { CALLOUTS } from "./extensions";
import { ToolButton } from "./ToolButton";
import { ImageButton, LinkButton } from "./Popovers";

const sep = <span aria-hidden className="mx-1 h-5 w-px bg-ink-900/10" />;
const menu = "z-[85] min-w-[200px] rounded-xl bg-white p-1.5 shadow-2xl ring-1 ring-ink-900/10";
const item = "flex cursor-pointer items-center rounded-lg px-3 py-2 text-[13.5px] text-ink-800 outline-none data-[highlighted]:bg-ink-900/[0.06]";

function Menu({ label, icon, testId, items }: { label: string; icon: React.ReactNode; testId: string; items: { label: string; onSelect: () => void; testId: string }[] }) {
  return (
    <Dropdown.Root modal={false}>
      <Dropdown.Trigger asChild>
        <ToolButton label={label} testId={testId} className="flex gap-1 px-2">{icon}<span className="hidden sm:inline">{label}</span><ChevronDown className="!size-3" /></ToolButton>
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content sideOffset={6} align="start" className={menu} onCloseAutoFocus={(e) => e.preventDefault()}>
          {items.map((i) => <Dropdown.Item key={i.testId} className={item} onSelect={i.onSelect} data-testid={i.testId}>{i.label}</Dropdown.Item>)}
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}

export function Toolbar({ editor }: { editor: Editor }) {
  const s = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      h2: e.isActive("heading", { level: 2 }), h3: e.isActive("heading", { level: 3 }), bold: e.isActive("bold"), italic: e.isActive("italic"),
      underline: e.isActive("underline"), link: e.isActive("link"), ul: e.isActive("bulletList"), ol: e.isActive("orderedList"),
      quote: e.isActive("blockquote"), callout: e.isActive("callout"), table: e.isActive("table"), undo: e.can().undo(), redo: e.can().redo(),
    }),
  });
  const c = () => editor.chain().focus();
  const callout = (variant: string) => (s.callout ? c().updateAttributes("callout", { variant }).run() : c().wrapIn("callout", { variant }).run());
  const tableItems = s.table
    ? [["Add row below", () => c().addRowAfter().run(), "row"], ["Add column right", () => c().addColumnAfter().run(), "col"], ["Delete row", () => c().deleteRow().run(), "del-row"],
      ["Delete column", () => c().deleteColumn().run(), "del-col"], ["Delete table", () => c().deleteTable().run(), "del"]] as const
    : [["Insert 3 × 3 table", () => c().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(), "insert"]] as const;
  return (
    <div className="z-20 flex flex-wrap items-center gap-0.5 rounded-t-xl border-b border-ink-900/[0.08] bg-white/95 px-2 py-1.5 backdrop-blur lg:sticky lg:top-16" data-testid="editor-toolbar">
      <ToolButton label="Heading 2" active={s.h2} onClick={() => c().toggleHeading({ level: 2 }).run()} testId="editor-h2">H2</ToolButton>
      <ToolButton label="Heading 3" active={s.h3} onClick={() => c().toggleHeading({ level: 3 }).run()} testId="editor-h3">H3</ToolButton>
      {sep}
      <ToolButton label="Bold" active={s.bold} onClick={() => c().toggleBold().run()} testId="editor-bold"><Bold /></ToolButton>
      <ToolButton label="Italic" active={s.italic} onClick={() => c().toggleItalic().run()} testId="editor-italic"><Italic /></ToolButton>
      <ToolButton label="Underline" active={s.underline} onClick={() => c().toggleUnderline().run()} testId="editor-underline"><Underline /></ToolButton>
      <LinkButton editor={editor} active={s.link} />
      {sep}
      <ToolButton label="Bullet list" active={s.ul} onClick={() => c().toggleBulletList().run()} testId="editor-bullet-list"><List /></ToolButton>
      <ToolButton label="Numbered list" active={s.ol} onClick={() => c().toggleOrderedList().run()} testId="editor-ordered-list"><ListOrdered /></ToolButton>
      <ToolButton label="Quote" active={s.quote} onClick={() => c().toggleBlockquote().run()} testId="editor-quote"><MessageSquareQuote /></ToolButton>
      <ToolButton label="Divider" onClick={() => c().setHorizontalRule().run()} testId="editor-divider"><Minus /></ToolButton>
      {sep}
      <ImageButton editor={editor} />
      <Menu label="Table" icon={<TableIcon />} testId="editor-table" items={tableItems.map(([label, onSelect, id]) => ({ label, onSelect, testId: `editor-table-${id}` }))} />
      <Menu label="Callout" icon={<span className="size-3 rounded-sm bg-signal-500" />} testId="editor-callout"
        items={[...CALLOUTS.map((o) => ({ label: o.label, onSelect: () => callout(o.value), testId: `editor-callout-${o.value}` })),
          ...(s.callout ? [{ label: "Remove callout box", onSelect: () => c().lift("callout").run(), testId: "editor-callout-remove" }] : [])]} />
      <Menu label="CTA" icon={<Megaphone />} testId="editor-cta" items={[
        { label: "Free audit CTA here", onSelect: () => c().insertContent({ type: "ctaMarker", attrs: { kind: "audit" } }).run(), testId: "editor-cta-audit" },
        { label: "Doctor panel CTA here", onSelect: () => c().insertContent({ type: "ctaMarker", attrs: { kind: "doctor" } }).run(), testId: "editor-cta-doctor" },
      ]} />
      {sep}
      <span className="flex">
        <ToolButton label="Undo" disabled={!s.undo} onClick={() => c().undo().run()} testId="editor-undo"><Undo2 /></ToolButton>
        <ToolButton label="Redo" disabled={!s.redo} onClick={() => c().redo().run()} testId="editor-redo"><Redo2 /></ToolButton>
      </span>
    </div>
  );
}
