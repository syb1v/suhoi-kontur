import { sqlite } from "./client";

let initialized = false;
export async function ensureDatabase() {
  if (initialized) return;
  await sqlite.execute(`CREATE TABLE IF NOT EXISTS leads (id INTEGER PRIMARY KEY AUTOINCREMENT, phone TEXT NOT NULL, messenger TEXT NOT NULL, object_type TEXT NOT NULL, length INTEGER NOT NULL, drainage TEXT NOT NULL, problem TEXT, soil TEXT, location TEXT, estimate_min INTEGER NOT NULL, estimate_max INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'new', created_at INTEGER NOT NULL)`);
  await sqlite.execute(`CREATE TABLE IF NOT EXISTS analytics_events (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, path TEXT, metadata TEXT, created_at INTEGER NOT NULL)`);
  initialized = true;
}
