"use client";
import { useEffect } from "react";

export function HeaderShrink() {
  useEffect(() => {
    const header = document.querySelector(".topbar");
    if (!header) return;
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
