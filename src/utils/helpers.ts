import type { Lang } from "../types.ts";

export function now(lang: Lang = "es") {
  return new Date().toLocaleTimeString(lang === "es" ? "es-MX" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(d: Date, lang: Lang = "es") {
  return d.toLocaleDateString(lang === "es" ? "es-MX" : "en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
