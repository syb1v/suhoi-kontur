import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { ensureDatabase } from "@/db/init";
import { analyticsEvents } from "@/db/schema";
export async function POST(request: Request) { try { const body=await request.json(); await ensureDatabase(); await db.insert(analyticsEvents).values({name:String(body.name??"unknown"),path:body.path?String(body.path):null,metadata:body.metadata?JSON.stringify(body.metadata):null,createdAt:new Date()}); return NextResponse.json({ok:true}); } catch { return NextResponse.json({ok:false},{status:500}); } }
