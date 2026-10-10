import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import fs from "node:fs";
import path from "node:path";

const configuredUrl = process.env.DATABASE_URL?.startsWith("file:") ? process.env.DATABASE_URL : "file:./data/suhoi-kontur.db";
const localPath = configuredUrl.replace(/^file:/, "");
if (!localPath.startsWith(":memory:")) fs.mkdirSync(path.dirname(path.resolve(localPath)), { recursive: true });
const url = configuredUrl;
export const sqlite = createClient({ url });
export const db = drizzle(sqlite, { schema });
