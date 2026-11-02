import React, { useState } from "react";
import type {
  Lang,
  Screen,
  Medicamento,
  Ejercicio,
  Post,
  IACategoria,
  Cita,
  Nota,
} from "./types.ts";
import { LangContext } from "./context/LangContext.tsx";
import {
  getEjercicios,
  getPostsIniciales,
  getIACategorias,
  IA_CATEGORIAS,
} from "./data/mockData.ts";
import { now, formatDate } from "./utils/helpers.ts";

import { AboutStandingBy } from "./components/AboutStandingBy.tsx";
import { Carousel } from "./components/Carousel.tsx";
import { Login, Registro } from "./components/AuthScreens.tsx";
import {
  PersonalizarIntro,
  PersonalizarQuien,
  PersonalizarNombre,
  Onboarding,
} from "./components/PersonalizarScreens.tsx";
import { Home } from "./components/Home.tsx";
import {
  PlanList,
  PlanDetail,
  PlanBreath,
  PlanMuscle,
  PlanShake,
  PlanGrounding,
  PlanPrompt,
  PlanWrite,
  PlanPhrases,
  PlanMusic,
  PlanSilence,
} from "./components/PlanScreens.tsx";
import {
  MedsMain,
  MedsAdd,
  MedsCita,
  MedsNota,
  MedsHistory,
} from "./components/MedsScreens.tsx";
import {
  ComunidadFeed,
  ComunidadCrear,
  ComunidadDetalle,
} from "./components/ComunidadScreens.tsx";
import { IAEntrada, IAResp, IAChat } from "./components/IAScreens.tsx";
import { Progreso, Perfil } from "./components/ProgresoPerfilScreens.tsx";

