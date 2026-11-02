import React from "react";
import type { Lang } from "../types.ts";
import { useLang } from "../context/LangContext.tsx";
import { T } from "../data/translations.ts";
import { BrandLogo } from "./Common.tsx";

export function AboutStandingBy({
  setLang,
  onContinue,
}: {
  setLang: (l: Lang) => void;
  onContinue: () => void;
}) {
  const lang = useLang();
  const t = T[lang];

  return (
    <div className="min-h-screen bg-[#1E2760] flex flex-col">
      {/* Top full-bleed beige header with logo on top-left and ES | EN toggle on top-right */}
      <header className="w-full bg-[#E9DECE] px-6 pt-9 pb-6 flex items-center justify-between gap-4">
        <BrandLogo size="lg" />

        <div className="flex bg-[#FAF7F2] rounded-full p-1 border border-[#D4C9B6] shrink-0">
          {(["ES", "EN"] as const).map((opt) => {
            const active =
              (opt === "ES" && lang === "es") ||
              (opt === "EN" && lang === "en");
            return (
              <button
                key={opt}
                onClick={() => setLang(opt === "ES" ? "es" : "en")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  active ? "bg-[#1E2760] text-white" : "text-[#1E2760]"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </header>

      {/* Continuous dark indigo body without card boxes */}
      <div className="flex-1 flex flex-col justify-between px-6 pt-9 pb-10">
        <div className="space-y-8">
          <section>
            <h2 className="font-display font-bold text-xl text-[#FAF7F2] leading-snug mb-2.5">
              {t.about_who_title}
            </h2>
            <p className="text-sm text-[#E9DECE] leading-relaxed tracking-[0.01em]">
              {t.about_who_body}
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[#FAF7F2] leading-snug mb-2.5">
              {t.about_anxiety_title}
            </h2>
            <p className="text-sm text-[#E9DECE] leading-relaxed tracking-[0.01em]">
              {t.about_anxiety_body}
            </p>
          </section>
        </div>

        {/* Bottom primary button */}
        <div className="pt-10">
          <button
            onClick={onContinue}
            className="w-full bg-[#E9DECE] text-[#1E2760] font-bold py-4 rounded-full active:scale-[0.98] transition-transform text-sm whitespace-nowrap"
          >
            {t.about_cta}
          </button>
        </div>
      </div>
    </div>
  );
}
