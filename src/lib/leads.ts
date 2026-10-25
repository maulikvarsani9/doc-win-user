export type LeadType = "contact" | "audit" | "ebook" | "resource";

const API = "";

export async function submitLead(type: LeadType, payload: Record<string, unknown>) {
  const res = await fetch(`${API}/api/leads/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let message = "Something went wrong. Please try again.";
    try {
      const data = await res.json();
      if (typeof data.detail === "string") message = data.detail;
    } catch {}
    throw new Error(message);
  }
  return res.json() as Promise<{ ok: boolean; id?: string; file_url?: string }>;
}
