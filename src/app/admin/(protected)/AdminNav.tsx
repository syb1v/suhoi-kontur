"use client";
import { usePathname } from "next/navigation";

const items: [string, string][] = [
  ["/admin", "Дашборд"],
  ["/admin/content", "Контент"],
  ["/admin/settings", "Настройки"],
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="admin-nav">
      {items.map(([href, label]) => (
        <a key={href} href={href} className={pathname === href ? "active" : ""}>{label}</a>
      ))}
    </nav>
  );
}
