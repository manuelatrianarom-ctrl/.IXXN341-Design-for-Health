import React, { useState } from "react";
import { useLang } from "../context/LangContext.tsx";
import { T } from "../data/translations.ts";
import { BackButton, BrandLogo } from "./Common.tsx";

export function Login({
  onLogin,
  onRegister,
}: {
  onLogin: () => void;
  onRegister: () => void;
}) {
  const lang = useLang();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen bg-[#E9DECE] flex flex-col justify-between py-10 px-6">
      <div>
        <div className="flex justify-end mb-6">
          <BrandLogo />
        </div>
        <h1 className="font-display text-2xl text-[#1E2760] font-normal leading-snug">
          {lang === "es" ? (
            <>
              Bienvenido de <span className="font-bold">vuelta</span>
            </>
          ) : (
            <>
              Welcome <span className="font-bold">back</span>
            </>
          )}
        </h1>
        <p className="text-xs text-[#6B6052] mt-1">
          {T[lang].login_sub}
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#6B6052] uppercase tracking-wide mb-1.5">
              {T[lang].email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              className="w-full bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl px-4 py-3.5 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6B6052] uppercase tracking-wide mb-1.5">
              {T[lang].password}
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl px-4 py-3.5 pr-12 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760]"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#6B6052]"
              >
                {showPass ? "–" : "○"}
              </button>
            </div>
          </div>

          <button className="text-xs font-semibold text-[#1E2760] underline underline-offset-2 block text-right w-full">
            {T[lang].forgot}
          </button>
        </div>
      </div>

      <div className="space-y-3 pt-6">
        <button
          onClick={onLogin}
          className="w-full bg-[#1E2760] text-white font-bold py-4 rounded-full active:scale-[0.98] transition-transform text-sm"
        >
          {T[lang].login_btn}
        </button>

        <button
          onClick={onRegister}
          className="w-full bg-[#FAF7F2] border border-[#D4C9B6] text-[#1E2760] font-bold py-4 rounded-full active:scale-[0.98] transition-transform text-sm"
        >
          {T[lang].no_account}
        </button>
      </div>
    </div>
  );
}

export function Registro({
  onDone,
  onBack,
}: {
  onDone: () => void;
  onBack: () => void;
}) {
  const lang = useLang();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="min-h-screen bg-[#E9DECE] flex flex-col justify-between py-10 px-6">
      <div>
        <div className="flex items-center justify-between">
          <BackButton onBack={onBack} />
          <BrandLogo />
        </div>
        <h1 className="font-display text-2xl text-[#1E2760] font-normal leading-snug mt-4">
          {lang === "es" ? (
            <>
              Crea tu <span className="font-bold">cuenta</span>
            </>
          ) : (
            <>
              Create your <span className="font-bold">account</span>
            </>
          )}
        </h1>
        <p className="text-xs text-[#6B6052] mt-1">
          {T[lang].register_sub}
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#6B6052] uppercase tracking-wide mb-1.5">
              {lang === "es" ? "Nombre completo" : "Full name"}
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="María García"
              className="w-full bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl px-4 py-3.5 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6B6052] uppercase tracking-wide mb-1.5">
              {T[lang].email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              className="w-full bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl px-4 py-3.5 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6B6052] uppercase tracking-wide mb-1.5">
              {T[lang].password}
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl px-4 py-3.5 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760]"
            />
          </div>
        </div>
      </div>

      <div className="pt-6">
        <button
          onClick={onDone}
          disabled={!nombre.trim() || !email.trim() || !pass.trim()}
          className="w-full bg-[#1E2760] text-white font-bold py-4 rounded-full active:scale-[0.98] transition-transform disabled:opacity-40 text-sm"
        >
          {lang === "es" ? "Continuar" : "Continue"}
        </button>
      </div>
    </div>
  );
}
