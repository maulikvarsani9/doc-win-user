"use client";

import { useRef, useState } from "react";
import { FileUp, ImagePlus, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { upload, type Upload } from "@/lib/admin-api";
import { btnCls } from "./ui";

function useUpload(onDone: (u: Upload) => void) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const pick = () => ref.current?.click();
  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setBusy(true);
    try {
      onDone(await upload(f));
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return { ref, busy, pick, onFile };
}

export function ImageField({ value, onChange, testId, aspect = "aspect-[16/9]", round }: { value: string; onChange: (url: string) => void; testId: string; aspect?: string; round?: boolean }) {
  const u = useUpload((up) => onChange(up.url));
  return (
    <div data-testid={testId}>
      <input ref={u.ref} type="file" accept="image/*" hidden onChange={u.onFile} data-testid={`${testId}-file`} />
      {value ? (
        <div className="space-y-2">
          <img src={value} alt="" className={round ? "size-24 rounded-full object-cover ring-1 ring-ink-900/10" : `${aspect} w-full rounded-lg object-cover ring-1 ring-ink-900/10`} data-testid={`${testId}-preview`} />
          <div className="flex gap-2">
            <button type="button" onClick={u.pick} disabled={u.busy} className={btnCls("secondary", "sm")} data-testid={`${testId}-replace`}>{u.busy ? <Loader2 className="animate-spin" /> : <ImagePlus />}Replace</button>
            <button type="button" onClick={() => onChange("")} className={btnCls("ghost", "sm")} data-testid={`${testId}-remove`}><Trash2 />Remove</button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={u.pick} disabled={u.busy} className={`grid w-full place-items-center rounded-lg border-2 border-dashed border-ink-200 bg-ink-50/60 text-[13px] font-semibold text-ink-600 transition-colors hover:border-brand-600 hover:text-brand-700 ${round ? "h-24" : aspect}`} data-testid={`${testId}-upload`}>
          <span className="flex items-center gap-2">{u.busy ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}{u.busy ? "Uploading…" : "Upload image"}</span>
        </button>
      )}
    </div>
  );
}

export function FileField({ url, name, onChange, testId }: { url: string; name: string; onChange: (url: string, name: string) => void; testId: string }) {
  const u = useUpload((up) => onChange(up.url, up.name));
  return (
    <div data-testid={testId}>
      <input ref={u.ref} type="file" accept=".pdf,.docx,.xlsx,.pptx,.csv,image/*" hidden onChange={u.onFile} data-testid={`${testId}-file`} />
      {url ? (
        <div className="flex items-center justify-between gap-3 rounded-lg bg-ink-50 px-3 py-2.5 ring-1 ring-ink-900/[0.08]">
          <a href={url} target="_blank" rel="noreferrer" className="min-w-0 truncate text-[13.5px] font-semibold text-brand-700 hover:underline" data-testid={`${testId}-name`}>{name || url.split("/").pop()}</a>
          <span className="flex shrink-0 gap-1">
            <button type="button" onClick={u.pick} disabled={u.busy} className={btnCls("secondary", "sm")} data-testid={`${testId}-replace`}>{u.busy && <Loader2 className="animate-spin" />}Replace</button>
            <button type="button" onClick={() => onChange("", "")} className={btnCls("ghost", "sm")} aria-label="Remove file" data-testid={`${testId}-remove`}><Trash2 /></button>
          </span>
        </div>
      ) : (
        <button type="button" onClick={u.pick} disabled={u.busy} className="flex h-16 w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-ink-200 bg-ink-50/60 text-[13px] font-semibold text-ink-600 hover:border-brand-600 hover:text-brand-700" data-testid={`${testId}-upload`}>
          {u.busy ? <Loader2 className="size-4 animate-spin" /> : <FileUp className="size-4" />}{u.busy ? "Uploading…" : "Upload PDF, DOCX, XLSX, PPTX or CSV"}
        </button>
      )}
    </div>
  );
}
