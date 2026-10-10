import type { Metadata } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { HeaderShrink } from "@/components/site/HeaderShrink";
import { requireAdmin } from "@/lib/auth";
import { AdminNav } from "./AdminNav";
import { LogoutButton } from "./LogoutButton";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <main className="site" style={{ background: "var(--paper-2)", minHeight: "100vh" }}>
      <header className="topbar">
        <HeaderShrink />
        <div className="wrap topbar-inner">
          <a className="brand" href="/">
            <span className="brand-mark"><span>СК</span></span>
            СУХОЙ КОНТУР
          </a>
          <div className="top-actions admin-top-actions">
            <span className="phone" style={{ color: "var(--muted-dark)", fontWeight: 500 }}>Рабочая область</span>
            <a className="cta cta-primary" href="/">
              На сайт
              <ArrowUpRight size={15} weight="bold" />
            </a>
            <LogoutButton />
          </div>
        </div>
      </header>
      <div className="wrap">
        <AdminNav />
      </div>
      <div className="wrap section">{children}</div>
    </main>
  );
}
