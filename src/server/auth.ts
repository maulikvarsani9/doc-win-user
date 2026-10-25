import bcrypt from "bcryptjs";
import { errors, jwtVerify, SignJWT } from "jose";
import { NextResponse, type NextRequest } from "next/server";
import { LoginAttempt, User } from "./models";
import { clientIp, fail, HttpError, isOid, now, parse } from "./http";
import { LoginIn } from "./schemas";

const ACCESS_TTL = 15 * 60;
const REFRESH_TTL = 7 * 24 * 3600;
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;
const COOKIE = { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" };
const secret = () => new TextEncoder().encode(process.env.JWT_SECRET!);

export const hashPassword = (p: string) => bcrypt.hash(p, 12);

const token = (sub: string, type: string, ttl: number) =>
  new SignJWT({ sub, type }).setProtectedHeader({ alg: "HS256" }).setExpirationTime(Math.floor(Date.now() / 1000) + ttl).sign(secret());

async function decode(tok: string, type: string) {
  try {
    const { payload } = await jwtVerify(tok, secret(), { algorithms: ["HS256"] });
    if (payload.type !== type || !isOid(payload.sub)) throw new HttpError(401, "Invalid session");
    return payload.sub;
  } catch (e) {
    if (e instanceof HttpError) throw e;
    throw new HttpError(401, e instanceof errors.JWTExpired ? "Session expired" : "Invalid session");
  }
}

type UserDoc = { _id: unknown; email: string; name?: string; role?: string; password_hash: string };
const publicUser = (u: UserDoc) => ({ id: String(u._id), email: u.email, name: u.name ?? "", role: u.role ?? "editor" });

async function session(user: UserDoc) {
  const res = NextResponse.json(publicUser(user));
  res.cookies.set("access_token", await token(String(user._id), "access", ACCESS_TTL), { ...COOKIE, maxAge: ACCESS_TTL });
  res.cookies.set("refresh_token", await token(String(user._id), "refresh", REFRESH_TTL), { ...COOKIE, maxAge: REFRESH_TTL });
  return res;
}

export async function currentUser(req: NextRequest) {
  const header = req.headers.get("authorization") ?? "";
  const tok = req.cookies.get("access_token")?.value || (header.startsWith("Bearer ") ? header.slice(7) : "");
  if (!tok) fail(401, "Not authenticated");
  const user = await User.findById(await decode(tok, "access")).lean<UserDoc>();
  if (!user || !["admin", "editor"].includes(user.role ?? "")) fail(401, "Not authenticated");
  return publicUser(user!);
}

export async function login(req: NextRequest, body: unknown) {
  const input = parse(LoginIn, body);
  const email = input.email.toLowerCase();
  const identifier = `${clientIp(req)}:${email}`;
  const at = new Date();
  const attempt = await LoginAttempt.findOne({ identifier }).lean<{ count?: number; locked_until?: Date | null }>();
  if (attempt?.locked_until && attempt.locked_until > at) fail(429, "Too many failed attempts. Try again in 15 minutes.");
  const user = await User.findOne({ email }).lean<UserDoc>();
  if (!user || !(await bcrypt.compare(input.password, user.password_hash))) {
    const count = (attempt?.count ?? 0) + 1;
    const update = count >= MAX_ATTEMPTS ? { count: 0, locked_until: new Date(at.getTime() + LOCKOUT_MS) } : { count, locked_until: null };
    await LoginAttempt.updateOne({ identifier }, { $set: { ...update, at } }, { upsert: true });
    fail(401, "Incorrect email or password");
  }
  await LoginAttempt.deleteMany({ identifier });
  return session(user!);
}

export async function refresh(req: NextRequest) {
  const tok = req.cookies.get("refresh_token")?.value;
  if (!tok) fail(401, "Not authenticated");
  const user = await User.findById(await decode(tok!, "refresh")).lean<UserDoc>();
  if (!user) fail(401, "Not authenticated");
  return session(user!);
}

export function logout() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete({ name: "access_token", path: "/" });
  res.cookies.delete({ name: "refresh_token", path: "/" });
  return res;
}

export async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL!.toLowerCase();
  const password = process.env.ADMIN_PASSWORD!;
  const existing = await User.findOne({ email }).lean<UserDoc>();
  if (!existing) {
    await User.collection.insertOne({ email, password_hash: await hashPassword(password), name: "DocWin Admin", role: "admin", created_at: now() });
  } else if (!(await bcrypt.compare(password, existing.password_hash))) {
    await User.updateOne({ _id: existing._id }, { $set: { password_hash: await hashPassword(password) } });
  }
  await User.collection.createIndex({ email: 1 }, { unique: true });
  await LoginAttempt.collection.createIndex({ identifier: 1 });
  await LoginAttempt.collection.createIndex({ at: 1 }, { expireAfterSeconds: 86400 });
}
