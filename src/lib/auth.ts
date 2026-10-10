import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export const COOKIE = "sk_admin";
export const MAX_AGE = 60 * 60 * 24 * 30;

function secret() {
  return process.env.SESSION_SECRET || "dev-secret-change-me";
}

function sign(exp: number) {
  return crypto.createHmac("sha256", secret()).update(String(exp)).digest("hex");
}

export function createSessionValue() {
  const exp = Date.now() + MAX_AGE * 1000;
  return `${exp}.${sign(exp)}`;
}

export function verifySessionValue(value?: string | null) {
  if (!value) return false;
  const [expStr, sig] = value.split(".");
  const exp = Number(expStr);
  if (!exp || !sig || exp < Date.now()) return false;
  const expected = sign(exp);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

let cachedHash: string | null = null;

function adminHash() {
  if (process.env.ADMIN_PASSWORD_HASH) return process.env.ADMIN_PASSWORD_HASH;
  if (cachedHash) return cachedHash;
  const plain = process.env.ADMIN_PASSWORD || "sk-admin-2026";
  cachedHash = bcrypt.hashSync(plain, 10);
  return cachedHash;
}

export async function verifyPassword(input: string) {
  return bcrypt.compare(input, adminHash());
}

export async function isAuthenticated() {
  const store = await cookies();
  return verifySessionValue(store.get(COOKIE)?.value);
}

export async function requireAdmin() {
  if (!(await isAuthenticated())) redirect("/admin/login");
}
