import React, { useState } from "react";
import type { Screen } from "../types.ts";
import { useLang } from "../context/LangContext.tsx";
import { T } from "../data/translations.ts";
import { formatDate } from "../utils/helpers.ts";
import { BottomNav, BrandLogo } from "./Common.tsx";
import {
  IconBubble,
  FaceCalmIcon,
  FaceEnergeticIcon,
  FaceNeutralIcon,
  FaceRestlessIcon,
  FaceWorriedIcon,
  FaceOverwhelmedIcon,
  FaceIrritableIcon,
  FaceTiredIcon,
  ChecklistIcon,
  PillIcon,
  UsersIcon,
  SparklesIcon,
} from "./AppIcons.tsx";

const ALERT_STATES = new Set([
  "inquieto",
  "preocupado",
  "abrumado",
  "irritable",
  "cansado",
]);

export function Home({
  cuidador,
  hijo,
  onNav,
  onEstadoSelect,
}: {
  cuidador: string;
  hijo: string;
  onNav: (s: Screen) => void;
  onEstadoSelect: (estado: string) => void;
}) {
  const lang = useLang();
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<string | null>(
    null,
  );
  const t = T[lang];

  // 8 emotion face icons arranged in 2 rows of 4 columns
  const emociones = [
    {
      key: "tranquilo",
      label: t.estado_tranquilo,
      icon: <FaceCalmIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "lime" as const,
    },
    {
      key: "energia",
      label: t.estado_energia,
      icon: <FaceEnergeticIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "lime" as const, // Same color tone as calm (lime)
    },
    {
      key: "normal",
      label: t.estado_normal,
      icon: <FaceNeutralIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "warm" as const,
    },
    {
      key: "inquieto",
      label: t.estado_inquieto,
      icon: <FaceRestlessIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "warm" as const,
    },
    {
      key: "preocupado",
      label: t.estado_preocupado,
      icon: <FaceWorriedIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "indigo" as const,
    },
    {
      key: "abrumado",
      label: t.estado_abrumado,
      icon: <FaceOverwhelmedIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "indigo" as const,
    },
    {
      key: "irritable",
      label: t.estado_irritable,
      icon: <FaceIrritableIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "indigo" as const, // Same color tone as overwhelmed (indigo)
    },
    {
      key: "cansado",
      label: t.estado_cansado,
      icon: <FaceTiredIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "warm" as const,
    },
  ];

  function handleEstado(key: string) {
    setEstadoSeleccionado(key);
    onEstadoSelect(key);
    if (ALERT_STATES.has(key)) {
      setTimeout(() => onNav("plan-list"), 450);
    }
  }

  const isAlert = estadoSeleccionado
    ? ALERT_STATES.has(estadoSeleccionado)
    : false;

  return (
    <div className="min-h-screen bg-[#E9DECE] pb-28">
      {/* Top Header - Level 1 Hero */}
      <div className="pt-10 pb-4 px-6 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6052] mb-1">
            {formatDate(new Date(), lang)}
          </p>
          <h1 className="font-display text-2xl text-[#1E2760] font-normal leading-snug">
            {lang === "es" ? "Hola, " : "Hello, "}
            <span className="font-bold">
              {cuidador || (lang === "es" ? "Familia" : "Family")}
            </span>
          </h1>
        </div>
        <BrandLogo />
      </div>

      <div className="px-5 space-y-6">
        {/* Emotion Selector - Exactly 2 rows of 4 columns */}
        <div>
          <div className="mb-3">
            <h2 className="font-display text-lg text-[#1E2760] font-normal">
              {t.home_pregunta}{" "}
              <span className="font-bold">{hijo || (lang === "es" ? "tu adolescente" : "your teen")}</span>?
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-y-3 gap-x-1">
            {emociones.map((e) => {
              const sel = estadoSeleccionado === e.key;
              return (
                <button
                  key={e.key}
                  onClick={() => handleEstado(e.key)}
                  className="flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all active:scale-[0.93] cursor-pointer"
                >
                  <IconBubble
                    tone={sel ? "lime" : e.tone}
                    size="md"
                    className={`mb-1.5 transition-all ${
                      sel ? "ring-2 ring-[#ADCC16] scale-105" : ""
                    }`}
                  >
                    {e.icon}
                  </IconBubble>
                  <span
                    className={`text-[11px] text-center leading-tight line-clamp-1 transition-colors ${
                      sel
                        ? "font-bold text-[#1E2760]"
                        : "font-medium text-[#1E2760]"
                    }`}
                  >
                    {e.label}
                  </span>
                </button>
              );
            })}
          </div>

          {estadoSeleccionado && (
            <div className="mt-3 text-center">
              <p
                className={`text-xs font-semibold ${
                  isAlert ? "text-[#1E2760]" : "text-[#6B6052]"
                }`}
              >
                {isAlert ? t.home_opening : t.home_registered}
              </p>
            </div>
          )}
        </div>

        {/* Level 2: "Tus herramientas" - 4 cards */}
        <div>
          <div className="mb-3">
            <h2 className="font-display text-lg text-[#1E2760] font-normal">
              {lang === "es" ? (
                <>
                  Tus <span className="font-bold">herramientas</span>
                </>
              ) : (
                <>
                  Your <span className="font-bold">tools</span>
                </>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Card 1: Plan de Acción */}
            <button
              onClick={() => onNav("plan-list")}
              className="h-32 bg-[#DDE2F5] border border-[#D4C9B6] rounded-2xl p-4 flex flex-col justify-between items-start text-left active:scale-[0.98] transition-transform"
            >
              <IconBubble tone="white" size="lg">
                <ChecklistIcon className="w-5 h-5 text-[#1E2760]" />
              </IconBubble>
              <span className="font-bold text-sm text-[#1E2760] leading-tight">
                {t.card_plan}
              </span>
            </button>

            {/* Card 2: Medicamentos */}
            <button
              onClick={() => onNav("meds-main")}
              className="h-32 bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl p-4 flex flex-col justify-between items-start text-left active:scale-[0.98] transition-transform"
            >
              <IconBubble tone="white" size="lg">
                <PillIcon className="w-5 h-5 text-[#1E2760]" />
              </IconBubble>
              <span className="font-bold text-sm text-[#1E2760] leading-tight">
                {t.card_meds}
              </span>
            </button>

            {/* Card 3: Comunidad */}
            <button
              onClick={() => onNav("comunidad-feed")}
              className="h-32 bg-[#EBF5C5] border border-[#D4C9B6] rounded-2xl p-4 flex flex-col justify-between items-start text-left active:scale-[0.98] transition-transform"
            >
              <IconBubble tone="white" size="lg">
                <UsersIcon className="w-5 h-5 text-[#1E2760]" />
              </IconBubble>
              <span className="font-bold text-sm text-[#1E2760] leading-tight">
                {t.card_comunidad}
              </span>
            </button>

            {/* Card 4: Compañera IA */}
            <button
              onClick={() => onNav("ia-entrada")}
              className="h-32 bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl p-4 flex flex-col justify-between items-start text-left active:scale-[0.98] transition-transform"
            >
              <IconBubble tone="white" size="lg">
                <SparklesIcon className="w-5 h-5 text-[#1E2760]" />
              </IconBubble>
              <span className="font-bold text-sm text-[#1E2760] leading-tight">
                {t.card_ia}
              </span>
            </button>
          </div>
        </div>

        {/* Tip section - Soft beige/pastel flat card */}
        <div className="bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl p-4">
          <p className="text-xs font-bold text-[#1E2760] uppercase tracking-wider mb-1">
            {t.home_tip_label}
          </p>
          <p className="text-xs text-[#6B6052] leading-relaxed">
            {t.home_tip}
          </p>
        </div>
      </div>

      <BottomNav active="home" onNav={onNav} />
    </div>
  );
}
