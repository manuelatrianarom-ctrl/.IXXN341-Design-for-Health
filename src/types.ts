export type Lang = "es" | "en";

export type Screen =
  | "about"
  | "carousel"
  | "login"
  | "registro"
  | "personalizar-intro"
  | "personalizar-quien"
  | "personalizar-nombre"
  | "onboarding"
  | "home"
  | "plan-list"
  | "plan-detail"
  | "plan-breath"
  | "plan-muscle"
  | "plan-shake"
  | "plan-grounding"
  | "plan-prompt"
  | "plan-write"
  | "plan-phrases"
  | "plan-music"
  | "plan-silence"
  | "meds-main"
  | "meds-add"
  | "meds-cita"
  | "meds-nota"
  | "meds-history"
  | "comunidad-feed"
  | "comunidad-crear"
  | "comunidad-detalle"
  | "ia-entrada"
  | "ia-respuesta"
  | "ia-chat"
  | "progreso"
  | "perfil";

export type EjercicioDetalle =
  | "pasos"
  | "breath"
  | "muscle"
  | "shake"
  | "grounding"
  | "prompt"
  | "write"
  | "phrases"
  | "music"
  | "silence";

export interface Ejercicio {
  id: number;
  titulo: string;
  icono: string;
  categoria: "ahora" | "prevencion" | "despues";
  pasos: string[];
  detalle?: EjercicioDetalle;
}

export interface Medicamento {
  id: number;
  nombre: string;
  dosis: string;
  horario: string;
  notas: string;
  tomadoHoy: boolean;
  horaRegistro?: string;
}

export interface Comentario {
  alias: string;
  texto: string;
}

export interface Post {
  id: number;
  alias: string;
  texto: string;
  identificados: number;
  comentarios: Comentario[];
}

export interface Cita {
  id: number;
  titulo: string;
  doctor: string;
  fecha: string;
  hora: string;
  lugar: string;
  notas: string;
}

export interface Nota {
  id: number;
  texto: string;
  categoria: "comportamiento" | "reaccion" | "pregunta" | "otro";
  fecha: string;
}

export interface Mensaje {
  role: "user" | "ia";
  texto: string;
}

export interface IACategoria {
  id: string;
  label: string;
  icono: string;
}
