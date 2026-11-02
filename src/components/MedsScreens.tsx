import React, { useState } from "react";
import type { Screen, Medicamento, Cita, Nota } from "../types.ts";
import { useLang } from "../context/LangContext.tsx";
import { T } from "../data/translations.ts";
import { now, formatDate } from "../utils/helpers.ts";
import { BackButton, BottomNav, BrandLogo } from "./Common.tsx";
import {
  IconBubble,
  PillIcon,
  CalendarIcon,
  NoteIcon,
} from "./AppIcons.tsx";

export function CoordinarModal({
  onClose,
  onSelectMed,
  onSelectCita,
  onSelectNota,
}: {
  onClose: () => void;
  onSelectMed: () => void;
  onSelectCita: () => void;
  onSelectNota: () => void;
}) {
  const lang = useLang();
  const opciones = [
    {
      icon: <PillIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "indigo" as const,
      titulo: T[lang].coord_med,
      desc: T[lang].coord_med_desc,
      action: onSelectMed,
    },
    {
      icon: <CalendarIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "lime" as const,
      titulo: T[lang].coord_cita,
      desc: T[lang].coord_cita_desc,
      action: onSelectCita,
    },
    {
      icon: <NoteIcon className="w-5 h-5 text-[#1E2760]" />,
      tone: "warm" as const,
      titulo: T[lang].coord_nota,
      desc: T[lang].coord_nota_desc,
      action: onSelectNota,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end"
      style={{ background: "rgba(30,39,96,0.4)" }}
    >
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative bg-[#FAF7F2] border-t border-[#D4C9B6] rounded-t-3xl overflow-hidden pb-8">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1.5 bg-[#D4C9B6] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4C9B6]">
          <div>
            <h2 className="font-display text-xl text-[#1E2760] font-normal">
              {lang === "es" ? (
                <>
                  Coordinar <span className="font-bold">cuidado</span>
                </>
              ) : (
                <>
                  Coordinate <span className="font-bold">care</span>
                </>
              )}
            </h2>
            <p className="text-xs text-[#6B6052] mt-0.5">
              {T[lang].coordinar_sub}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="w-8 h-8 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#1E2760] text-sm font-bold active:scale-90"
          >
            ✕
          </button>
        </div>

        {/* Options */}
        <div className="px-5 py-3 space-y-2">
          {opciones.map((op) => (
            <button
              key={op.titulo}
              onClick={op.action}
              className="w-full flex items-center gap-4 bg-white border border-[#D4C9B6] rounded-2xl p-4 active:scale-[0.98] transition-transform text-left"
            >
              <IconBubble tone={op.tone} size="lg">
                {op.icon}
              </IconBubble>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-[#1E2760]">
                  {op.titulo}
                </p>
                <p className="text-xs text-[#6B6052] mt-0.5 leading-snug">
                  {op.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Cancel */}
        <div className="px-5 pt-2">
          <button
            onClick={onClose}
            className="w-full py-3.5 text-xs font-bold text-[#6B6052] border border-[#D4C9B6] rounded-full bg-[#FAF7F2] active:scale-95"
          >
            {T[lang].coordinar_cancel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function MedsMain({
  hijo,
  onNav,
  meds,
  setMeds,
  citas,
  notasRapidas,
}: {
  hijo: string;
  onNav: (s: Screen) => void;
  meds: Medicamento[];
  setMeds: (m: Medicamento[]) => void;
  citas: Cita[];
  notasRapidas: Nota[];
}) {
  const lang = useLang();
  const [showModal, setShowModal] = useState(false);

  function toggleTomado(id: number) {
    setMeds(
      meds.map((m) =>
        m.id === id
          ? {
              ...m,
              tomadoHoy: !m.tomadoHoy,
              horaRegistro: !m.tomadoHoy ? now(lang) : undefined,
            }
          : m,
      ),
    );
  }

  function formatFechaCita(fechaStr: string) {
    const [y, m, d] = fechaStr.split("-");
    const date = new Date(Number(y), Number(m) - 1, Number(d));
    return date.toLocaleDateString(lang === "es" ? "es-MX" : "en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  }

  const takenCount = meds.filter((m) => m.tomadoHoy).length;

  return (
    <div className="min-h-screen bg-[#E9DECE] pb-28">
      {/* Header */}
      <div className="bg-[#FAF7F2] border-b border-[#D4C9B6] px-5 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <BackButton onBack={() => onNav("home")} />
          <BrandLogo />
        </div>
        <h1 className="font-display text-2xl text-[#1E2760] font-normal mt-3">
          {lang === "es" ? (
            <>
              Medicamentos de <span className="font-bold">{hijo || "tu adolescente"}</span>
            </>
          ) : (
            <>
              Medications for <span className="font-bold">{hijo || "your teen"}</span>
            </>
          )}
        </h1>
        <p className="text-xs text-[#6B6052] mt-0.5">
          {takenCount} de {meds.length} tomas registradas hoy
        </p>
      </div>

      <div className="px-5 mt-4 space-y-5">
        {/* Medicamentos Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-[#6B6052] uppercase tracking-wider">
              {T[lang].meds_title}
            </p>
            <button
              onClick={() => onNav("meds-history")}
              className="text-xs font-bold text-[#1E2760] underline underline-offset-2"
            >
              {T[lang].meds_history_link}
            </button>
          </div>

          {meds.length === 0 && (
            <div className="bg-[#FAF7F2] rounded-2xl p-6 text-center border border-[#D4C9B6]">
              <p className="text-xs text-[#6B6052]">
                {T[lang].meds_empty}
              </p>
            </div>
          )}

          {meds.map((med) => (
            <div
              key={med.id}
              className={`rounded-2xl p-4 border flex items-center gap-3.5 transition-colors ${
                med.tomadoHoy
                  ? "bg-[#EBF5C5] border-[#ADCC16]"
                  : "bg-[#FAF7F2] border-[#D4C9B6]"
              }`}
            >
              {/* Toggle switch with pill shape */}
              <button
                onClick={() => toggleTomado(med.id)}
                aria-label="Registrar toma"
                className={`shrink-0 w-12 h-7 rounded-full p-1 transition-colors ${
                  med.tomadoHoy ? "bg-[#ADCC16]" : "bg-[#D4C9B6]"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    med.tomadoHoy ? "translate-x-5" : ""
                  }`}
                />
              </button>

              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-[#1E2760]">
                  {med.nombre}
                </p>
                <p className="text-xs text-[#6B6052]">
                  {med.dosis} · {med.horario}
                </p>
                {med.tomadoHoy && med.horaRegistro && (
                  <p className="text-[11px] text-[#1E2760] font-bold mt-0.5">
                    ✓ {T[lang].taken_at} {med.horaRegistro}
                  </p>
                )}
              </div>

              <IconBubble tone={med.tomadoHoy ? "lime" : "warm"} size="md">
                <PillIcon className="w-4 h-4 text-[#1E2760]" />
              </IconBubble>
            </div>
          ))}
        </div>

        {/* Próximas citas */}
        {citas.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-bold text-[#6B6052] uppercase tracking-wider">
              {T[lang].meds_citas_section}
            </p>
            {citas.map((cita) => (
              <div
                key={cita.id}
                className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#D4C9B6] flex gap-3.5"
              >
                <IconBubble tone="lime" size="lg">
                  <CalendarIcon className="w-5 h-5 text-[#1E2760]" />
                </IconBubble>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-[#1E2760]">
                    {cita.titulo}
                  </p>
                  {cita.doctor && (
                    <p className="text-xs text-[#6B6052]">
                      {cita.doctor}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-[11px] bg-[#DDE2F5] text-[#1E2760] font-bold px-2.5 py-0.5 rounded-full">
                      {formatFechaCita(cita.fecha)}
                      {cita.hora ? ` · ${cita.hora}` : ""}
                    </span>
                    {cita.lugar && (
                      <span className="text-xs text-[#6B6052]">
                        {cita.lugar}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Notas rápidas */}
        {notasRapidas.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-bold text-[#6B6052] uppercase tracking-wider">
              {T[lang].meds_notas_section}
            </p>
            {notasRapidas
              .slice()
              .reverse()
              .map((nota) => (
                <div
                  key={nota.id}
                  className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#D4C9B6] flex gap-3.5"
                >
                  <IconBubble tone="warm" size="md">
                    <NoteIcon className="w-4 h-4 text-[#1E2760]" />
                  </IconBubble>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-[#1E2760] capitalize">
                        {nota.categoria}
                      </span>
                      <span className="text-xs text-[#6B6052]">
                        · {nota.fecha}
                      </span>
                    </div>
                    <p className="text-xs text-[#1E2760] leading-relaxed">
                      {nota.texto}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Primary Action Button (FAB) - circle perfect, 1 indigo solid */}
      <button
        onClick={() => setShowModal(true)}
        aria-label="Añadir registro"
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#1E2760] text-white text-2xl rounded-full flex items-center justify-center active:scale-95 transition-transform z-30"
      >
        +
      </button>

      {showModal && (
        <CoordinarModal
          onClose={() => setShowModal(false)}
          onSelectMed={() => {
            setShowModal(false);
            onNav("meds-add");
          }}
          onSelectCita={() => {
            setShowModal(false);
            onNav("meds-cita");
          }}
          onSelectNota={() => {
            setShowModal(false);
            onNav("meds-nota");
          }}
        />
      )}

      <BottomNav active="home" onNav={onNav} />
    </div>
  );
}

export function MedsAdd({
  onBack,
  onSave,
}: {
  onBack: () => void;
  onSave: (med: Omit<Medicamento, "id" | "tomadoHoy">) => void;
}) {
  const lang = useLang();
  const [nombre, setNombre] = useState("");
  const [dosis, setDosis] = useState("");
  const [horario, setHorario] = useState("");
  const [notas, setNotas] = useState("");

  function handleSave() {
    if (!nombre.trim()) return;
    onSave({ nombre, dosis, horario, notas });
    onBack();
  }

  return (
    <div className="min-h-screen bg-[#E9DECE]">
      <div className="bg-[#FAF7F2] border-b border-[#D4C9B6] px-5 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <BackButton onBack={onBack} />
          <BrandLogo />
        </div>
        <h1 className="font-display text-2xl text-[#1E2760] font-normal mt-3">
          {lang === "es" ? (
            <>
              Agregar <span className="font-bold">medicamento</span>
            </>
          ) : (
            <>
              Add <span className="font-bold">medication</span>
            </>
          )}
        </h1>
      </div>

      <div className="px-5 mt-5 space-y-4">
        {[
          {
            label: T[lang].addmed_nombre,
            val: nombre,
            set: setNombre,
            ph: lang === "es" ? "ej. Sertralina" : "e.g. Sertraline",
          },
          {
            label: T[lang].addmed_dosis,
            val: dosis,
            set: setDosis,
            ph: "ej. 50mg",
          },
          {
            label: T[lang].addmed_horario,
            val: horario,
            set: setHorario,
            ph:
              lang === "es"
                ? "ej. Mañana con desayuno"
                : "e.g. Morning with breakfast",
          },
          {
            label: T[lang].addmed_notas,
            val: notas,
            set: setNotas,
            ph:
              lang === "es"
                ? "ej. Tomar con abundante agua"
                : "e.g. Take with plenty of water",
          },
        ].map((field) => (
          <div key={field.label}>
            <label className="block text-xs font-bold text-[#6B6052] uppercase tracking-wide mb-1.5">
              {field.label}
            </label>
            <input
              type="text"
              value={field.val}
              onChange={(e) => field.set(e.target.value)}
              placeholder={field.ph}
              className="w-full bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl px-4 py-3.5 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760]"
            />
          </div>
        ))}

        <button
          onClick={handleSave}
          disabled={!nombre.trim()}
          className="w-full bg-[#1E2760] text-white font-bold py-4 rounded-full mt-3 active:scale-[0.98] transition-transform disabled:opacity-40 text-sm"
        >
          {T[lang].addmed_save}
        </button>
      </div>
    </div>
  );
}

export function MedsCita({
  onBack,
  onSave,
}: {
  onBack: () => void;
  onSave: (cita: Omit<Cita, "id">) => void;
}) {
  const lang = useLang();
  const [titulo, setTitulo] = useState("");
  const [doctor, setDoctor] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [lugar, setLugar] = useState("");
  const [notas, setNotas] = useState("");

  function handleSave() {
    if (!titulo.trim() || !fecha) return;
    onSave({ titulo, doctor, fecha, hora, lugar, notas });
    onBack();
  }

  return (
    <div className="min-h-screen bg-[#E9DECE]">
      <div className="bg-[#FAF7F2] border-b border-[#D4C9B6] px-5 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <BackButton onBack={onBack} />
          <BrandLogo />
        </div>
        <h1 className="font-display text-2xl text-[#1E2760] font-normal mt-3">
          {lang === "es" ? (
            <>
              Nueva <span className="font-bold">cita</span>
            </>
          ) : (
            <>
              New <span className="font-bold">appointment</span>
            </>
          )}
        </h1>
      </div>

      <div className="px-5 mt-5 space-y-4 pb-10">
        <div>
          <label className="block text-xs font-bold text-[#6B6052] uppercase tracking-wide mb-1.5">
            {T[lang].cita_titulo_label} *
          </label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="ej. Consulta de seguimiento"
            className="w-full bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl px-4 py-3.5 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#6B6052] uppercase tracking-wide mb-1.5">
            {T[lang].cita_doctor}
          </label>
          <input
            type="text"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            placeholder="ej. Dra. Martínez"
            className="w-full bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl px-4 py-3.5 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-[#6B6052] uppercase tracking-wide mb-1.5">
              {T[lang].cita_fecha} *
            </label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl px-4 py-3.5 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#6B6052] uppercase tracking-wide mb-1.5">
              {T[lang].cita_hora}
            </label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl px-4 py-3.5 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#6B6052] uppercase tracking-wide mb-1.5">
            {T[lang].cita_lugar}
          </label>
          <input
            type="text"
            value={lugar}
            onChange={(e) => setLugar(e.target.value)}
            placeholder="ej. Centro Médico"
            className="w-full bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl px-4 py-3.5 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#6B6052] uppercase tracking-wide mb-1.5">
            {T[lang].cita_notas}
          </label>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Observaciones previas a la cita..."
            rows={3}
            className="w-full bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl px-4 py-3.5 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760] resize-none"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!titulo.trim() || !fecha}
          className="w-full bg-[#1E2760] text-white font-bold py-4 rounded-full active:scale-[0.98] transition-transform disabled:opacity-40 text-sm"
        >
          {T[lang].cita_save}
        </button>
      </div>
    </div>
  );
}

export function MedsNota({
  onBack,
  onSave,
}: {
  onBack: () => void;
  onSave: (nota: Omit<Nota, "id">) => void;
}) {
  const lang = useLang();
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] =
    useState<Nota["categoria"]>("comportamiento");

  function handleSave() {
    if (!texto.trim()) return;
    onSave({
      texto,
      categoria,
      fecha: new Date().toLocaleDateString(
        lang === "es" ? "es-MX" : "en-US",
        { day: "numeric", month: "short", year: "numeric" },
      ),
    });
    onBack();
  }

  return (
    <div className="min-h-screen bg-[#E9DECE]">
      <div className="bg-[#FAF7F2] border-b border-[#D4C9B6] px-5 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <BackButton onBack={onBack} />
          <BrandLogo />
        </div>
        <h1 className="font-display text-2xl text-[#1E2760] font-normal mt-3">
          {lang === "es" ? (
            <>
              Nota <span className="font-bold">rápida</span>
            </>
          ) : (
            <>
              Quick <span className="font-bold">note</span>
            </>
          )}
        </h1>
      </div>

      <div className="px-5 mt-5 space-y-4 pb-10">
        <div>
          <label className="block text-xs font-bold text-[#6B6052] uppercase tracking-wide mb-2">
            {T[lang].nota_type}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                "comportamiento",
                "reaccion",
                "pregunta",
                "otro",
              ] as const
            ).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoria(cat)}
                className={`py-3 px-3 rounded-2xl border text-xs font-bold capitalize transition-all ${
                  categoria === cat
                    ? "bg-[#DDE2F5] text-[#1E2760] border-[#1E2760]"
                    : "bg-[#FAF7F2] text-[#6B6052] border-[#D4C9B6]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#6B6052] uppercase tracking-wide mb-1.5">
            {T[lang].nota_content} *
          </label>
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Escribe lo que has observado..."
            rows={5}
            className="w-full bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl px-4 py-3.5 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760] resize-none"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!texto.trim()}
          className="w-full bg-[#1E2760] text-white font-bold py-4 rounded-full active:scale-[0.98] transition-transform disabled:opacity-40 text-sm"
        >
          {T[lang].nota_save}
        </button>
      </div>
    </div>
  );
}

export function MedsHistory({
  meds,
  onBack,
}: {
  meds: Medicamento[];
  onBack: () => void;
}) {
  const lang = useLang();
  const [expanded, setExpanded] = useState<string | null>(null);

  const today = new Date();
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    return d;
  });

  return (
    <div className="min-h-screen bg-[#E9DECE] pb-10">
      <div className="bg-[#FAF7F2] border-b border-[#D4C9B6] px-5 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <BackButton onBack={onBack} />
          <BrandLogo />
        </div>
        <h1 className="font-display text-2xl text-[#1E2760] font-normal mt-3">
          {lang === "es" ? (
            <>
              Historial de <span className="font-bold">tomas</span>
            </>
          ) : (
            <>
              Medication <span className="font-bold">history</span>
            </>
          )}
        </h1>
        <p className="text-xs text-[#6B6052] mt-0.5">
          {T[lang].history_sub}
        </p>
      </div>

      <div className="px-5 mt-4 space-y-2">
        {days.map((d, i) => {
          const key = d.toDateString();
          const isToday = i === 0;
          return (
            <div key={key}>
              <button
                onClick={() => setExpanded(expanded === key ? null : key)}
                className="w-full bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl px-4 py-3.5 flex items-center justify-between text-left"
              >
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    isToday ? "text-[#1E2760]" : "text-[#6B6052]"
                  }`}
                >
                  {isToday ? T[lang].history_today : formatDate(d, lang)}
                </span>
                <div className="flex gap-2 items-center">
                  {meds.map((m) => {
                    const isTaken = isToday && m.tomadoHoy;
                    return (
                      <div
                        key={m.id}
                        className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                          isTaken
                            ? "bg-[#EBF5C5] text-[#1E2760] border-[#ADCC16]"
                            : "bg-white text-[#D4C9B6] border-[#D4C9B6]"
                        }`}
                      >
                        {isTaken ? "✓" : "–"}
                      </div>
                    );
                  })}
                </div>
              </button>
              {expanded === key && isToday && (
                <div className="bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl px-4 py-3 mt-1.5 space-y-2">
                  {meds.map((m) => (
                    <div key={m.id} className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#1E2760]">{m.nombre}</span>
                      <span
                        className={`font-semibold ${
                          m.tomadoHoy ? "text-[#1E2760]" : "text-[#6B6052]"
                        }`}
                      >
                        {m.tomadoHoy
                          ? `✓ ${m.horaRegistro}`
                          : T[lang].history_not_reg}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
