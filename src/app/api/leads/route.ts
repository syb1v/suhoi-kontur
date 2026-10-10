import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { ensureDatabase } from "@/db/init";
import { leads } from "@/db/schema";
import { calculateEstimate, type Drainage } from "@/lib/calculator";
import { notifyNewLead } from "@/lib/integrations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ ok: true });
    if (!/^\+?[0-9 ()-]{10,20}$/.test(String(body.phone ?? ""))) return NextResponse.json({ error: "Укажите корректный телефон" }, { status: 400 });
    const length = Math.min(150, Math.max(50, Number(body.length) || 60));
    const drainage = (["free", "well", "pump"].includes(body.drainage) ? body.drainage : "well") as Drainage;
    const estimate = calculateEstimate(length, drainage);
    await ensureDatabase();
    await db.insert(leads).values({ phone: String(body.phone), messenger: String(body.messenger ?? "Telegram"), objectType: String(body.objectType ?? "Комплекс"), length, drainage, problem: body.problem ? String(body.problem) : null, soil: body.soil ? String(body.soil) : null, location: body.location ? String(body.location) : null, estimateMin: estimate.min, estimateMax: estimate.max, createdAt: new Date() });
    await notifyNewLead({ phone: String(body.phone), messenger: String(body.messenger ?? "Telegram"), objectType: String(body.objectType ?? "Комплекс"), length, estimateMin: estimate.min, estimateMax: estimate.max, location: body.location ? String(body.location) : null });
    return NextResponse.json({ ok: true, estimate });
  } catch { return NextResponse.json({ error: "Не удалось сохранить заявку. Попробуйте ещё раз." }, { status: 500 }); }
}