export default function App() {
  const [screen, setScreen] = useState<Screen>("about");
  const [cuidador, setCuidador] = useState("");
  const [hijo, setHijo] = useState("");
  const [relacion, setRelacion] = useState("");
  const [meds, setMeds] = useState<Medicamento[]>([
    {
      id: 1,
      nombre: "Sertralina",
      dosis: "50mg",
      horario: "Mañana con desayuno",
      notas: "",
      tomadoHoy: false,
    },
  ]);
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState<Ejercicio>(
    () => getEjercicios("es")[0],
  );
  const [ejerciciosProbados, setEjerciciosProbados] = useState<number[]>([]);
  const [posts, setPosts] = useState<Post[]>(() => getPostsIniciales("es"));
  const [postSeleccionado, setPostSeleccionado] = useState<Post>(posts[0]);
  const [categoriaIA, setCategoriaIA] = useState<IACategoria>(IA_CATEGORIAS[0]);
  const [textoLibreIA, setTextoLibreIA] = useState("");
  const [historialEstados, setHistorialEstados] = useState<
    { fecha: string; estado: string }[]
  >([]);
  const [prevScreen, setPrevScreen] = useState<Screen>("home");
  const [citas, setCitas] = useState<Cita[]>([]);
  const [notasRapidas, setNotasRapidas] = useState<Nota[]>([]);
  const [lang, setLang] = useState<Lang>("es");

  function handleSetLang(l: Lang) {
    setLang(l);
    setPosts(getPostsIniciales(l));
  }

  function nav(s: Screen) {
    setPrevScreen(screen);
    setScreen(s);
  }

  function handleEstado(estado: string) {
    setHistorialEstados((prev) => [
      ...prev,
      {
        fecha: now(lang) + " · " + formatDate(new Date(), lang),
        estado,
      },
    ]);
  }

  function handleMarcarEjercicio(id: number) {
    setEjerciciosProbados((prev) =>
      prev.includes(id) ? prev : [...prev, id],
    );
  }

  function handleAddMed(med: Omit<Medicamento, "id" | "tomadoHoy">) {
    setMeds((prev) => [...prev, { ...med, id: Date.now(), tomadoHoy: false }]);
  }

  function wrap(node: React.ReactNode) {
    return (
      <LangContext.Provider value={lang}>
        <div className="w-full max-w-md mx-auto min-h-screen bg-[var(--color-cream)] relative shadow-sm">
          <svg
            className="absolute w-0 h-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <filter id="standing-by-indigo" colorInterpolationFilters="sRGB">
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.1176 0 0 0 0 0.1529 0 0 0 0 0.3765 0 0 0 1 0"
                />
              </filter>
            </defs>
          </svg>
          {node}
        </div>
      </LangContext.Provider>
    );
  }

  if (screen === "about") {
    return wrap(
      <AboutStandingBy
        setLang={handleSetLang}
        onContinue={() => setScreen("carousel")}
      />,
    );
  }

  if (screen === "carousel") {
    return wrap(
      <Carousel
        setLang={handleSetLang}
        onDone={() => setScreen("login")}
      />,
    );
  }

  if (screen === "login") {
    return wrap(
      <Login
        onLogin={() => setScreen("personalizar-intro")}
        onRegister={() => setScreen("registro")}
      />,
    );
  }

  if (screen === "registro") {
    return wrap(
      <Registro
        onDone={() => setScreen("personalizar-intro")}
        onBack={() => setScreen("login")}
      />,
    );
  }

  if (screen === "personalizar-intro") {
    return wrap(
      <PersonalizarIntro
        onContinue={() => setScreen("personalizar-quien")}
        onBack={() => setScreen("login")}
      />,
    );
  }

  if (screen === "personalizar-quien") {
    return wrap(
      <PersonalizarQuien
        onContinue={(r) => {
          setRelacion(r);
          setScreen("personalizar-nombre");
        }}
        onBack={() => setScreen("personalizar-intro")}
      />,
    );
  }

  if (screen === "personalizar-nombre") {
    return wrap(
      <PersonalizarNombre
        relacion={relacion}
        onContinue={(nombre) => {
          setHijo(nombre);
          setScreen("home");
        }}
        onBack={() => setScreen("personalizar-quien")}
      />,
    );
  }

  if (screen === "onboarding") {
    return wrap(
      <Onboarding
        onDone={(c, h) => {
          setCuidador(c);
          setHijo(h);
          setScreen("home");
        }}
      />,
    );
  }

  if (screen === "home") {
    return wrap(
      <Home
        cuidador={cuidador}
        hijo={hijo}
        onNav={nav}
        onEstadoSelect={handleEstado}
      />,
    );
  }

  if (screen === "plan-list") {
    return wrap(
      <PlanList
        hijo={hijo}
        onNav={nav}
        onSelectEjercicio={(e) => setEjercicioSeleccionado(e)}
      />,
    );
  }

  if (screen === "plan-detail") {
    return wrap(
      <PlanDetail
        ejercicio={ejercicioSeleccionado}
        cuidador={cuidador}
        onBack={() => nav("plan-list")}
        onNav={nav}
        onMarcar={handleMarcarEjercicio}
      />,
    );
  }

  const planBack = () => nav("plan-list");
  const planMarcar = (id: number) => {
    handleMarcarEjercicio(id);
  };

  if (screen === "plan-breath") {
    return wrap(
      <PlanBreath
        ejercicio={ejercicioSeleccionado}
        onBack={planBack}
        onMarcar={planMarcar}
      />,
    );
  }
  if (screen === "plan-muscle") {
    return wrap(
      <PlanMuscle
        ejercicio={ejercicioSeleccionado}
        onBack={planBack}
        onMarcar={planMarcar}
      />,
    );
  }
  if (screen === "plan-shake") {
    return wrap(
      <PlanShake
        ejercicio={ejercicioSeleccionado}
        onBack={planBack}
        onMarcar={planMarcar}
      />,
    );
  }
  if (screen === "plan-grounding") {
    return wrap(
      <PlanGrounding
        ejercicio={ejercicioSeleccionado}
        onBack={planBack}
        onMarcar={planMarcar}
      />,
    );
  }
  if (screen === "plan-prompt") {
    return wrap(
      <PlanPrompt
        ejercicio={ejercicioSeleccionado}
        onBack={planBack}
        onMarcar={planMarcar}
      />,
    );
  }
  if (screen === "plan-write") {
    return wrap(
      <PlanWrite
        ejercicio={ejercicioSeleccionado}
        onBack={planBack}
        onMarcar={planMarcar}
      />,
    );
  }
  if (screen === "plan-phrases") {
    return wrap(
      <PlanPhrases
        ejercicio={ejercicioSeleccionado}
        onBack={planBack}
        onMarcar={planMarcar}
      />,
    );
  }
  if (screen === "plan-music") {
    return wrap(
      <PlanMusic
        ejercicio={ejercicioSeleccionado}
        onBack={planBack}
        onMarcar={planMarcar}
      />,
    );
  }
  if (screen === "plan-silence") {
    return wrap(
      <PlanSilence
        ejercicio={ejercicioSeleccionado}
        onBack={planBack}
        onMarcar={planMarcar}
      />,
    );
  }

  if (screen === "meds-main") {
    return wrap(
      <MedsMain
        hijo={hijo}
        onNav={nav}
        meds={meds}
        setMeds={setMeds}
        citas={citas}
        notasRapidas={notasRapidas}
      />,
    );
  }

  if (screen === "meds-add") {
    return wrap(
      <MedsAdd onBack={() => nav("meds-main")} onSave={handleAddMed} />,
    );
  }

  if (screen === "meds-cita") {
    return wrap(
      <MedsCita
        onBack={() => nav("meds-main")}
        onSave={(cita) =>
          setCitas((prev) => [...prev, { ...cita, id: Date.now() }])
        }
      />,
    );
  }

  if (screen === "meds-nota") {
    return wrap(
      <MedsNota
        onBack={() => nav("meds-main")}
        onSave={(nota) =>
          setNotasRapidas((prev) => [...prev, { ...nota, id: Date.now() }])
        }
      />,
    );
  }

  if (screen === "meds-history") {
    return wrap(
      <MedsHistory meds={meds} onBack={() => nav("meds-main")} />,
    );
  }

  if (screen === "comunidad-feed") {
    return wrap(
      <ComunidadFeed
        posts={posts}
        setPosts={setPosts}
        onNav={nav}
        onSelectPost={(p) => setPostSeleccionado(p)}
      />,
    );
  }

  if (screen === "comunidad-crear") {
    return wrap(
      <ComunidadCrear
        posts={posts}
        setPosts={setPosts}
        onBack={() => nav("comunidad-feed")}
      />,
    );
  }

  if (screen === "comunidad-detalle") {
    return wrap(
      <ComunidadDetalle
        post={postSeleccionado}
        posts={posts}
        setPosts={setPosts}
        onBack={() => nav("comunidad-feed")}
      />,
    );
  }

  if (screen === "ia-entrada") {
    return wrap(
      <IAEntrada
        cuidador={cuidador}
        onNav={nav}
        onSelectCategoria={(c) => setCategoriaIA(c)}
        onSetTextoLibre={(txt) => setTextoLibreIA(txt)}
      />,
    );
  }

  if (screen === "ia-respuesta") {
    return wrap(
      <IAResp
        categoria={categoriaIA}
        onNav={nav}
        onSiguiente={() => nav("ia-chat")}
      />,
    );
  }

  if (screen === "ia-chat") {
    return wrap(
      <IAChat
        cuidador={cuidador}
        textoLibre={textoLibreIA}
        categoriaInicial={
          prevScreen === "ia-respuesta" ? categoriaIA : undefined
        }
        onNav={nav}
      />,
    );
  }

  if (screen === "progreso") {
    return wrap(
      <Progreso
        meds={meds}
        ejerciciosProbados={ejerciciosProbados}
        historialEstados={historialEstados}
        onNav={nav}
      />,
    );
  }

  if (screen === "perfil") {
    return wrap(
      <Perfil
        setLang={handleSetLang}
        cuidador={cuidador}
        hijo={hijo}
        onNav={nav}
        onReset={() => {
          setCuidador("");
          setHijo("");
          setRelacion("");
          setScreen("about");
        }}
      />,
    );
  }

  return null;
}
