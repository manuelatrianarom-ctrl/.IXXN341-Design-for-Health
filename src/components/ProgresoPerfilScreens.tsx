import React from "react";
import type { Screen, Medicamento, Lang } from "../types.ts";
import { useLang } from "../context/LangContext.tsx";
import { T } from "../data/translations.ts";
import { getEjercicios } from "../data/mockData.ts";
import { BottomNav, BrandLogo } from "./Common.tsx";
import { IconBubble, ChecklistIcon } from "./AppIcons.tsx";

export function Progreso({
  meds,
  ejerciciosProbados,
  historialEstados,
  onNav,
}: {
  meds: Medicamento[];
  ejerciciosProbados: number[];
  historialEstados: { fecha: string; estado: string }[];
  onNav: (s: Screen) => void;
}) {
  const lang = useLang();
  const ejerciciosProbadosList = getEjercicios(lang).filter((e) =>
    ejerciciosProbados.includes(e.id),
  );
  const medsTomados = meds.filter((m) => m.tomadoHoy).length;

  return (
    <div className="min-h-screen bg-[#E9DECE] pb-28">
      {/* Top Header */}
      <div className="bg-[#FAF7F2] border-b border-[#D4C9B6] px-5 pt-10 pb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-2xl text-[#1E2760] font-normal">
            {lang === "es" ? (
              <>
                Tu <span className="font-bold">progreso</span>
              </>
            ) : (
              <>
                Your <span className="font-bold">progress</span>
              </>
            )}
          </h1>
          <p className="text-xs text-[#6B6052] mt-0.5">{T[lang].prog_sub}</p>
        </div>
        <BrandLogo />
      </div>

      <div className="px-5 mt-5 space-y-4">
        {/* Metric Highlights (Rule 5: Big bold numbers in indigo) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#D4C9B6]">
            <p className="text-[11px] font-bold text-[#6B6052] uppercase tracking-wider mb-1">
              Medicamentos
            </p>
            <div className="text-3xl font-bold text-[#1E2760] font-sans">
              {medsTomados} <span className="text-sm font-normal text-[#6B6052]">/ {meds.length}</span>
            </div>
            <p className="text-[11px] text-[#6B6052] mt-1">Tomas hoy</p>
          </div>

          <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#D4C9B6]">
            <p className="text-[11px] font-bold text-[#6B6052] uppercase tracking-wider mb-1">
              Ejercicios
            </p>
            <div className="text-3xl font-bold text-[#1E2760] font-sans">
              {ejerciciosProbadosList.length}
            </div>
            <p className="text-[11px] text-[#6B6052] mt-1">Estrategias probadas</p>
          </div>
        </div>

        {/* Medicamentos Details */}
        <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#D4C9B6]">
          <p className="text-xs font-bold text-[#6B6052] uppercase tracking-wide mb-3">
            {T[lang].prog_meds}
          </p>
          {meds.length === 0 ? (
            <p className="text-xs text-[#6B6052]">{T[lang].prog_no_meds}</p>
          ) : (
            <div className="space-y-2.5">
              {meds.map((m) => (
                <div key={m.id} className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#1E2760]">{m.nombre}</span>
                  <span
                    className={`text-[11px] font-bold px-3 py-0.5 rounded-full ${
                      m.tomadoHoy
                        ? "bg-[#EBF5C5] text-[#1E2760] border border-[#ADCC16]"
                        : "bg-[#F4EFE6] text-[#6B6052] border border-[#D4C9B6]"
                    }`}
                  >
                    {m.tomadoHoy ? T[lang].taken : T[lang].pending}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ejercicios Probados */}
        <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#D4C9B6]">
          <p className="text-xs font-bold text-[#6B6052] uppercase tracking-wide mb-3">
            {T[lang].prog_ejercicios} ({ejerciciosProbadosList.length})
          </p>
          {ejerciciosProbadosList.length === 0 ? (
            <p className="text-xs text-[#6B6052]">{T[lang].prog_no_ejercicios}</p>
          ) : (
            <div className="space-y-2">
              {ejerciciosProbadosList.map((e) => (
                <div key={e.id} className="flex items-center gap-3">
                  <IconBubble tone="lime" size="sm">
                    <ChecklistIcon className="w-3.5 h-3.5 text-[#1E2760]" />
                  </IconBubble>
                  <span className="text-xs text-[#1E2760] font-medium flex-1">
                    {e.titulo}
                  </span>
                  <span className="text-xs text-[#1E2760] font-bold">✓</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Historial de estados */}
        <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#D4C9B6]">
          <p className="text-xs font-bold text-[#6B6052] uppercase tracking-wide mb-3">
            {T[lang].prog_estados}
          </p>
          {historialEstados.length === 0 ? (
            <p className="text-xs text-[#6B6052]">{T[lang].prog_no_estados}</p>
          ) : (
            <div className="space-y-2.5">
              {historialEstados
                .slice(-5)
                .reverse()
                .map((h, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="text-[#6B6052] text-[11px]">{h.fecha}</span>
                    <span className="font-bold text-[#1E2760] capitalize bg-[#F4EFE6] border border-[#D4C9B6] px-2.5 py-0.5 rounded-full">
                      {h.estado}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav active="progreso" onNav={onNav} />
    </div>
  );
}

export function Perfil({
  setLang,
  cuidador,
  hijo,
  onNav,
  onReset,
}: {
  setLang: (l: Lang) => void;
  cuidador: string;
  hijo: string;
  onNav: (s: Screen) => void;
  onReset: () => void;
}) {
  const lang = useLang();

  return (
    <div className="min-h-screen bg-[#E9DECE] pb-28">
      {/* Top Header Card */}
      <div className="bg-[#FAF7F2] border-b border-[#D4C9B6] px-5 pt-10 pb-6">
        <div className="flex justify-end mb-3">
          <BrandLogo />
        </div>
        <div className="flex items-center gap-4">
          <IconBubble tone="indigo" size="xl">
            <span className="font-display font-bold text-lg text-[#1E2760]">SB</span>
          </IconBubble>
          <div>
            <h1 className="font-display text-2xl text-[#1E2760] font-normal leading-snug">
              {cuidador || (lang === "es" ? "Cuidador/a" : "Caregiver")}
            </h1>
            <p className="text-xs text-[#6B6052]">
              {T[lang].perfil_cuidando}{" "}
              <span className="font-bold text-[#1E2760]">
                {hijo || (lang === "es" ? "tu adolescente" : "your teen")}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 mt-5 space-y-4">
        {/* Idioma Selector */}
        <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#D4C9B6] flex items-center justify-between">
          <span className="text-xs font-bold text-[#1E2760]">
            {T[lang].perfil_idioma}
          </span>
          <div className="flex bg-[#F4EFE6] rounded-full p-1 border border-[#D4C9B6]">
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
        </div>

        {/* Links */}
        <div className="bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#D4C9B6]">
          {[
            { label: T[lang].perfil_favoritos },
            { label: T[lang].perfil_notif },
            { label: T[lang].perfil_sobre },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center justify-between px-5 py-4 border-b border-[#D4C9B6] last:border-b-0 text-xs font-bold text-[#1E2760] text-left active:bg-[#F4EFE6]"
            >
              <span>{item.label}</span>
              <span className="text-[#6B6052] text-sm">›</span>
            </button>
          ))}
        </div>

        {/* Privacy Note */}
        <div className="bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl p-4">
          <p className="text-xs text-[#6B6052] leading-relaxed">
            {T[lang].perfil_privacy}
          </p>
        </div>

        {/* Reset button - pill rounded-full */}
        <button
          onClick={onReset}
          className="w-full text-red-600 font-bold text-xs py-4 border border-red-200 rounded-full active:scale-[0.98] transition-transform bg-[#FAF7F2]"
        >
          {T[lang].perfil_reset}
        </button>
      </div>

      <BottomNav active="perfil" onNav={onNav} />
    </div>
  );
}
