"use client";

import { useRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import type { Editor } from "@tiptap/react";
import { ImagePlus, Link2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { upload } from "@/lib/admin-api";
import { Field, Input, btnCls } from "../ui";
import { ToolButton } from "./ToolButton";

const panel = "z-[85] w-80 space-y-3 rounded-xl bg-white p-4 shadow-2xl ring-1 ring-ink-900/10";

export function LinkButton({ editor, active }: { editor: Editor; active: boolean }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const onOpen = (o: boolean) => {
    setOpen(o);
    if (o) setUrl(editor.getAttributes("link").href ?? "");
  };
  const apply = () => {
    const href = url.trim();
    const chain = editor.chain().focus().extendMarkRange("link");
    if (!href) chain.unsetLink().run();
    else chain.setLink({ href: /^(https?:|mailto:|tel:|\/|#)/.test(href) ? href : `https://${href}` }).run();
    setOpen(false);
  };
  return (
    <Popover.Root open={open} onOpenChange={onOpen}>
      <Popover.Trigger asChild><ToolButton label="Link" active={active} testId="editor-link"><Link2 /></ToolButton></Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={6} align="start" className={panel} data-testid="editor-link-popover">
          <Field label="Link address" hint="Use /services/... for pages on this site.">
            <Input autoFocus value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), apply())} placeholder="https://" data-testid="editor-link-input" />
          </Field>
          <div className="flex justify-end gap-2">
            {active && <button type="button" className={btnCls("ghost", "sm")} onClick={() => { editor.chain().focus().unsetLink().run(); setOpen(false); }} data-testid="editor-link-remove">Remove</button>}
            <button type="button" className={btnCls("primary", "sm")} onClick={apply} data-testid="editor-link-apply">Apply</button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function ImageButton({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const [alt, setAlt] = useState("");
  const [busy, setBusy] = useState(false);
  const file = useRef<HTMLInputElement>(null);
  const insert = async () => {
    const f = file.current?.files?.[0];
    if (!f) return toast.error("Choose an image first.");
    setBusy(true);
    try {
      const up = await upload(f);
      editor.chain().focus().setImage({ src: up.url, alt: alt.trim() || f.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ") }).run();
      setOpen(false);
      setAlt("");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild><ToolButton label="Image" testId="editor-image"><ImagePlus /></ToolButton></Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={6} align="start" className={panel} data-testid="editor-image-popover">
          <Field label="Image file" hint="JPG, PNG, WebP or GIF up to 25 MB.">
            <input ref={file} type="file" accept="image/*" className="block w-full text-[13px] file:mr-3 file:rounded-md file:border-0 file:bg-ink-100 file:px-3 file:py-1.5 file:text-[13px] file:font-semibold" data-testid="editor-image-file" />
          </Field>
          <Field label="Alt text" hint="Describe the image for screen readers and search engines.">
            <Input value={alt} onChange={(e) => setAlt(e.target.value)} data-testid="editor-image-alt" />
          </Field>
          <div className="flex justify-end"><button type="button" disabled={busy} className={btnCls("primary", "sm")} onClick={insert} data-testid="editor-image-insert">{busy && <Loader2 className="animate-spin" />}Insert image</button></div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
