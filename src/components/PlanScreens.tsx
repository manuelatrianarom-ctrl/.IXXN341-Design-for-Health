import React, { useState, useRef, useEffect } from "react";
import type { Screen, Ejercicio } from "../types.ts";
import { useLang } from "../context/LangContext.tsx";
import { T } from "../data/translations.ts";
import { getEjercicios } from "../data/mockData.ts";
import { BackButton, BottomNav, BrandLogo } from "./Common.tsx";
import {
  IconBubble,
  WindIcon,
  BodyIcon,
  HandIcon,
  DancingBodyIcon,
  EyeIcon,
  PencilIcon,
  ChatQuotesIcon,
  MusicIcon,
  MoonIcon,
  ChecklistIcon,
  StarLineIcon,
  SenseEyeIcon,
  SenseEarIcon,
  SenseHandIcon,
  SenseNoseIcon,
  SenseMouthIcon,
  QuietSpaceIcon,
  QuietPresenceIcon,
  ValidatePhrasesIcon,
  WalkingIcon,
  WindDownRoutineIcon,
  RegulationSpaceIcon,
  PostEpisodeCheckinIcon,
} from "./AppIcons.tsx";

// Helper to get matching line icon and pastel tone for each exercise
function getEjercicioVisual(e: Ejercicio): {
  icon: React.ReactNode;
  tone: "indigo" | "lime" | "warm";
  duration: string;
} {
  // Interactive detail exercises
  if (e.detalle === "breath") {
    return {
      icon: <WindIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "indigo",
      duration: "5 min",
    };
  }
  if (e.detalle === "muscle") {
    return {
      icon: <BodyIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "warm",
      duration: "10 min",
    };
  }
  if (e.detalle === "grounding") {
    return {
      icon: <HandIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "lime",
      duration: "5 min",
    };
  }
  if (e.detalle === "shake") {
    return {
      icon: <DancingBodyIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "warm",
      duration: "3 min",
    };
  }
  if (e.detalle === "prompt") {
    return {
      icon: <EyeIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "indigo",
      duration: "5 min",
    };
  }
  if (e.detalle === "write") {
    return {
      icon: <PencilIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "lime",
      duration: "5 min",
    };
  }
  if (e.detalle === "phrases") {
    return {
      icon: <ChatQuotesIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "indigo",
      duration: "3 min",
    };
  }
  if (e.detalle === "music") {
    return {
      icon: <MusicIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "warm",
      duration: "10 min",
    };
  }
  if (e.detalle === "silence" || e.icono === "SI" || e.id === 15) {
    return {
      icon: <QuietSpaceIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "indigo",
      duration: "10 min",
    };
  }

  // Downstream action plan activities (from quiet space downwards)
  if (e.icono === "QP" || e.id === 2) {
    return {
      icon: <QuietPresenceIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "warm",
      duration: "10-15 min",
    };
  }
  if (e.icono === "NW" || e.id === 3) {
    return {
      icon: <ValidatePhrasesIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "indigo",
      duration: "5 min",
    };
  }
  if (e.icono === "TN" || e.id === 4) {
    return {
      icon: <WalkingIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "lime",
      duration: "15-20 min",
    };
  }
  if (e.icono === "DR" || e.id === 5) {
    return {
      icon: <WindDownRoutineIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "warm",
      duration: "30 min",
    };
  }
  if (e.icono === "RS" || e.id === 6) {
    return {
      icon: <RegulationSpaceIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "indigo",
      duration: "15 min",
    };
  }
  if (e.icono === "PE" || e.id === 7) {
    return {
      icon: <PostEpisodeCheckinIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "lime",
      duration: "10 min",
    };
  }

  return {
    icon: <ChecklistIcon className="w-5 h-5 text-[#1E2760]" />,
    tone: "warm",
    duration: "5 min",
  };
}

