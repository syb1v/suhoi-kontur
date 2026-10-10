import { NextResponse } from "next/server";
import { COOKIE, MAX_AGE, createSessionValue, verifyPassword } from "@/lib/auth";

const attempts = new Map<string, { count: number; ts: number }>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 8;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const now = Date.now();
  const rec = attempts.get(ip);
  if (rec && now - rec.ts < WINDOW && rec.count >= LIMIT) {
    return NextResponse.json({ error: "Слишком много попыток. Повторите через 10 минут." }, { status: 429 });
  }
  const body = await request.json().catch(() => ({}));
  const password = String((body as { password?: unknown }).password ?? "");
  if (!password || !(await verifyPassword(password))) {
    attempts.set(ip, rec && now - rec.ts < WINDOW ? { count: rec.count + 1, ts: rec.ts } : { count: 1, ts: now });
    return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });
  }
  attempts.delete(ip);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE, createSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
  return response;
}
