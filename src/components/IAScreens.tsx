import React, { useState, useRef, useEffect } from "react";
import type { Screen, Mensaje, IACategoria } from "../types.ts";
import { useLang } from "../context/LangContext.tsx";
import { T } from "../data/translations.ts";
import {
  getIACategorias,
  getIARespuestas,
  RESPUESTAS_IA,
} from "../data/mockData.ts";
import { BackButton, BottomNav, BrandLogo } from "./Common.tsx";
import { IconBubble, SparklesIcon } from "./AppIcons.tsx";

export function IAEntrada({
  cuidador,
  onNav,
  onSelectCategoria,
  onSetTextoLibre,
}: {
  cuidador: string;
  onNav: (s: Screen) => void;
  onSelectCategoria: (cat: IACategoria) => void;
  onSetTextoLibre: (t: string) => void;
}) {
  const lang = useLang();
  const iaCategorias = getIACategorias(lang);
  const [textoLibre, setTextoLibre] = useState("");

  function handleChat() {
    onSetTextoLibre(textoLibre);
    onNav("ia-chat");
  }

  return (
    <div className="min-h-screen bg-[#E9DECE] pb-28">
      {/* Header */}
      <div className="bg-[#FAF7F2] border-b border-[#D4C9B6] px-5 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <BackButton onBack={() => onNav("home")} />
          <BrandLogo />
        </div>
        <div className="flex items-center gap-3 mt-3">
          <IconBubble tone="indigo" size="md">
            <SparklesIcon className="w-5 h-5 text-[#1E2760]" />
          </IconBubble>
          <div>
            <h1 className="font-display text-2xl text-[#1E2760] font-normal leading-snug">
              {lang === "es" ? (
                <>
                  Compañera <span className="font-bold">IA</span>
                </>
              ) : (
                <>
                  AI <span className="font-bold">Companion</span>
                </>
              )}
            </h1>
            <p className="text-xs text-[#6B6052]">
              {T[lang].ia_sub}, {cuidador || (lang === "es" ? "Familia" : "Family")}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 mt-5 space-y-5">
        <h2 className="font-display text-lg text-[#1E2760] font-normal">
          {lang === "es" ? (
            <>
              ¿Qué está <span className="font-bold">ocurriendo</span>?
            </>
          ) : (
            <>
              What is <span className="font-bold">happening</span>?
            </>
          )}
        </h2>

        {/* 2-column grid of situation cards */}
        <div className="grid grid-cols-2 gap-3">
          {iaCategorias.map((cat, i) => {
            const tones: ("indigo" | "lime" | "warm")[] = [
              "indigo",
              "warm",
              "lime",
              "warm",
              "indigo",
              "lime",
            ];
            const tone = tones[i % tones.length];
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategoria(cat);
                  onNav("ia-respuesta");
                }}
                className="bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl p-4 flex flex-col items-start gap-3 active:scale-[0.98] transition-transform text-left"
              >
                <IconBubble tone={tone} size="md">
                  <SparklesIcon className="w-4 h-4 text-[#1E2760]" />
                </IconBubble>
                <span className="text-xs font-bold text-[#1E2760] leading-snug">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Free text input */}
        <div className="space-y-2">
          <textarea
            value={textoLibre}
            onChange={(e) => setTextoLibre(e.target.value)}
            placeholder={T[lang].ia_free_ph}
            rows={3}
            className="w-full bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl p-4 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760] resize-none"
          />
          <button
            onClick={handleChat}
            disabled={!textoLibre.trim()}
            className="w-full bg-[#1E2760] text-white font-bold py-4 rounded-full active:scale-[0.98] transition-transform disabled:opacity-40 text-sm"
          >
            {T[lang].ia_chat_btn}
          </button>
        </div>
      </div>

      <BottomNav active="home" onNav={onNav} />
    </div>
  );
}