export function PlanList({
  hijo,
  onNav,
  onSelectEjercicio,
}: {
  hijo: string;
  onNav: (s: Screen) => void;
  onSelectEjercicio: (e: Ejercicio) => void;
}) {
  const lang = useLang();
  const [filtro, setFiltro] = useState<
    "todos" | "ahora" | "prevencion" | "despues"
  >("todos");

  const filtros = [
    { key: "todos" as const, label: T[lang].filter_all },
    { key: "ahora" as const, label: T[lang].filter_ahora },
    { key: "prevencion" as const, label: T[lang].filter_prev },
    { key: "despues" as const, label: T[lang].filter_despues },
  ];

  const ejercicios = getEjercicios(lang);
  const ejerciciosFiltrados =
    filtro === "todos"
      ? ejercicios
      : ejercicios.filter((e) => e.categoria === filtro);

  return (
    <div className="min-h-screen bg-[#E9DECE] pb-28">
      {/* Top Header */}
      <div className="bg-[#FAF7F2] border-b border-[#D4C9B6] px-5 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <BackButton onBack={() => onNav("home")} />
          <BrandLogo />
        </div>
        <h1 className="font-display text-2xl text-[#1E2760] font-normal mt-3">
          {lang === "es" ? (
            <>
              Plan de <span className="font-bold">Acción</span>
            </>
          ) : (
            <>
              Action <span className="font-bold">Plan</span>
            </>
          )}
        </h1>
        <p className="text-xs text-[#6B6052] mt-0.5">
          {T[lang].plan_sub} <span className="font-bold text-[#1E2760]">{hijo}</span>
        </p>

        {/* Filter Pills - completely rounded pill shape */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {filtros.map((f) => (
            <button
              key={f.key}
              onClick={() => setFiltro(f.key)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filtro === f.key
                  ? "bg-[#1E2760] text-white"
                  : "bg-[#F4EFE6] text-[#1E2760] border border-[#D4C9B6]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* List matching Image 2 exactly */}
      <div className="px-5 mt-4 space-y-3">
        {ejerciciosFiltrados.map((e, index) => {
          const visual = getEjercicioVisual(e);
          // Highlight first card with pastel lime and lime border if "todos" or first item (Image 2 style)
          const isFeatured = index === 0;

          return (
            <button
              key={e.id}
              onClick={() => {
                onSelectEjercicio(e);
                onNav(
                  e.detalle
                    ? (`plan-${e.detalle}` as Screen)
                    : "plan-detail",
                );
              }}
              className={`w-full rounded-2xl p-4 flex items-center gap-4 transition-transform active:scale-[0.98] text-left ${
                isFeatured
                  ? "bg-[#EBF5C5] border-2 border-[#ADCC16]"
                  : "bg-[#FAF7F2] border border-[#D4C9B6]"
              }`}
            >
              <IconBubble tone={visual.tone} size="lg">
                {visual.icon}
              </IconBubble>
              <div className="flex-1 min-w-0">
                <p className="font-display font-medium text-base text-[#1E2760] leading-snug">
                  {e.titulo}
                </p>
                <p className="text-xs text-[#6B6052] mt-0.5">
                  {visual.duration}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <BottomNav active="home" onNav={onNav} />
    </div>
  );
}

export function PlanDetail({
  ejercicio,
  cuidador,
  onBack,
  onNav,
  onMarcar,
}: {
  ejercicio: Ejercicio;
  cuidador: string;
  onBack: () => void;
  onNav: (s: Screen) => void;
  onMarcar: (id: number) => void;
}) {
  const lang = useLang();
  const [probado, setProbado] = useState(false);
  const visual = getEjercicioVisual(ejercicio);

  function handleProbar() {
    setProbado(true);
    onMarcar(ejercicio.id);
  }

  return (
    <div className="min-h-screen bg-[#E9DECE] pb-10">
      <div className="bg-[#FAF7F2] border-b border-[#D4C9B6] px-5 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <BackButton onBack={onBack} />
          <BrandLogo />
        </div>
        <div className="flex items-center gap-3 mt-4">
          <IconBubble tone={visual.tone} size="lg">
            {visual.icon}
          </IconBubble>
          <div>
            <h1 className="font-display text-xl text-[#1E2760] font-normal leading-snug">
              {ejercicio.titulo}
            </h1>
            <p className="text-xs text-[#6B6052]">
              {visual.duration}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 mt-5 space-y-4">
        {ejercicio.detalle && (
          <button
            onClick={() =>
              onNav(`plan-${ejercicio.detalle}` as Screen)
            }
            className="w-full bg-[#1E2760] text-white font-bold py-4 rounded-full active:scale-[0.98] transition-transform text-sm"
          >
            {lang === "es" ? "Iniciar ejercicio guiado" : "Start guided exercise"}
          </button>
        )}

        {/* Steps */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-[#6B6052] uppercase tracking-wider">
            {lang === "es" ? "Pasos sugeridos" : "Suggested steps"}
          </p>
          {ejercicio.pasos.map((paso, i) => (
            <div
              key={i}
              className="bg-[#FAF7F2] rounded-2xl p-4 flex gap-3 border border-[#D4C9B6]"
            >
              <span className="w-6 h-6 rounded-full bg-[#DDE2F5] text-[#1E2760] text-xs font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <p className="text-xs text-[#1E2760] leading-relaxed flex-1">
                {paso.replace("[cuidador]", cuidador || (lang === "es" ? "cuidador/a" : "caregiver"))}
              </p>
            </div>
          ))}
        </div>

        {/* Mark tested button */}
        <button
          onClick={handleProbar}
          disabled={probado}
          className={`w-full py-4 rounded-full font-bold text-sm transition-all ${
            probado
              ? "bg-[#EBF5C5] text-[#1E2760] border-2 border-[#ADCC16]"
              : "bg-[#FAF7F2] text-[#1E2760] border border-[#D4C9B6] active:scale-[0.98]"
          }`}
        >
          {probado
            ? lang === "es"
              ? "✓ Probado"
              : "✓ Tried"
            : lang === "es"
            ? "Marcar como probado"
            : "Mark as tried"}
        </button>
      </div>
    </div>
  );
}

// ─── Interactive sub-screens ──────────────────────────────────────────────────

export function PlanBreath({
  ejercicio,
  onBack,
  onMarcar,
}: {
  ejercicio: Ejercicio;
  onBack: () => void;
  onMarcar: (id: number) => void;
}) {
  const lang = useLang();
  const [running, setRunning] = useState(false);
  const [fase, setFase] = useState<"inhala" | "sosten" | "exhala">("inhala");
  const [secsLeft, setSecsLeft] = useState(4);
  const [ciclo, setCiclo] = useState(1);
  const [completado, setCompletado] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fases = {
    inhala: { dur: 4, next: "sosten" as const, label: T[lang].breath_inhale },
    sosten: { dur: 7, next: "exhala" as const, label: T[lang].breath_hold },
    exhala: { dur: 8, next: "inhala" as const, label: T[lang].breath_exhale },
  };

  useEffect(() => {
    if (!running) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setSecsLeft((prev) => {
        if (prev > 1) return prev - 1;
        setFase((currFase) => {
          const next = fases[currFase].next;
          if (currFase === "exhala") {
            setCiclo((c) => {
              if (c >= 4) {
                setRunning(false);
                setCompletado(true);
                onMarcar(ejercicio.id);
                return c;
              }
              return c + 1;
            });
          }
          setSecsLeft(fases[next].dur);
          return next;
        });
        return 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [running]);

  function toggleRun() {
    if (completado) {
      setCiclo(1);
      setFase("inhala");
      setSecsLeft(4);
      setCompletado(false);
    }
    setRunning((r) => !r);
  }

  return (
    <div className="min-h-screen bg-[#E9DECE] flex flex-col justify-between p-6">
      <div>
        <div className="flex items-center justify-between">
          <BackButton onBack={onBack} />
          <BrandLogo />
        </div>
        <h1 className="font-display text-2xl text-[#1E2760] font-normal mt-4">
          {lang === "es" ? (
            <>
              Respiración <span className="font-bold">4-7-8</span>
            </>
          ) : (
            <>
              Respiration <span className="font-bold">4-7-8</span>
            </>
          )}
        </h1>
        <p className="text-xs text-[#6B6052] mt-1">{T[lang].breath_sub}</p>
      </div>

      <div className="flex flex-col items-center justify-center my-8">
        <div className="relative w-56 h-56 flex items-center justify-center">
          {/* Breathing expanding/contracting circle */}
          <div
            className={`absolute inset-0 rounded-full border-2 transition-all ${
              running
                ? fase === "inhala"
                  ? "scale-140 bg-[#EBF5C5] border-[#ADCC16] duration-[4000ms] ease-out"
                  : fase === "sosten"
                  ? "scale-100 bg-[#DDE2F5] border-[#1E2760] duration-500 ease-in-out"
                  : "scale-70 bg-[#FAF7F2] border-[#D4C9B6] duration-[8000ms] ease-in-out"
                : "scale-100 bg-[#FAF7F2] border-[#D4C9B6] duration-500 ease-in-out"
            }`}
          />
          <div className="relative z-10 text-center pointer-events-none">
            <p className="text-xs font-bold uppercase tracking-wider text-[#6B6052]">
              {fases[fase].label}
            </p>
            {/* Big bold number in indigo */}
            <div className="text-6xl font-bold text-[#1E2760] my-2 font-sans">
              {secsLeft}
            </div>
            <p className="text-xs text-[#6B6052]">
              {T[lang].act_cycle} <span className="font-bold text-[#1E2760]">{ciclo} {T[lang].act_of} 4</span>
            </p>
          </div>
        </div>

        {completado && (
          <p className="text-xs font-bold text-[#1E2760] bg-[#EBF5C5] border border-[#ADCC16] px-4 py-1.5 rounded-full mt-6">
            {lang === "es" ? "¡Ejercicio completado con éxito!" : "Exercise successfully completed!"}
          </p>
        )}
      </div>

      <button
        onClick={toggleRun}
        className="w-full bg-[#1E2760] text-white font-bold py-4 rounded-full active:scale-[0.98] transition-transform text-sm"
      >
        {running
          ? T[lang].act_pause
          : completado
          ? lang === "es"
            ? "Repetir"
            : "Repeat"
          : T[lang].act_start}
      </button>
    </div>
  );
}

export function PlanMuscle({
  ejercicio,
  onBack,
  onMarcar,
}: {
  ejercicio: Ejercicio;
  onBack: () => void;
  onMarcar: (id: number) => void;
}) {
  const lang = useLang();
  const rawGroups = T[lang].muscle_groups;
  const descGroups = [
    {
      accion:
        lang === "es"
          ? "Aprieta los dedos de los pies hacia abajo contra el suelo durante 5 segundos."
          : "Curl your toes tightly downward toward the ground for 5 seconds.",
      relajar:
        lang === "es"
          ? "Suelta completamente y siente el alivio y la calma en los pies."
          : "Release completely and notice the relaxation in your feet.",
    },
    {
      accion:
        lang === "es"
          ? "Tensa las pantorrillas y muslos con firmeza."
          : "Tense your calves and thighs firmly.",
      relajar:
        lang === "es"
          ? "Suelta la tensión y respira con calma."
          : "Release the tension and breathe calmly.",
    },
    {
      accion:
        lang === "es"
          ? "Aprieta el abdomen como si fueras a recibir un impacto."
          : "Tighten your stomach muscles firmly.",
      relajar:
        lang === "es"
          ? "Suelta suavemente y siente tu respiración expandirse."
          : "Gently release and feel your breathing expand.",
    },
    {
      accion:
        lang === "es"
          ? "Cierra los puños con fuerza apretando las manos."
          : "Clench your fists tightly.",
      relajar:
        lang === "es"
          ? "Abre los dedos y deja caer las manos sobre tus piernas."
          : "Open your fingers and rest your hands relaxed.",
    },
    {
      accion:
        lang === "es"
          ? "Sube los hombros hacia las orejas contrayendo fuerte."
          : "Shrug your shoulders up to your ears.",
      relajar:
        lang === "es"
          ? "Deja caer los hombros hacia abajo sintiendo la pesadez agradable."
          : "Drop your shoulders down and let go of all weight.",
    },
    {
      accion:
        lang === "es"
          ? "Arruga la frente y aprieta los ojos con suavidad."
          : "Gently scrunch your forehead and eyes.",
      relajar:
        lang === "es"
          ? "Suaviza el rostro por completo, entrecejo y mandíbula."
          : "Soften your entire face, brow, and jaw.",
    },
  ];

  const grupos = rawGroups.map((nombre, i) => ({
    nombre,
    accion: descGroups[i]?.accion || "",
    relajar: descGroups[i]?.relajar || "",
  }));

  const [idx, setIdx] = useState(0);
  const [fase, setFase] = useState<"tensar" | "soltar">("tensar");
  const [timerCount, setTimerCount] = useState(1);
  const [listo, setListo] = useState(false);

  // Timer increments 1, 2, 3, 4, 5...
  useEffect(() => {
    if (listo) return;
    const interval = setInterval(() => {
      setTimerCount((t) => {
        if (t >= 5) {
          // Auto transition after 5s or user can click Siguiente anytime
          if (fase === "tensar") {
            setFase("soltar");
            return 1;
          } else {
            if (idx < grupos.length - 1) {
              setIdx((i) => i + 1);
              setFase("tensar");
              return 1;
            } else {
              setListo(true);
              onMarcar(ejercicio.id);
              return 5;
            }
          }
        }
        return t + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [fase, idx, listo, grupos.length, ejercicio.id, onMarcar]);

  function handleNext() {
    setTimerCount(1);
    if (fase === "tensar") {
      setFase("soltar");
    } else {
      if (idx < grupos.length - 1) {
        setIdx((i) => i + 1);
        setFase("tensar");
      } else {
        setListo(true);
        onMarcar(ejercicio.id);
      }
    }
  }

  const g = grupos[idx] || grupos[0];

  return (
    <div className="min-h-screen bg-[#E9DECE] flex flex-col justify-between p-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <BackButton onBack={onBack} />
        <BrandLogo />
      </div>

      {/* Main Container styled exactly as image.png */}
      <div className="flex flex-col items-center justify-center my-auto">
        {/* 6 pagination dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {grupos.map((_, i) => (
            <span
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === idx ? "bg-[#1E2760]" : "bg-[#D4C9B6]"
              }`}
            />
          ))}
        </div>

        {/* Group Name in spaced uppercase */}
        <p className="text-xs font-bold text-[#6B6052] uppercase tracking-[0.25em] text-center mb-6">
          {g.nombre}
        </p>

        {/* Circular Dial with orange border matching image.png */}
        <div className="w-56 h-56 rounded-full bg-[#FFF9EE] border-[3.5px] border-[#F28B20] flex flex-col items-center justify-center text-center">
          <span className="font-bold text-xl text-[#1E2760] font-sans">
            {fase === "tensar"
              ? lang === "es"
                ? "Tensa"
                : "Tense"
              : lang === "es"
              ? "Suelta"
              : "Release"}
          </span>
          <span className="font-display text-4xl font-bold text-[#1E2760] mt-1">
            {timerCount}
          </span>
        </div>

        {/* Siguiente link matching image.png */}
        {!listo ? (
          <button
            onClick={handleNext}
            className="text-xs font-bold text-[#1E2760] underline underline-offset-4 active:opacity-70 mt-6 inline-block"
          >
            {lang === "es" ? "Siguiente →" : "Next →"}
          </button>
        ) : (
          <div className="mt-6 text-center">
            <span className="text-xs font-bold text-[#1E2760] bg-[#EBF5C5] border border-[#ADCC16] px-4 py-1.5 rounded-full inline-block">
              {lang === "es" ? "✓ Relajación completada" : "✓ Relaxation completed"}
            </span>
          </div>
        )}

        {/* Supporting description */}
        <p className="text-xs text-[#6B6052] text-center max-w-xs mt-6 leading-relaxed">
          {fase === "tensar" ? g.accion : g.relajar}
        </p>
      </div>

      {/* Bottom Button */}
      <button
        onClick={listo ? onBack : handleNext}
        className="w-full bg-[#1E2760] text-white font-bold py-4 rounded-full active:scale-[0.98] transition-transform text-sm"
      >
        {listo
          ? lang === "es"
            ? "Volver al plan"
            : "Back to plan"
          : lang === "es"
          ? "Continuar"
          : "Continue"}
      </button>
    </div>
  );
}

export function PlanShake({
  ejercicio,
  onBack,
  onMarcar,
}: {
  ejercicio: Ejercicio;
  onBack: () => void;
  onMarcar: (id: number) => void;
}) {
  const lang = useLang();
  const [secs, setSecs] = useState(60);
  const [activo, setActivo] = useState(false);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!activo) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setSecs((s) => {
        if (s <= 1) {
          setActivo(false);
          setDone(true);
          onMarcar(ejercicio.id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activo]);

  return (
    <div className="min-h-screen bg-[#E9DECE] flex flex-col justify-between p-6">
      <div>
        <div className="flex items-center justify-between">
          <BackButton onBack={onBack} />
          <BrandLogo />
        </div>
        <h1 className="font-display text-2xl text-[#1E2760] font-normal mt-4">
          {lang === "es" ? (
            <>
              Sacudir el <span className="font-bold">cuerpo</span>
            </>
          ) : (
            <>
              Shake your <span className="font-bold">body</span>
            </>
          )}
        </h1>
        <p className="text-xs text-[#6B6052] mt-1">{T[lang].shake_sub}</p>
      </div>

      <div className="flex flex-col items-center justify-center my-8">
        <IconBubble tone="warm" size="xl" className="mb-4">
          <DancingBodyIcon className="w-8 h-8 text-[#1E2760]" />
        </IconBubble>
        <div className="text-6xl font-bold text-[#1E2760] my-2 font-sans">
          {secs}s
        </div>
        <p className="text-xs text-[#6B6052] text-center max-w-xs mt-2">
          {done
            ? T[lang].shake_done
            : lang === "es"
            ? "Sacude con suavidad brazos y piernas para liberar tensión."
            : "Gently shake your arms and legs to release tension."}
        </p>
      </div>

      <button
        onClick={() => setActivo((a) => !a)}
        className="w-full bg-[#1E2760] text-white font-bold py-4 rounded-full active:scale-[0.98] transition-transform text-sm"
      >
        {activo
          ? T[lang].act_pause
          : done
          ? lang === "es"
            ? "Repetir"
            : "Repeat"
          : T[lang].act_start}
      </button>
    </div>
  );
}

export function PlanGrounding({
  ejercicio,
  onBack,
  onMarcar,
}: {
  ejercicio: Ejercicio;
  onBack: () => void;
  onMarcar: (id: number) => void;
}) {
  const lang = useLang();
  const rawSteps = T[lang].ground_steps;
  const icons = [
    <SenseEyeIcon className="w-5 h-5 text-[#1E2760]" />,
    <SenseHandIcon className="w-5 h-5 text-[#1E2760]" />,
    <SenseEarIcon className="w-5 h-5 text-[#1E2760]" />,
    <SenseNoseIcon className="w-5 h-5 text-[#1E2760]" />,
    <SenseMouthIcon className="w-5 h-5 text-[#1E2760]" />,
  ];
  const tones: ("indigo" | "warm" | "lime")[] = [
    "indigo",
    "warm",
    "lime",
    "warm",
    "indigo",
  ];

  const pasos = rawSteps.map((s, idx) => ({
    num: s.n,
    icon: icons[idx],
    tone: tones[idx],
    titulo: s.sentido.replace(/[^\w\sáéíóúÁÉÍÓÚñÑ]/g, "").trim(),
    desc: s.prompt,
  }));

  const [step, setStep] = useState(0);

  function handleNext() {
    if (step < pasos.length - 1) {
      setStep((s) => s + 1);
    } else {
      onMarcar(ejercicio.id);
    }
  }

  const p = pasos[step];

  return (
    <div className="min-h-screen bg-[#E9DECE] flex flex-col justify-between p-6">
      <div>
        <div className="flex items-center justify-between">
          <BackButton onBack={onBack} />
          <BrandLogo />
        </div>
        <h1 className="font-display text-2xl text-[#1E2760] font-normal mt-4">
          Grounding <span className="font-bold">5-4-3-2-1</span>
        </h1>
        <p className="text-xs text-[#6B6052] mt-1">{T[lang].ground_title}</p>
      </div>

      <div className="bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl p-6 text-center my-6">
        <IconBubble tone={p.tone} size="xl" className="mx-auto mb-4">
          {p.icon}
        </IconBubble>
        <div className="text-4xl font-bold text-[#1E2760] font-sans mb-1">
          {p.num}
        </div>
        <h2 className="font-display text-xl text-[#1E2760] font-bold mb-2">
          {p.titulo}
        </h2>
        <p className="text-xs text-[#6B6052] leading-relaxed max-w-xs mx-auto">
          {p.desc}
        </p>
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-[#1E2760] text-white font-bold py-4 rounded-full active:scale-[0.98] transition-transform text-sm"
      >
        {step < pasos.length - 1 ? T[lang].act_next : T[lang].act_finish}
      </button>
    </div>
  );
}

export function PlanPrompt({
  ejercicio,
  onBack,
  onMarcar,
}: {
  ejercicio: Ejercicio;
  onBack: () => void;
  onMarcar: (id: number) => void;
}) {
  const lang = useLang();
  const prompts = [
    T[lang].describe_prompt,
    lang === "es"
      ? "¿Qué colores y texturas captan tu atención ahora mismo?"
      : "What colors and textures catch your attention right now?",
    lang === "es"
      ? "Nota tres detalles en este espacio que no habías observado antes."
      : "Notice three details in this space you hadn't observed before.",
    lang === "es"
      ? "Observa la luz y cómo entra en la habitación."
      : "Observe the light and how it fills the room.",
  ];
  const [idx, setIdx] = useState(0);

  function handleNext() {
    if (idx < prompts.length - 1) {
      setIdx((i) => i + 1);
    } else {
      onMarcar(ejercicio.id);
    }
  }

  return (
    <div className="min-h-screen bg-[#E9DECE] flex flex-col justify-between p-6">
      <div>
        <div className="flex items-center justify-between">
          <BackButton onBack={onBack} />
          <BrandLogo />
        </div>
        <h1 className="font-display text-2xl text-[#1E2760] font-normal mt-4">
          {lang === "es" ? (
            <>
              Describir el <span className="font-bold">entorno</span>
            </>
          ) : (
            <>
              Describe your <span className="font-bold">surroundings</span>
            </>
          )}
        </h1>
        <p className="text-xs text-[#6B6052] mt-1">{T[lang].describe_sub}</p>
      </div>

      <div className="bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl p-6 text-center my-6">
        <IconBubble tone="indigo" size="xl" className="mx-auto mb-4">
          <EyeIcon className="w-7 h-7 text-[#1E2760]" />
        </IconBubble>
        <p className="text-sm font-medium text-[#1E2760] leading-relaxed">
          "{prompts[idx]}"
        </p>
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-[#1E2760] text-white font-bold py-4 rounded-full active:scale-[0.98] transition-transform text-sm"
      >
        {idx < prompts.length - 1 ? T[lang].act_next : T[lang].act_finish}
      </button>
    </div>
  );
}

export function PlanWrite({
  ejercicio,
  onBack,
  onMarcar,
}: {
  ejercicio: Ejercicio;
  onBack: () => void;
  onMarcar: (id: number) => void;
}) {
  const lang = useLang();
  const [texto, setTexto] = useState("");
  const [guardado, setGuardado] = useState(false);

  function handleGuardar() {
    setGuardado(true);
    onMarcar(ejercicio.id);
  }

  return (
    <div className="min-h-screen bg-[#E9DECE] flex flex-col justify-between p-6">
      <div>
        <div className="flex items-center justify-between">
          <BackButton onBack={onBack} />
          <BrandLogo />
        </div>
        <h1 className="font-display text-2xl text-[#1E2760] font-normal mt-4">
          {lang === "es" ? (
            <>
              Escribir <span className="font-bold">sin filtro</span>
            </>
          ) : (
            <>
              Write <span className="font-bold">without a filter</span>
            </>
          )}
        </h1>
        <p className="text-xs text-[#6B6052] mt-1">{T[lang].write_sub}</p>

        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder={T[lang].write_ph}
          rows={7}
          className="w-full bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl p-4 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760] mt-4 resize-none"
        />
      </div>

      <button
        onClick={handleGuardar}
        disabled={!texto.trim() || guardado}
        className={`w-full py-4 rounded-full font-bold text-sm transition-all ${
          guardado
            ? "bg-[#EBF5C5] text-[#1E2760] border-2 border-[#ADCC16]"
            : "bg-[#1E2760] text-white active:scale-[0.98] disabled:opacity-40"
        }`}
      >
        {guardado ? T[lang].save : T[lang].save}
      </button>
    </div>
  );
}

export function PlanPhrases({
  ejercicio,
  onBack,
  onMarcar,
}: {
  ejercicio: Ejercicio;
  onBack: () => void;
  onMarcar: (id: number) => void;
}) {
  const lang = useLang();
  const [favs, setFavs] = useState<number[]>([]);

  const frases = T[lang].phrases_list;

  function toggleFav(i: number) {
    setFavs((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );
    onMarcar(ejercicio.id);
  }

  return (
    <div className="min-h-screen bg-[#E9DECE] pb-10 p-6">
      <div className="flex items-center justify-between">
        <BackButton onBack={onBack} />
        <BrandLogo />
      </div>
      <h1 className="font-display text-2xl text-[#1E2760] font-normal mt-4">
        {lang === "es" ? (
          <>
            Frases de <span className="font-bold">calma compartida</span>
          </>
        ) : (
          <>
            Calm <span className="font-bold">phrases to share</span>
          </>
        )}
      </h1>
      <p className="text-xs text-[#6B6052] mt-1 mb-6">{T[lang].phrases_sub}</p>

      <div className="space-y-3">
        {frases.map((frase, i) => {
          const isFav = favs.includes(i);
          return (
            <div
              key={i}
              className={`rounded-2xl p-4 border flex items-center justify-between transition-all ${
                isFav
                  ? "bg-[#EBF5C5] border-[#ADCC16]"
                  : "bg-[#FAF7F2] border-[#D4C9B6]"
              }`}
            >
              <p className="text-xs font-medium text-[#1E2760] leading-relaxed pr-3">
                "{frase}"
              </p>
              <button
                onClick={() => toggleFav(i)}
                aria-label="Guardar frase"
                className="w-9 h-9 rounded-full bg-white border border-[#D4C9B6] flex items-center justify-center shrink-0 active:scale-95"
              >
                <StarLineIcon filled={isFav} className="w-4 h-4 text-[#1E2760]" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PlanMusic({
  ejercicio,
  onBack,
  onMarcar,
}: {
  ejercicio: Ejercicio;
  onBack: () => void;
  onMarcar: (id: number) => void;
}) {
  const lang = useLang();
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    setPlaying((p) => !p);
    onMarcar(ejercicio.id);
  }

  return (
    <div className="min-h-screen bg-[#E9DECE] flex flex-col justify-between p-6">
      <div>
        <div className="flex items-center justify-between">
          <BackButton onBack={onBack} />
          <BrandLogo />
        </div>
        <h1 className="font-display text-2xl text-[#1E2760] font-normal mt-4">
          {lang === "es" ? (
            <>
              Música <span className="font-bold">calmante</span>
            </>
          ) : (
            <>
              Calming <span className="font-bold">music</span>
            </>
          )}
        </h1>
        <p className="text-xs text-[#6B6052] mt-1">
          {lang === "es"
            ? "Música suave para reducir la activación"
            : "Gentle music to ease anxiety"}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center my-8">
        <IconBubble tone="warm" size="xl" className="mb-4">
          <MusicIcon className="w-8 h-8 text-[#1E2760]" />
        </IconBubble>
        <p className="text-sm font-semibold text-[#1E2760]">
          {playing
            ? lang === "es"
              ? "Reproduciendo ambiente de calma"
              : "Playing calming ambient"
            : lang === "es"
            ? "En pausa"
            : "Paused"}
        </p>
      </div>

      <button
        onClick={handlePlay}
        className="w-full bg-[#1E2760] text-white font-bold py-4 rounded-full active:scale-[0.98] transition-transform text-sm"
      >
        {playing ? T[lang].act_pause : T[lang].act_start}
      </button>
    </div>
  );
}

export function PlanSilence({
  ejercicio,
  onBack,
  onMarcar,
}: {
  ejercicio: Ejercicio;
  onBack: () => void;
  onMarcar: (id: number) => void;
}) {
  const lang = useLang();
  const [secs, setSecs] = useState(300); // 5 min
  const [activo, setActivo] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!activo) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setSecs((s) => {
        if (s <= 1) {
          setActivo(false);
          onMarcar(ejercicio.id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activo]);

  const mins = Math.floor(secs / 60);
  const remSecs = secs % 60;

  return (
    <div className="min-h-screen bg-[#E9DECE] flex flex-col justify-between p-6">
      <div>
        <div className="flex items-center justify-between">
          <BackButton onBack={onBack} />
          <BrandLogo />
        </div>
        <h1 className="font-display text-2xl text-[#1E2760] font-normal mt-4">
          {lang === "es" ? (
            <>
              Espacio de <span className="font-bold">silencio</span>
            </>
          ) : (
            <>
              Quiet <span className="font-bold">space</span>
            </>
          )}
        </h1>
        <p className="text-xs text-[#6B6052] mt-1">{T[lang].silence_sub}</p>
      </div>

      <div className="flex flex-col items-center justify-center my-8">
        <IconBubble tone="indigo" size="xl" className="mb-4">
          <QuietSpaceIcon className="w-8 h-8 text-[#1E2760]" />
        </IconBubble>
        <div className="text-6xl font-bold text-[#1E2760] font-sans my-2">
          {mins}:{remSecs < 10 ? `0${remSecs}` : remSecs}
        </div>
      </div>

      <button
        onClick={() => setActivo((a) => !a)}
        className="w-full bg-[#1E2760] text-white font-bold py-4 rounded-full active:scale-[0.98] transition-transform text-sm"
      >
        {activo ? T[lang].act_pause : T[lang].act_start}
      </button>
    </div>
  );
}
