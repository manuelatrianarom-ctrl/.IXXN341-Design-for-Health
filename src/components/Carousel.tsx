import React, { useState, useRef } from "react";
import type { Lang } from "../types.ts";
import { useLang } from "../context/LangContext.tsx";
import { T } from "../data/translations.ts";
import { BrandLogo } from "./Common.tsx";
import {
  IconBubble,
  ChecklistIcon,
  PillIcon,
  UsersIcon,
  SparklesIcon,
} from "./AppIcons.tsx";

function getSlides(lang: Lang) {
  const t = T[lang];
  return [
    {
      titulo: (
        <>
          {lang === "es" ? (
            <>
              Todo lo que necesitas en un <span className="font-bold">solo lugar</span>
            </>
          ) : (
            <>
              Everything you need in <span className="font-bold">one place</span>
            </>
          )}
        </>
      ),
      subtitulo: t.slide1_sub,
      ilustracion: (
        <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
          <div className="h-28 bg-[#DDE2F5] border border-[#D4C9B6] rounded-2xl p-3 flex flex-col justify-between items-start">
            <IconBubble tone="white" size="md">
              <ChecklistIcon className="w-4 h-4 text-[#1E2760]" />
            </IconBubble>
            <span className="font-bold text-xs text-[#1E2760] leading-tight">
              {t.card_plan}
            </span>
          </div>
          <div className="h-28 bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl p-3 flex flex-col justify-between items-start">
            <IconBubble tone="white" size="md">
              <PillIcon className="w-4 h-4 text-[#1E2760]" />
            </IconBubble>
            <span className="font-bold text-xs text-[#1E2760] leading-tight">
              {t.card_meds}
            </span>
          </div>
          <div className="h-28 bg-[#EBF5C5] border border-[#D4C9B6] rounded-2xl p-3 flex flex-col justify-between items-start">
            <IconBubble tone="white" size="md">
              <UsersIcon className="w-4 h-4 text-[#1E2760]" />
            </IconBubble>
            <span className="font-bold text-xs text-[#1E2760] leading-tight">
              {t.card_comunidad}
            </span>
          </div>
          <div className="h-28 bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl p-3 flex flex-col justify-between items-start">
            <IconBubble tone="white" size="md">
              <SparklesIcon className="w-4 h-4 text-[#1E2760]" />
            </IconBubble>
            <span className="font-bold text-xs text-[#1E2760] leading-tight">
              {t.card_ia}
            </span>
          </div>
        </div>
      ),
    },
    {
      titulo: (
        <>
          {lang === "es" ? (
            <>
              Herramientas diseñadas para el <span className="font-bold">momento justo</span>
            </>
          ) : (
            <>
              Tools crafted for the <span className="font-bold">right moment</span>
            </>
          )}
        </>
      ),
      subtitulo: t.slide2_sub,
      ilustracion: (
        <div className="flex flex-col gap-3 w-full max-w-xs">
          {[
            {
              label: t.filter_ahora,
              items: [
                lang === "es" ? "Respiración 4-7-8" : "4-7-8 Breathing",
                lang === "es" ? "Grounding 5-4-3-2-1" : "Grounding 5-4-3-2-1",
              ],
            },
            {
              label: t.filter_prev,
              items: [
                lang === "es"
                  ? "Rutina de cierre de día"
                  : "End-of-day routine",
              ],
            },
          ].map((grupo, i) => (
            <div
              key={i}
              className="bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl overflow-hidden"
            >
              <div className="bg-[#DDE2F5] px-4 py-2">
                <span className="text-xs font-bold text-[#1E2760] uppercase tracking-wide">
                  {grupo.label}
                </span>
              </div>
              {grupo.items.map((item, j) => (
                <div
                  key={j}
                  className="px-4 py-2.5 border-t border-[#D4C9B6] first:border-t-0 flex items-center gap-2.5"
                >
                  <div className="w-2 h-2 rounded-full bg-[#1E2760]" />
                  <span className="text-xs font-medium text-[#1E2760]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      ),
    },
    {
      titulo: (
        <>
          {lang === "es" ? (
            <>
              Una comunidad de familias que <span className="font-bold">comprenden</span>
            </>
          ) : (
            <>
              A community of families who <span className="font-bold">understand</span>
            </>
          )}
        </>
      ),
      subtitulo: t.slide3_sub,
      ilustracion: (
        <div className="flex flex-col gap-3 w-full max-w-xs">
          {[
            {
              alias:
                lang === "es" ? "Madre anónima #374" : "Anonymous parent #374",
              texto:
                lang === "es"
                  ? "¿Es suficiente con solo estar presente sin decir nada?"
                  : "Is it enough to just be present without saying anything?",
              reacciones: 47,
            },
            {
              alias:
                lang === "es" ? "Padre anónimo #261" : "Anonymous parent #261",
              texto:
                lang === "es"
                  ? "Me siento tranquilo cuando le doy su espacio sin juzgar."
                  : "I feel at peace when giving them space without judgment.",
              reacciones: 89,
            },
          ].map((post, i) => (
            <div
              key={i}
              className="bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl p-4"
            >
              <p className="text-xs font-bold text-[#6B6052] mb-1">
                {post.alias}
              </p>
              <p className="text-xs text-[#1E2760] leading-snug mb-3">
                {post.texto}
              </p>
              <div className="flex gap-2">
                <span className="text-[11px] bg-[#EBF5C5] text-[#1E2760] font-bold px-3 py-0.5 rounded-full border border-[#ADCC16]">
                  {post.reacciones} {t.com_identify}
                </span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      titulo: (
        <>
          {lang === "es" ? (
            <>
              Orientación sensible para <span className="font-bold">acompañar</span>
            </>
          ) : (
            <>
              Gentle guidance for <span className="font-bold">support</span>
            </>
          )}
        </>
      ),
      subtitulo: t.slide4_sub,
      ilustracion: (
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <div className="flex justify-end">
            <div className="bg-[#1E2760] text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
              <p className="text-xs">
                {lang === "es"
                  ? "Mi hija no quiere hablar del tema en absoluto."
                  : "My daughter won't talk about it at all."}
              </p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
              <p className="text-xs text-[#1E2760] leading-relaxed">
                {lang === "es"
                  ? 'Respeta el "no" por ahora. Intenta estar cerca sin agenda — ver algo juntos, cocinar. La conexión ocurre cuando no hay presión.'
                  : 'Respect the "no" for now. Try being nearby without an agenda — watching something together, cooking. Connection happens when there\'s no pressure.'}
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];
}

export function Carousel({
  setLang,
  onDone,
}: {
  setLang: (l: Lang) => void;
  onDone: () => void;
}) {
  const lang = useLang();
  const [idx, setIdx] = useState(0);
  const startX = useRef<number | null>(null);
  const slides = getSlides(lang);

  function handleTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 40 && idx < slides.length - 1) setIdx(idx + 1);
    if (diff < -40 && idx > 0) setIdx(idx - 1);
    startX.current = null;
  }

  const slide = slides[idx];
  const isLast = idx === slides.length - 1;
  const t = T[lang];

  return (
    <div
      className="min-h-screen bg-[#E9DECE] flex flex-col select-none justify-between"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 pt-10 pb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="flex bg-[#FAF7F2] rounded-full p-1 border border-[#D4C9B6]">
            {(["ES", "EN"] as const).map((opt) => {
              const active =
                (opt === "ES" && lang === "es") ||
                (opt === "EN" && lang === "en");
              return (
                <button
                  key={opt}
                  onClick={() => setLang(opt === "ES" ? "es" : "en")}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    active
                      ? "bg-[#1E2760] text-white"
                      : "text-[#1E2760]"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {!isLast && (
            <button
              onClick={onDone}
              className="text-xs font-bold text-[#6B6052] underline underline-offset-2"
            >
              {t.carousel_skip}
            </button>
          )}
        </div>
        <BrandLogo />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 pt-2 pb-6 justify-around">
        <div>
          <p className="text-xs font-bold text-[#6B6052] uppercase tracking-widest mb-2">
            {idx + 1} / {slides.length}
          </p>
          <h2 className="font-display text-2xl text-[#1E2760] font-normal leading-snug mb-2">
            {slide.titulo}
          </h2>
          <p className="text-xs text-[#6B6052] leading-relaxed">
            {slide.subtitulo}
          </p>
        </div>

        <div className="flex items-center justify-center my-4">
          {slide.ilustracion}
        </div>
      </div>

      {/* Dots + navigation: Rule 8: Back arrow only, Continue text only */}
      <div className="px-6 pb-10 flex items-center justify-between">
        <button
          onClick={() => idx > 0 && setIdx(idx - 1)}
          aria-label="Atrás"
          className={`w-10 h-10 rounded-full border border-[#D4C9B6] bg-[#FAF7F2] flex items-center justify-center text-[#1E2760] transition-all shrink-0 ${
            idx === 0
              ? "opacity-0 pointer-events-none"
              : "active:scale-95"
          }`}
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

        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`rounded-full transition-all ${
                i === idx
                  ? "w-6 h-2 bg-[#1E2760]"
                  : "w-2 h-2 bg-[#D4C9B6]"
              }`}
            />
          ))}
        </div>

        {/* Continue / Start button - text only */}
        {isLast ? (
          <button
            onClick={onDone}
            className="bg-[#1E2760] text-white font-bold text-xs px-5 py-3 rounded-full active:scale-95 transition-transform"
          >
            {t.carousel_start}
          </button>
        ) : (
          <button
            onClick={() => setIdx(idx + 1)}
            className="bg-[#1E2760] text-white font-bold text-xs px-5 py-3 rounded-full active:scale-95 transition-transform"
          >
            {lang === "es" ? "Continuar" : "Continue"}
          </button>
        )}
      </div>
    </div>
  );
}
