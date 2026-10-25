import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { FileRec } from "./models";
import { fail, now } from "./http";

const MAX_BYTES = 25 * 1024 * 1024;
const ROOT = path.join(process.cwd(), "storage", "uploads");
const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif", "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
  "text/csv": "csv",
};

export async function initStorage() {
  await mkdir(ROOT, { recursive: true });
}

type FileDoc = { _id: unknown; storage_path: string; original_filename: string; content_type: string; size: number; kind: string; created_at: string };
const publicFile = (r: FileDoc) => ({
  id: String(r._id), url: `/api/files/${r.storage_path}`, name: r.original_filename, content_type: r.content_type, size: r.size, kind: r.kind, created_at: r.created_at,
});

function resolveStored(rel: string) {
  const abs = path.resolve(ROOT, rel);
  if (!abs.startsWith(ROOT + path.sep) && abs !== ROOT) fail(400, "Invalid file path");
  return abs;
}

export async function upload(req: Request) {
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) fail(422, "Please check these fields: file.");
  const f = file as File;
  const contentType = (f.type || "").split(";")[0];
  const ext = ALLOWED[contentType];
  if (!ext) fail(415, "Unsupported file type. Use JPG, PNG, WebP, GIF, PDF, DOCX, XLSX, PPTX or CSV.");
  const data = Buffer.from(await f.arrayBuffer());
  if (data.length > MAX_BYTES) fail(413, "File is larger than 25 MB.");
  const kind = contentType.startsWith("image/") ? "image" : "file";
  const rel = `${kind}s/${randomUUID()}.${ext}`;
  try {
    await mkdir(path.dirname(resolveStored(rel)), { recursive: true });
    await writeFile(resolveStored(rel), data);
  } catch (e) {
    console.error("upload failed", e);
    return fail(502, "Upload failed. Please try again.");
  }
  const rec = { storage_path: rel, original_filename: f.name || `upload.${ext}`, content_type: contentType, size: data.length, kind, is_deleted: false, created_at: now() };
  const { insertedId } = await FileRec.collection.insertOne({ ...rec });
  return publicFile({ ...rec, _id: insertedId });
}

export async function listUploads(kind: string) {
  const docs = await FileRec.find({ kind, is_deleted: false }).sort({ created_at: -1 }).limit(200).lean<FileDoc[]>();
  return docs.map(publicFile);
}

export async function serveFile(rel: string) {
  const rec = await FileRec.findOne({ storage_path: rel, is_deleted: false }).lean<FileDoc>();
  if (!rec) fail(404, "File not found");
  let data: Buffer;
  try {
    data = await readFile(resolveStored(rel));
  } catch {
    return fail(502, "File temporarily unavailable");
  }
  const disposition = rec!.kind === "file" && rec!.content_type !== "application/pdf" ? "attachment" : "inline";
  const safe = [...rec!.original_filename].filter((c) => /[A-Za-z0-9._\- ]/.test(c)).join("") || "download";
  return new Response(new Uint8Array(data), {
    headers: { "Content-Type": rec!.content_type, "Cache-Control": "public, max-age=31536000, immutable", "Content-Disposition": `${disposition}; filename="${safe}"` },
  });
}
