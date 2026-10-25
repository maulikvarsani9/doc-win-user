const API = "";

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

let refreshing: Promise<boolean> | null = null;
const refresh = () => {
  refreshing ??= fetch(`${API}/api/auth/refresh`, { method: "POST", credentials: "include" })
    .then((r) => r.ok)
    .catch(() => false)
    .finally(() => setTimeout(() => (refreshing = null), 0));
  return refreshing;
};

export async function api<T>(path: string, init: RequestInit = {}, retry = true): Promise<T> {
  const form = init.body instanceof FormData;
  const res = await fetch(`${API}/api${path}`, { ...init, credentials: "include", headers: form ? init.headers : { "Content-Type": "application/json", ...init.headers } });
  if (res.status === 401 && retry && !/^\/auth\/(login|refresh)/.test(path) && (await refresh())) return api<T>(path, init, false);
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (typeof data.detail === "string") message = data.detail;
    } catch {}
    throw new ApiError(message, res.status);
  }
  return res.json();
}

export const fetcher = <T,>(path: string) => api<T>(path);
export const send = <T,>(path: string, method: "POST" | "PUT" | "DELETE", body?: unknown) =>
  api<T>(path, { method, body: body === undefined ? undefined : JSON.stringify(body) });

export interface Upload { id: string; url: string; name: string; content_type: string; size: number; kind: "image" | "file"; created_at: string }

export function upload(file: File) {
  const fd = new FormData();
  fd.append("file", file);
  return api<Upload>("/admin/uploads", { method: "POST", body: fd });
}

export const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80).replace(/-+$/, "");

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const fmtDate = (iso?: string | null) =>
  iso ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(iso)) : "—";
