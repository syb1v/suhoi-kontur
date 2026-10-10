export function track(name: string, metadata?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    const w = window as unknown as { ym?: (id: number | string, action: string, goal: string) => void; __ymId?: number | string };
    if (typeof w.ym === "function" && w.__ymId) {
      try {
        w.ym(w.__ymId, "reachGoal", name);
      } catch {
        void 0;
      }
    }
    const body = JSON.stringify({ name, path: window.location.pathname, metadata });
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon("/api/events", new Blob([body], { type: "application/json" }));
      return;
    }
    fetch("/api/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    void 0;
  }
}
