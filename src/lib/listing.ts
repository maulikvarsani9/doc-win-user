import type { Term } from "@/lib/cms";

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;
export type ListState = { topic?: string; speciality?: string; type?: string; q?: string; page: number };

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.trim() || undefined;

export async function readState(searchParams: SearchParams): Promise<ListState> {
  const sp = await searchParams;
  const page = Math.max(1, Math.min(1000, parseInt(one(sp.page) ?? "1", 10) || 1));
  return { topic: one(sp.topic), speciality: one(sp.speciality), type: one(sp.type), q: one(sp.q)?.slice(0, 100), page };
}

const query = (params: Record<string, string | number | undefined>) => {
  const s = new URLSearchParams(Object.entries(params).filter(([, v]) => v !== undefined && v !== "" && v !== 1).map(([k, v]) => [k, String(v)])).toString();
  return s ? `?${s}` : "";
};

const indexable = (terms: Term[], slug?: string) => !!slug && !!terms.find((t) => t.slug === slug && t.indexable);

export function blogHref(s: Partial<ListState>, terms: { topics: Term[]; specialities: Term[] }) {
  const page = s.page && s.page > 1 ? s.page : undefined;
  if (!s.q && s.topic && !s.speciality && indexable(terms.topics, s.topic)) return `/blogs/topic/${s.topic}/${query({ page })}`;
  if (!s.q && s.speciality && !s.topic && indexable(terms.specialities, s.speciality)) return `/blogs/speciality/${s.speciality}/${query({ page })}`;
  return `/blogs/${query({ topic: s.topic, speciality: s.speciality, q: s.q, page })}`;
}

export function resourcesHref(s: Partial<ListState>) {
  return `/resources/${query({ type: s.type, topic: s.topic, speciality: s.speciality, q: s.q, page: s.page && s.page > 1 ? s.page : undefined })}`;
}
