"use server";
import fs from "node:fs";
import path from "node:path";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/client";
import { sqlite } from "@/db/client";
import { ensureDatabase } from "@/db/init";
import { cases, leads, services } from "@/db/schema";
import { isAuthenticated } from "@/lib/auth";

async function guard() {
  if (!(await isAuthenticated())) throw new Error("Unauthorized");
  await ensureDatabase();
}

export async function updateLead(formData: FormData) {
  await guard();
  const id = Number(formData.get("id"));
  if (!id) return;
  const status = String(formData.get("status") ?? "new").slice(0, 40);
  const note = String(formData.get("note") ?? "").slice(0, 2000);
  await db.update(leads).set({ status, managerNote: note }).where(eq(leads.id, id));
  revalidatePath("/admin");
}

async function saveUpload(file: FormDataEntryValue | null): Promise<string | null> {
  if (!file || typeof file === "string") return null;
  const blob = file as File;
  if (!blob.size) return null;
  const allowed: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
  const ext = allowed[blob.type];
  if (!ext || blob.size > 5 * 1024 * 1024) return null;
  const dir = path.join(process.cwd(), "public", "uploads");
  fs.mkdirSync(dir, { recursive: true });
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  fs.writeFileSync(path.join(dir, name), Buffer.from(await blob.arrayBuffer()));
  return `/uploads/${name}`;
}

export async function upsertCase(formData: FormData) {
  await guard();
  const id = Number(formData.get("id")) || null;
  const data = {
    site: String(formData.get("site") ?? "").trim().slice(0, 200),
    title: String(formData.get("title") ?? "").trim().slice(0, 200),
    body: String(formData.get("body") ?? "").trim().slice(0, 2000),
    length: String(formData.get("length") ?? "").trim().slice(0, 40),
    days: String(formData.get("days") ?? "").trim().slice(0, 40),
    price: String(formData.get("price") ?? "").trim().slice(0, 40),
    visible: formData.get("visible") === "on",
    sortOrder: Number(formData.get("sortOrder")) || 0,
  };
  if (!data.site || !data.title) return;
  const image = await saveUpload(formData.get("image"));
  const removeImage = formData.get("removeImage") === "on";
  if (id) {
    const current = await db.select().from(cases).where(eq(cases.id, id)).limit(1);
    const prev = current[0]?.image ?? null;
    await db.update(cases).set({ ...data, image: image ?? (removeImage ? null : prev) }).where(eq(cases.id, id));
  } else {
    await db.insert(cases).values({ ...data, image });
  }
  revalidatePath("/", "layout");
}

export async function deleteCase(formData: FormData) {
  await guard();
  const id = Number(formData.get("id"));
  if (!id) return;
  await db.delete(cases).where(eq(cases.id, id));
  revalidatePath("/", "layout");
}

export async function upsertService(formData: FormData) {
  await guard();
  const id = Number(formData.get("id")) || null;
  const hrefRaw = String(formData.get("href") ?? "").trim().slice(0, 200);
  const data = {
    title: String(formData.get("title") ?? "").trim().slice(0, 200),
    note: String(formData.get("note") ?? "").trim().slice(0, 300),
    href: hrefRaw || null,
    visible: formData.get("visible") === "on",
    sortOrder: Number(formData.get("sortOrder")) || 0,
  };
  if (!data.title) return;
  if (id) {
    await db.update(services).set(data).where(eq(services.id, id));
  } else {
    await db.insert(services).values(data);
  }
  revalidatePath("/", "layout");
}

export async function deleteService(formData: FormData) {
  await guard();
  const id = Number(formData.get("id"));
  if (!id) return;
  await db.delete(services).where(eq(services.id, id));
  revalidatePath("/", "layout");
}

export async function updateSettings(formData: FormData) {
  await guard();
  const allowed = ["phone", "email", "telegram", "whatsapp", "metrika_id", "rate_per_meter", "min_price", "guarantee_years"];
  for (const key of allowed) {
    const value = formData.get(key);
    if (typeof value !== "string") continue;
    await sqlite.execute({
      sql: "INSERT INTO site_settings (key, value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value",
      args: [key, value.trim().slice(0, 200)],
    });
  }
  revalidatePath("/", "layout");
}
