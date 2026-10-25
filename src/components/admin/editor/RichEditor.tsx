"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import { CharacterCount, Placeholder } from "@tiptap/extensions";
import { useEditorState } from "@tiptap/react";
import { Callout, CtaMarker, cleanPastedHtml } from "./extensions";
import { Toolbar } from "./Toolbar";

type Props = { value: string; onChange: (html: string) => void; testId: string; placeholder?: string; minHeight?: number };

export function RichEditor({ value, onChange, testId, placeholder = "Start writing, or paste your article from Google Docs or Word…", minHeight = 480 }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] }, codeBlock: false, link: { openOnClick: false, autolink: true, HTMLAttributes: { rel: null, target: null } } }),
      Image.configure({ HTMLAttributes: { loading: null } }),
      TableKit.configure({ table: { resizable: false } }),
      Placeholder.configure({ placeholder }),
      CharacterCount,
      Callout,
      CtaMarker,
    ],
    content: value,
    editorProps: {
      attributes: { class: "article-prose editor-prose px-5 py-6 sm:px-8 sm:py-8", style: `min-height:${minHeight}px`, "data-testid": testId },
      transformPastedHTML: cleanPastedHtml,
    },
    onUpdate: ({ editor: e }) => onChange(e.isEmpty ? "" : e.getHTML()),
  });
  const words = useEditorState({ editor, selector: ({ editor: e }) => (e ? e.storage.characterCount.words() : 0) }) ?? 0;
  if (!editor) return <div className="rounded-xl bg-white ring-1 ring-ink-900/[0.08]" style={{ minHeight: minHeight + 50 }} />;
  return (
    <div className="rounded-xl bg-white ring-1 ring-ink-900/[0.08]" data-testid={`${testId}-wrap`}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ink-900/[0.06] px-5 py-2.5 text-[12.5px] text-ink-500 sm:px-8">
        <span>Tip: paste straight from Google Docs or Word. Headings, lists, links, bold text and tables carry over.</span>
        <span className="tabular-nums" data-testid={`${testId}-word-count`}>{words} words · ~{Math.max(1, Math.ceil(words / 225))} min read</span>
      </div>
    </div>
  );
}
