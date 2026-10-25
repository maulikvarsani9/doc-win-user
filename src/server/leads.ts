import { createHash } from "crypto";
import type { NextRequest } from "next/server";
import { Lead, RateHit, Resource } from "./models";
import { clientIp, fail, now, parse } from "./http";
import { LeadSchemas } from "./schemas";

export const RATE_LIMIT = 8;
export const RATE_WINDOW = 600;
export type LeadKind = keyof typeof LeadSchemas;

async function checkRate(req: NextRequest, kind: string) {
  const key = createHash("sha256").update(`${kind}:${clientIp(req)}`).digest("hex");
  const at = new Date();
  const recent = await RateHit.countDocuments({ key, at: { $gt: new Date(at.getTime() - RATE_WINDOW * 1000) } });
  if (recent >= RATE_LIMIT) fail(429, "Too many submissions. Please try again in a few minutes.");
  await RateHit.collection.insertOne({ key, at });
}

export async function submitLead(kind: LeadKind, req: NextRequest, body: unknown) {
  const { company_fax, ...data } = parse(LeadSchemas[kind], body) as Record<string, unknown>;
  let fileUrl: string | undefined;
  if (kind === "resource") {
    const found = await Resource.findOne({ slug: data.resource_slug, status: "published", delivery: "gated" }).select("file_url").lean<{ file_url?: string }>();
    if (!found) fail(404, "This resource is no longer available.");
    fileUrl = found!.file_url ?? "";
  }
  const extra = fileUrl === undefined ? {} : { file_url: fileUrl };
  if (company_fax) return { ok: true, ...extra };
  await checkRate(req, kind);
  const stamp = now();
  const lead = { type: kind, ...data, marketing_consent: Boolean(data.marketing_consent), ...(data.marketing_consent ? { consent_at: stamp } : {}), created_at: stamp };
  const { insertedId } = await Lead.collection.insertOne(lead);
  console.info(`lead stored type=${kind} id=${insertedId}`);
  return { ok: true, id: String(insertedId), ...extra };
}
