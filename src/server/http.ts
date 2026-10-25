import { Types } from "mongoose";
import type { z } from "zod";

export class HttpError extends Error {
  constructor(public status: number, public detail: string) {
    super(detail);
  }
}

export const fail = (status: number, detail: string): never => {
  throw new HttpError(status, detail);
};

export const now = () => new Date().toISOString().replace("Z", "+00:00");

export const isOid = (v: unknown): v is string => typeof v === "string" && /^[0-9a-f]{24}$/i.test(v);
export const oid = (v: string) => (isOid(v) ? new Types.ObjectId(v) : fail(404, "Not found"));
export const oids = (list: string[]) => list.filter(isOid).map((i) => new Types.ObjectId(i));

const invalid = (fields: string[]) =>
  new HttpError(422, `Please check these fields: ${[...new Set(fields.map((f) => f.replace(/_/g, " ")))].sort().join(", ")}.`);

export function parse<S extends z.ZodTypeAny>(schema: S, data: unknown): z.output<S> {
  const r = schema.safeParse(data);
  if (r.success) return r.data;
  throw invalid(r.error.issues.map((i: z.ZodIssue) => String(i.path.at(-1) ?? "body")));
}

export function intParam(q: URLSearchParams, name: string, def: number, min: number, max: number) {
  const raw = q.get(name);
  if (raw === null) return def;
  const n = Number(raw);
  if (!Number.isInteger(n) || n < min || n > max) throw invalid([name]);
  return n;
}

export function boolParam(q: URLSearchParams, name: string): boolean | undefined {
  const raw = q.get(name)?.toLowerCase();
  if (raw === undefined) return undefined;
  if (["true", "1", "yes", "on"].includes(raw)) return true;
  if (["false", "0", "no", "off"].includes(raw)) return false;
  throw invalid([name]);
}

export function enumParam<T extends string>(q: URLSearchParams, name: string, allowed: readonly T[], def?: T): T {
  const raw = q.get(name) ?? def;
  if (raw === undefined || !allowed.includes(raw as T)) throw invalid([name]);
  return raw as T;
}

export function clientIp(req: Request): string {
  // Each trusted proxy appends one hop on the right; the visitor is the hop just before them.
  const hops = (req.headers.get("x-forwarded-for") ?? "").split(",").map((h) => h.trim()).filter(Boolean);
  const trusted = Number(process.env.TRUSTED_PROXY_HOPS);
  if (hops.length > trusted) return hops[hops.length - trusted - 1];
  return hops[0] ?? req.headers.get("x-real-ip") ?? "";
}

export const pick = <T extends Record<string, unknown>>(obj: T, keys: readonly string[]) =>
  Object.fromEntries(keys.filter((k) => k in obj).map((k) => [k, obj[k]]));

export const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
