import { dispatch } from "@/server/router";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export { dispatch as GET, dispatch as POST, dispatch as PUT, dispatch as DELETE, dispatch as PATCH };
