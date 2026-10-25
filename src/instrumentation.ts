export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs" || process.env.NEXT_PHASE === "phase-production-build") return;
  const { bootstrap } = await import("@/server/seed");
  await bootstrap().catch((e) => console.error("Startup seed failed:", e));
}
