"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/client";
import { ensureDatabase } from "@/db/init";
import { leads } from "@/db/schema";
import { isAuthenticated } from "@/lib/auth";

export async function updateLead(formData: FormData) {
  if (!(await isAuthenticated())) throw new Error("Unauthorized");
  const id = Number(formData.get("id"));
  if (!id) return;
  const status = String(formData.get("status") ?? "new").slice(0, 40);
  const note = String(formData.get("note") ?? "").slice(0, 2000);
  await ensureDatabase();
  await db.update(leads).set({ status, managerNote: note }).where(eq(leads.id, id));
  revalidatePath("/admin");
}
