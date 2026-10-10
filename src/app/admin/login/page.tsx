"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKey } from "@phosphor-icons/react";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError((data as { error?: string }).error ?? "Не удалось войти");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Нет связи с сервером. Попробуйте ещё раз.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="site" style={{ background: "var(--ink)", minHeight: "100vh" }}>
      <div className="login-wrap">
        <form className="login-card" onSubmit={submit}>
          <span className="brand">
            <span className="brand-mark"><span>СК</span></span>
            СУХОЙ КОНТУР
          </span>
          <h1>Вход в рабочую область</h1>
          <p className="login-note">
            Панель управления заявками, контентом и аналитикой.
            Доступ только для администратора компании.
          </p>
          <label className="form-label">
            Пароль администратора
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              autoComplete="current-password"
              required
            />
          </label>
          {error && <p className="login-error">{error}</p>}
          <button className="cta cta-primary" type="submit" disabled={busy}>
            <LockKey size={15} weight="bold" />
            {busy ? "Проверяем…" : "Войти"}
            {!busy && <ArrowRight size={15} weight="bold" />}
          </button>
          <a href="/" className="login-note" style={{ textAlign: "center" }}>← Вернуться на сайт</a>
        </form>
      </div>
    </main>
  );
}
