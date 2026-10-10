import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  phone: text("phone").notNull(),
  messenger: text("messenger").notNull(),
  objectType: text("object_type").notNull(),
  length: integer("length").notNull(),
  drainage: text("drainage").notNull(),
  problem: text("problem"),
  soil: text("soil"),
  location: text("location"),
  estimateMin: integer("estimate_min").notNull(),
  estimateMax: integer("estimate_max").notNull(),
  status: text("status").notNull().default("new"),
  managerNote: text("manager_note"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const analyticsEvents = sqliteTable("analytics_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  path: text("path"),
  metadata: text("metadata"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});
