import React from "react";
import type { Lang, Screen } from "../types.ts";
import { useLang } from "../context/LangContext.tsx";
import { T } from "../data/translations.ts";

export function BrandLogo({ size = "sm" }: { size?: "sm" | "lg" }) {
  const widthClass = size === "lg" ? "w-44" : "w-28";
  return (
    <img
      src={`${import.meta.env.BASE_URL}assets/aistudio/Asset_2_b25f92c6.png`}
      alt="Standing By"
      referrerPolicy="no-referrer"
      className={`${widthClass} aspect-[842/260] object-cover object-top select-none shrink-0 [filter:url(#standing-by-indigo)]`}
    />
  );
}

export function LangPill({ setLang }: { setLang: (l: Lang) => void }) {
  const lang = useLang();
  return (
    <div className="flex bg-[#F4EFE6] rounded-full p-1 border border-[#D4C9B6]">
      {(["ES", "EN"] as const).map((opt) => {
        const active =
          (opt === "ES" && lang === "es") || (opt === "EN" && lang === "en");
        return (
          <button
            key={opt}
            onClick={() => setLang(opt === "ES" ? "es" : "en")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              active
                ? "bg-[#1E2760] text-white"
                : "text-[#1E2760] hover:bg-[#E9DECE]/60"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      aria-label="Back"
      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FAF7F2] border border-[#D4C9B6] text-[#1E2760] active:scale-95 transition-transform shrink-0"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    </button>
  );
}

export function BottomNav({
  active,
  onNav,
}: {
  active: "home" | "progreso" | "perfil";
  onNav: (s: Screen) => void;
}) {
  const lang = useLang();
  const navItems = [
    {
      key: "home",
      label: T[lang].nav_inicio,
      screen: "home" as Screen,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H14v-5h-4v5H4a1 1 0 0 1-1-1V9.5z" />
        </svg>
      ),
    },
    {
      key: "progreso",
      label: T[lang].nav_progreso,
      screen: "progreso" as Screen,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      key: "perfil",
      label: T[lang].nav_perfil,
      screen: "perfil" as Screen,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 max-w-md mx-auto px-4 z-40 pointer-events-none">
      <nav className="pointer-events-auto bg-[#FAF7F2] border border-[#D4C9B6] rounded-full px-3 py-2 flex items-center justify-around shadow-none">
        {navItems.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNav(item.screen)}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all text-xs font-semibold ${
                isActive
                  ? "text-[#1E2760] font-bold"
                  : "text-[#6B6052] hover:text-[#1E2760]"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center mb-0.5 transition-colors ${
                  isActive
                    ? "bg-[#DDE2F5] text-[#1E2760]"
                    : "bg-transparent text-[#6B6052]"
                }`}
              >
                {item.icon}
              </div>
              <span className="text-[11px] leading-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-2 bg-[#FAF7F2] border border-[#D4C9B6] rounded-full overflow-hidden p-0.5">
      <div
        className="h-full bg-[#1E2760] rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
