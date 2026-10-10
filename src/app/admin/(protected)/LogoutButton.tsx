"use client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      className="admin-ghost-btn"
      type="button"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
        router.push("/admin/login");
        router.refresh();
      }}
    >
      Выйти
    </button>
  );
}
