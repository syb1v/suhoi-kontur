import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Сухой Контур — инженерная защита участка", description: "Глубинный дренаж, водоотведение и защита фундаментов в Краснодарском крае и Адыгее." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ru"><body>{children}</body></html>; }
