import React, { useState } from "react";
import { useLang } from "../context/LangContext.tsx";
import { T } from "../data/translations.ts";
import { BackButton, BrandLogo, ProgressBar } from "./Common.tsx";

export function PersonalizarIntro({
  onContinue,
  onBack,
}: {
  onContinue: () => void;
  onBack: () => void;
}) {
  const lang = useLang();
  return (
    <div className="min-h-screen bg-[#E9DECE] flex flex-col justify-between p-6">
      <div>
        <div className="flex items-center justify-between">
          <BackButton onBack={onBack} />
          <BrandLogo />
        </div>
        <h1 className="font-display text-2xl text-[#1E2760] font-normal leading-snug mt-4">
          {lang === "es" ? (
            <>
              Personaliza tu <span className="font-bold">experiencia</span>
            </>
          ) : (
            <>
              Personalize your <span className="font-bold">experience</span>
            </>
          )}
        </h1>
        <p className="text-xs text-[#6B6052] mt-1 leading-relaxed">
          {T[lang].pers_intro_sub}
        </p>

        <div className="mt-8 space-y-3">
          {[T[lang].pers_step1, T[lang].pers_step2, T[lang].pers_step3].map(
            (step, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl p-4">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    i === 0
                      ? "bg-[#1E2760] text-white"
                      : "bg-[#F4EFE6] text-[#1E2760] border border-[#D4C9B6]"
                  }`}
                >
                  {i + 1}
                </div>
                <span className="text-xs font-bold text-[#1E2760]">
                  {step}
                </span>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="space-y-4 pt-6">
        <ProgressBar value={10} />
        <button
          onClick={onContinue}
          className="w-full bg-[#1E2760] text-white font-bold py-4 rounded-full active:scale-[0.98] transition-transform text-sm"
        >
          {lang === "es" ? "Continuar" : "Continue"}
        </button>
      </div>
    </div>
  );
}

export function PersonalizarQuien({
  onContinue,
  onBack,
}: {
  onContinue: (relacion: string) => void;
  onBack: () => void;
}) {
  const lang = useLang();
  const [relacion, setRelacion] = useState("");
  const opciones = [
    T[lang].quien_opt1,
    T[lang].quien_opt2,
    T[lang].quien_opt3,
    T[lang].quien_opt4,
  ];

  return (
    <div className="min-h-screen bg-[#E9DECE] flex flex-col justify-between p-6">
      <div>
        <div className="flex items-center justify-between">
          <BackButton onBack={onBack} />
          <BrandLogo />
        </div>
        <p className="text-xs font-bold text-[#6B6052] uppercase tracking-widest mt-4 mb-1">
          {T[lang].quien_step}
        </p>
        <h1 className="font-display text-2xl text-[#1E2760] font-normal leading-snug">
          {lang === "es" ? (
            <>
              ¿A quién estás <span className="font-bold">acompañando</span>?
            </>
          ) : (
            <>
              Who are you <span className="font-bold">supporting</span>?
            </>
          )}
        </h1>
        <p className="text-xs text-[#6B6052] mt-1 mb-6">
          {T[lang].quien_sub}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {opciones.map((op) => (
            <button
              key={op}
              onClick={() => setRelacion(op)}
              className={`py-3.5 px-4 rounded-2xl border text-xs font-bold transition-all active:scale-95 ${
                relacion === op
                  ? "bg-[#DDE2F5] text-[#1E2760] border-[#1E2760]"
                  : "bg-[#FAF7F2] border-[#D4C9B6] text-[#1E2760]"
              }`}
            >
              {op}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={(opciones as readonly string[]).includes(relacion) ? "" : relacion}
          onChange={(e) => setRelacion(e.target.value)}
          placeholder={T[lang].quien_placeholder}
          className="w-full bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl px-4 py-3.5 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760]"
        />
      </div>

      <div className="space-y-4 pt-6">
        <ProgressBar value={50} />
        <button
          onClick={() => relacion.trim() && onContinue(relacion.trim())}
          disabled={!relacion.trim()}
          className="w-full bg-[#1E2760] text-white font-bold py-4 rounded-full active:scale-[0.98] transition-transform disabled:opacity-40 text-sm"
        >
          {lang === "es" ? "Continuar" : "Continue"}
        </button>
      </div>
    </div>
  );
}

export function PersonalizarNombre({
  relacion,
  onContinue,
  onBack,
}: {
  relacion: string;
  onContinue: (nombre: string) => void;
  onBack: () => void;
}) {
  const lang = useLang();
  const [nombre, setNombre] = useState("");
  const placeholder =
    lang === "es"
      ? relacion.toLowerCase().includes("hija")
        ? "Sofía"
        : relacion.toLowerCase().includes("hij")
        ? "Mateo"
        : "Su nombre"
      : relacion.toLowerCase().includes("daughter")
      ? "Sofia"
      : relacion.toLowerCase().includes("son") ||
        relacion.toLowerCase().includes("child")
      ? "Mateo"
      : "Their name";

  return (
    <div className="min-h-screen bg-[#E9DECE] flex flex-col justify-between p-6">
      <div>
        <div className="flex items-center justify-between">
          <BackButton onBack={onBack} />
          <BrandLogo />
        </div>
        <p className="text-xs font-bold text-[#6B6052] uppercase tracking-widest mt-4 mb-1">
          {T[lang].nombre_step}
        </p>
        <h1 className="font-display text-2xl text-[#1E2760] font-normal leading-snug">
          {lang === "es" ? (
            <>
              ¿Cómo se llama tu <span className="font-bold">{relacion.toLowerCase() || "adolescente"}</span>?
            </>
          ) : (
            <>
              What is your <span className="font-bold">{relacion.toLowerCase() || "teen"}'s</span> name?
            </>
          )}
        </h1>
        <p className="text-xs text-[#6B6052] mt-1 mb-6">
          {T[lang].nombre_sub}
        </p>

        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl px-4 py-3.5 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760]"
          autoFocus
        />

        {nombre.trim() && (
          <div className="mt-4 bg-[#EBF5C5] border border-[#ADCC16] rounded-2xl p-4">
            <p className="text-xs text-[#1E2760] leading-snug">
              {T[lang].nombre_preview}{" "}
              <span className="font-bold">
                "{T[lang].home_pregunta} {nombre}?"
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4 pt-6">
        <ProgressBar value={90} />
        <button
          onClick={() => nombre.trim() && onContinue(nombre.trim())}
          disabled={!nombre.trim()}
          className="w-full bg-[#1E2760] text-white font-bold py-4 rounded-full active:scale-[0.98] transition-transform disabled:opacity-40 text-sm"
        >
          {lang === "es" ? "Continuar" : "Continue"}
        </button>
      </div>
    </div>
  );
}

export function Onboarding({
  onDone,
}: {
  onDone: (cuidador: string, hijo: string) => void;
}) {
  const lang = useLang();
  const [cuidador, setCuidador] = useState("");
  const [hijo, setHijo] = useState("");

  return (
    <div className="min-h-screen bg-[#E9DECE] flex flex-col justify-between p-6">
      <div className="pt-4">
        <div className="flex justify-end mb-4">
          <BrandLogo />
        </div>
        <h1 className="font-display text-2xl text-[#1E2760] font-normal leading-snug">
          {lang === "es" ? (
            <>
              Bienvenido/a a <span className="font-bold">Standing By</span>
            </>
          ) : (
            <>
              Welcome to <span className="font-bold">Standing By</span>
            </>
          )}
        </h1>
        <p className="text-xs text-[#6B6052] mt-1 leading-relaxed">
          {lang === "es"
            ? "Una compañía para padres y cuidadores que acompañan a sus hijos en momentos de ansiedad. Aquí no estás solo/a."
            : "A companion for parents and caregivers supporting their teenagers through anxiety. You're not alone here."}
        </p>

        <div className="bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl p-5 space-y-4 mt-6">
          <div>
            <label className="block text-xs font-bold text-[#6B6052] uppercase tracking-wide mb-1.5">
              {lang === "es" ? "¿Cómo te llamas?" : "What's your name?"}
            </label>
            <input
              type="text"
              value={cuidador}
              onChange={(e) => setCuidador(e.target.value)}
              placeholder={lang === "es" ? "Tu nombre" : "Your name"}
              className="w-full bg-white border border-[#D4C9B6] rounded-2xl px-4 py-3.5 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#6B6052] uppercase tracking-wide mb-1.5">
              {lang === "es" ? "¿Cómo se llama tu hijo/a?" : "What's your child's name?"}
            </label>
            <input
              type="text"
              value={hijo}
              onChange={(e) => setHijo(e.target.value)}
              placeholder={lang === "es" ? "Su nombre" : "Their name"}
              className="w-full bg-white border border-[#D4C9B6] rounded-2xl px-4 py-3.5 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760]"
            />
          </div>
        </div>
      </div>

      <div className="pt-6">
        <button
          onClick={() =>
            cuidador.trim() &&
            hijo.trim() &&
            onDone(cuidador.trim(), hijo.trim())
          }
          disabled={!cuidador.trim() || !hijo.trim()}
          className="w-full bg-[#1E2760] text-white font-bold py-4 rounded-full active:scale-[0.98] transition-transform disabled:opacity-40 text-sm"
        >
          {lang === "es" ? "Empezar" : "Get started"}
        </button>
      </div>
    </div>
  );
}
