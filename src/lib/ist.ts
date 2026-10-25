const OFFSET = 330 * 60000;

export const isFuture = (iso?: string | null) => !!iso && Date.parse(iso) > Date.now();

export function toIst(iso?: string | null): [string, string] {
  if (!iso) return ["", ""];
  const s = new Date(Date.parse(iso) + OFFSET).toISOString();
  return [s.slice(0, 10), s.slice(11, 16)];
}

export const fromIst = (date: string, time: string) => (date ? new Date(`${date}T${time || "09:00"}:00+05:30`).toISOString() : null);

export const fmtIst = (iso: string) =>
  `${new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(iso))} IST`;
