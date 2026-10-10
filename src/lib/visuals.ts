import fs from "node:fs";
import path from "node:path";

export function publicImage(relativePath: string): string | null {
  try {
    const clean = relativePath.replace(/^\//, "");
    const full = path.join(process.cwd(), "public", clean);
    if (!fs.existsSync(full)) return null;
    return `/${clean}`;
  } catch {
    return null;
  }
}

export function readPublicText(relativePath: string): string | null {
  try {
    const clean = relativePath.replace(/^\//, "");
    const full = path.join(process.cwd(), "public", clean);
    if (!fs.existsSync(full)) return null;
    const text = fs.readFileSync(full, "utf8").trim();
    return text ? text.slice(0, 140) : null;
  } catch {
    return null;
  }
}
