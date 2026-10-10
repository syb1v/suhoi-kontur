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

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

export const cases = sqliteTable("cases", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  site: text("site").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  length: text("length").notNull(),
  days: text("days").notNull(),
  price: text("price").notNull(),
  image: text("image"),
  visible: integer("visible", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const services = sqliteTable("services", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  note: text("note").notNull(),
  href: text("href"),
  visible: integer("visible", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});
