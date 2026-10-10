# «Сухой Контур» Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an SEO-ready Next.js platform with a public engineering landing, calculator, admin-managed content, leads, media, and first-party analytics.

**Architecture:** One Next.js App Router application with typed section content, Drizzle schema supporting SQLite locally and PostgreSQL in production, server-side lead calculation, and a protected admin area. The first release uses local placeholders and adapters for integrations that require business credentials.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, Drizzle ORM, SQLite/libSQL-compatible local database, Zod, bcryptjs.

**Spec:** `docs/superpowers/specs/2026-10-10-suhoi-kontur-platform-design.md`

## Global Constraints

- Use Russian UI copy and preserve the exact CTA wording from `docs.md`.
- Minimum commercial threshold is 200,000 ₽ and base rate is 3,500 ₽/linear metre.
- Do not use competitor HTML, CSS, JS, structure, text, or corporate photos.
- Exclude Sochi, Adler, Krasnaya Polyana and areas south of Tuapse from service geography.
- Do not commit secrets; all integrations must work in local mode without credentials.

### Task 1: Scaffold the application and repository hygiene

**Files:** create Next.js project files, `.env.example`, `.gitignore`, `README.md`, `BACKLOG.md`; modify `opencode.json` to remove the exposed key.

- [ ] Create the App Router TypeScript project with Tailwind and scripts for `dev`, `build`, `lint`, `typecheck`, and `db:seed`.
- [ ] Add environment variables for `DATABASE_URL`, `ADMIN_PASSWORD`, `SESSION_SECRET`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `SMTP_URL`, and `YANDEX_METRIKA_ID`.
- [ ] Add backlog entries for every unavailable external dependency.
- [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build`.

### Task 2: Define persistence and seed content

**Files:** `src/db/schema.ts`, `src/db/client.ts`, `src/db/seed.ts`, `drizzle.config.ts`.

- [ ] Define tables for admins, site settings, sections, services, cases, media, leads, lead events, SEO pages, and analytics events.
- [ ] Add typed enums/status values and indexes for lead status, source, and event date.
- [ ] Seed the full public page with Russian demo content, five services, seven regional SEO pages, and clearly labelled demo cases.
- [ ] Verify schema generation and seed execution against local SQLite.

### Task 3: Build the public design system and home page

**Files:** `src/app/globals.css`, `src/components/ui/*`, `src/components/sections/*`, `src/app/page.tsx`.

- [ ] Implement white/graphite/cyan engineering palette, dense grotesk typography, responsive layout, accessible focus states, and reduced-motion behavior.
- [ ] Render CMS sections in controlled order with visibility flags.
- [ ] Add hero, metrics, problem cards, services, technical diagrams, demo cases, process, partner block, FAQ, and footer.
- [ ] Use only original CSS/vector illustrations and neutral image placeholders.

### Task 4: Implement calculator and lead capture

**Files:** `src/lib/calculator.ts`, `src/components/calculator/*`, `src/app/api/leads/route.ts`.

- [ ] Implement pure calculation: base `length * 3500`, drainage surcharge `0/35000/65000`, floor at 200000, range ±10%.
- [ ] Add accessible 4-step client flow with validation and exact CTA copy.
- [ ] Validate and persist leads server-side, reject honeypot submissions, and return structured errors.
- [ ] Record calculator and CTA analytics events.

### Task 5: Add SEO route architecture

**Files:** `src/app/(seo)/[slug]/page.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/lib/seo.ts`.

- [ ] Generate service and regional pages from database content with unique titles, descriptions, headings, canonical URLs, and JSON-LD.
- [ ] Add sitemap and robots routes.
- [ ] Ensure excluded geography is not generated or linked.

### Task 6: Build protected admin

**Files:** `src/app/admin/*`, `src/lib/auth.ts`, `src/app/api/admin/*`, `src/components/admin/*`.

- [ ] Add login with bcrypt password verification and httpOnly signed session cookie.
- [ ] Build dashboard with traffic, lead conversion, recent leads, and event counts.
- [ ] Add section editor with visibility/order/content fields, service/case/SEO CRUD, settings editor, and lead status/notes management.
- [ ] Add media metadata/upload abstraction with local storage adapter and future object-storage interface.

### Task 7: Add analytics and integration adapters

**Files:** `src/lib/analytics.ts`, `src/lib/integrations/*`, `src/app/api/events/route.ts`, `src/components/analytics/*`.

- [ ] Track first-party events without requiring Yandex credentials.
- [ ] Add optional Yandex counter script behind configured ID.
- [ ] Add Telegram, SMTP, and CRM adapter interfaces that return explicit `not_configured` results when credentials are absent.
- [ ] Display analytics summaries in admin.

### Task 8: Verify, document, and initialize GitHub

**Files:** `README.md`, `docs/operations.md`.

- [ ] Add local setup, migration, seed, admin login, deployment, and environment documentation.
- [ ] Run lint, typecheck, production build, and a smoke test for calculator and lead API.
- [ ] Inspect `git diff` and `git status`, initialize Git, add remote `https://github.com/syb1v/suhoi-kontur.git`, commit only intended files, and push the initial branch.