export function IAResp({
  categoria,
  onNav,
  onSiguiente,
}: {
  categoria: IACategoria;
  onNav: (s: Screen) => void;
  onSiguiente: () => void;
}) {
  const lang = useLang();
  const resp =
    getIARespuestas(lang)[categoria.id] ||
    getIARespuestas(lang)["callada"];
  const [guardados, setGuardados] = useState<number[]>([]);

  return (
    <div className="min-h-screen bg-[#E9DECE] pb-28">
      <div className="bg-[#FAF7F2] border-b border-[#D4C9B6] px-5 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <BackButton onBack={() => onNav("ia-entrada")} />
          <BrandLogo />
        </div>
        <h1 className="font-display text-xl text-[#1E2760] font-normal mt-3">
          {resp.titulo}
        </h1>
      </div>

      <div className="px-5 mt-4 space-y-3">
        {resp.sugerencias.map((s, i) => (
          <div
            key={i}
            className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#D4C9B6]"
          >
            <p className="text-xs text-[#1E2760] leading-relaxed mb-3">
              {s}
            </p>
            <button
              onClick={() =>
                setGuardados((prev) =>
                  prev.includes(i) ? prev : [...prev, i],
                )
              }
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors ${
                guardados.includes(i)
                  ? "bg-[#EBF5C5] text-[#1E2760] border border-[#ADCC16]"
                  : "bg-white border border-[#D4C9B6] text-[#6B6052]"
              }`}
            >
              {guardados.includes(i) ? T[lang].ia_saved : T[lang].ia_save}
            </button>
          </div>
        ))}

        <button
          onClick={onSiguiente}
          className="w-full bg-[#1E2760] text-white font-bold py-4 rounded-full active:scale-[0.98] transition-transform mt-2 text-sm"
        >
          {T[lang].ia_follow}
        </button>
      </div>

      <BottomNav active="home" onNav={onNav} />
    </div>
  );
}

export function IAChat({
  cuidador,
  textoLibre,
  categoriaInicial,
  onNav,
}: {
  cuidador: string;
  textoLibre: string;
  categoriaInicial?: IACategoria;
  onNav: (s: Screen) => void;
}) {
  const lang = useLang();
  const [msgs, setMsgs] = useState<Mensaje[]>(() => {
    const init: Mensaje[] = [];
    if (categoriaInicial) {
      init.push({
        role: "ia",
        texto: `${
          lang === "es"
            ? `Hola ${cuidador}. Veo que seleccionaste`
            : `Hello ${cuidador}. I see you selected`
        } "${categoriaInicial.label}". ${RESPUESTAS_IA[lang][0]}`,
      });
    } else if (textoLibre) {
      init.push({ role: "user", texto: textoLibre });
      init.push({ role: "ia", texto: RESPUESTAS_IA[lang][0] });
    } else {
      init.push({
        role: "ia",
        texto:
          lang === "es"
            ? `Hola ${cuidador || "familiar"}. Estoy aquí para orientarte. ¿Qué está sucediendo?`
            : `Hello ${cuidador || "caregiver"}. I am here to guide you. What is happening?`,
      });
    }
    return init;
  });
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  function handleSend() {
    if (!input.trim()) return;
    const userMsg: Mensaje = { role: "user", texto: input };
    const pool = RESPUESTAS_IA[lang];
    const iaMsg: Mensaje = {
      role: "ia",
      texto: pool[Math.floor(Math.random() * pool.length)],
    };
    setMsgs((prev) => [...prev, userMsg, iaMsg]);
    setInput("");
  }

  return (
    <div className="flex flex-col h-screen bg-[#E9DECE]">
      {/* Header */}
      <div className="bg-[#FAF7F2] border-b border-[#D4C9B6] px-5 pt-10 pb-4 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <BackButton onBack={() => onNav("ia-entrada")} />
          <div className="min-w-0">
            <p className="text-sm font-bold text-[#1E2760] truncate">{T[lang].ia_title}</p>
            <p className="text-[11px] text-[#6B6052] truncate">{T[lang].ia_chat_private}</p>
          </div>
        </div>
        <BrandLogo />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {msgs.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[82%] rounded-2xl px-4 py-3.5 ${
                msg.role === "user"
                  ? "bg-[#1E2760] text-white"
                  : "bg-[#FAF7F2] border border-[#D4C9B6] text-[#1E2760]"
              }`}
            >
              <p className="text-xs leading-relaxed">{msg.texto}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="bg-[#FAF7F2] border-t border-[#D4C9B6] p-4 flex gap-2 shrink-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={T[lang].ia_chat_ph}
          className="flex-1 bg-[#F4EFE6] border border-[#D4C9B6] rounded-full px-4 py-3 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760]"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="w-11 h-11 rounded-full bg-[#1E2760] text-white flex items-center justify-center font-bold text-sm shrink-0 active:scale-95 disabled:opacity-40"
        >
          →
        </button>
      </div>
    </div>
  );
}
