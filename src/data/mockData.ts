import type { Lang, Ejercicio, EjercicioDetalle, Post, IACategoria } from "../types.ts";
import { T } from "./translations.ts";

export function getEjercicios(lang: Lang): Ejercicio[] {
  if (lang === "en") {
    return [
      {
        id: 1,
        titulo: "Guided breathing together",
        icono: "BR",
        categoria: "ahora",
        detalle: "breath" as EjercicioDetalle,
        pasos: [],
      },
      {
        id: 8,
        titulo: "Progressive muscle relaxation",
        icono: "MR",
        categoria: "ahora",
        detalle: "muscle" as EjercicioDetalle,
        pasos: [],
      },
      {
        id: 9,
        titulo: "Shake your body",
        icono: "SB",
        categoria: "ahora",
        detalle: "shake" as EjercicioDetalle,
        pasos: [],
      },
      {
        id: 10,
        titulo: "5-4-3-2-1 Grounding",
        icono: "54",
        categoria: "ahora",
        detalle: "grounding" as EjercicioDetalle,
        pasos: [],
      },
      {
        id: 11,
        titulo: "Describe your surroundings",
        icono: "DE",
        categoria: "ahora",
        detalle: "prompt" as EjercicioDetalle,
        pasos: [],
      },
      {
        id: 12,
        titulo: "Write without a filter",
        icono: "WR",
        categoria: "ahora",
        detalle: "write" as EjercicioDetalle,
        pasos: [],
      },
      {
        id: 13,
        titulo: "Calm phrases to share",
        icono: "PH",
        categoria: "ahora",
        detalle: "phrases" as EjercicioDetalle,
        pasos: [],
      },
      {
        id: 14,
        titulo: "Music",
        icono: "MU",
        categoria: "ahora",
        detalle: "music" as EjercicioDetalle,
        pasos: [],
      },
      {
        id: 15,
        titulo: "Quiet space",
        icono: "SI",
        categoria: "ahora",
        detalle: "silence" as EjercicioDetalle,
        pasos: [],
      },
      {
        id: 2,
        titulo: "Quiet presence — no questions",
        icono: "QP",
        categoria: "ahora",
        pasos: [
          "Enter their room or sit nearby without saying anything.",
          "Don't ask questions. Just be present.",
          "You can put on soft music if the silence feels uncomfortable.",
          "After 10–15 min you can say: 'You don't have to talk. I just wanted to be here.'",
        ],
      },
      {
        id: 3,
        titulo: "Phrases that validate without minimizing",
        icono: "NW",
        categoria: "ahora",
        pasos: [
          "Avoid saying 'it's not a big deal' or 'you'll get over it'. That shuts the conversation down.",
          "Try: 'I understand this feels really big right now.'",
          "Or: 'I don't have all the answers, but you're not alone in this.'",
          "Wait. You don't have to solve anything in that moment.",
        ],
      },
      {
        id: 4,
        titulo: "Go for a walk without talking about it",
        icono: "TN",
        categoria: "despues",
        pasos: [
          "Suggest a walk with no agenda: 'Let's go for a walk, no rush.'",
          "Don't bring up the episode. Talk about anything else or walk in silence.",
          "Physical movement reduces residual cortisol.",
          "On the way back, you can ask: 'Do you feel a little better?'",
        ],
      },
      {
        id: 5,
        titulo: "End-of-day wind-down routine",
        icono: "DR",
        categoria: "prevencion",
        pasos: [
          "Set a fixed time to turn off screens (30–60 min before sleep).",
          "Create a brief ritual: tea, reading, soft music. Consistency reduces anticipatory anxiety.",
          "You can say: 'This is our calm-down time before bed.'",
          "Apply it to yourself too. Modeling matters.",
        ],
      },
      {
        id: 6,
        titulo: "Their own regulation space",
        icono: "RS",
        categoria: "prevencion",
        pasos: [
          "Help your teenager identify a corner or activity that regulates them (music, drawing, legos).",
          "When they start to tense up, gently suggest (don't push): 'Do you want to go to your space for a bit?'",
          "Resist the urge to fix or talk. Autonomous regulation is a skill.",
          "After they come out, wait for them to initiate contact.",
        ],
      },
      {
        id: 7,
        titulo: "Post-episode check-in",
        icono: "PE",
        categoria: "despues",
        pasos: [
          "Wait at least 2 hours after the episode before talking about what happened.",
          "Ask with curiosity, not judgment: 'Can you tell me what you were feeling?'",
          "Listen without interrupting. Reflect: 'So you were feeling...'",
          "Close with: 'Is there anything you'd want me to do differently next time?'",
        ],
      },
    ];
  }

  return [
    {
      id: 1,
      titulo: "Respiración guiada juntos",
      icono: "BR",
      categoria: "ahora",
      detalle: "breath" as EjercicioDetalle,
      pasos: [],
    },
    {
      id: 8,
      titulo: "Relajación muscular progresiva",
      icono: "MR",
      categoria: "ahora",
      detalle: "muscle" as EjercicioDetalle,
      pasos: [],
    },
    {
      id: 9,
      titulo: "Sacudir el cuerpo",
      icono: "SB",
      categoria: "ahora",
      detalle: "shake" as EjercicioDetalle,
      pasos: [],
    },
    {
      id: 10,
      titulo: "5-4-3-2-1 Grounding sensorial",
      icono: "54",
      categoria: "ahora",
      detalle: "grounding" as EjercicioDetalle,
      pasos: [],
    },
    {
      id: 11,
      titulo: "Describir el entorno",
      icono: "DE",
      categoria: "ahora",
      detalle: "prompt" as EjercicioDetalle,
      pasos: [],
    },
    {
      id: 12,
      titulo: "Escribir sin filtro",
      icono: "WR",
      categoria: "ahora",
      detalle: "write" as EjercicioDetalle,
      pasos: [],
    },
    {
      id: 13,
      titulo: "Frases de calma compartida",
      icono: "PH",
      categoria: "ahora",
      detalle: "phrases" as EjercicioDetalle,
      pasos: [],
    },
    {
      id: 14,
      titulo: "Música",
      icono: "MU",
      categoria: "ahora",
      detalle: "music" as EjercicioDetalle,
      pasos: [],
    },
    {
      id: 15,
      titulo: "Espacio de silencio",
      icono: "SI",
      categoria: "ahora",
      detalle: "silence" as EjercicioDetalle,
      pasos: [],
    },
    {
      id: 2,
      titulo: "Espacio de silencio sin preguntas",
      icono: "QP",
      categoria: "ahora",
      pasos: [
        "Entra al cuarto o siéntate cerca sin decir nada.",
        "No hagas preguntas. Solo haz presencia.",
        "Puedes poner música suave si hay silencio incómodo.",
        "Después de 10-15 min puedes decir: 'No tienes que hablar. Solo quería estar aquí.'",
      ],
    },
    {
      id: 3,
      titulo: "Frases para validar sin minimizar",
      icono: "NW",
      categoria: "ahora",
      pasos: [
        "Evita decir 'no es para tanto' o 'ya se te pasará'. Eso cierra la conversación.",
        "Prueba: 'Entiendo que esto se siente muy grande ahora mismo.'",
        "O: 'No tengo todas las respuestas, pero no estás solo/a en esto.'",
        "Espera. No tienes que resolver nada en ese momento.",
      ],
    },
    {
      id: 4,
      titulo: "Salir a caminar sin hablar del problema",
      icono: "TN",
      categoria: "despues",
      pasos: [
        "Propón salir a caminar sin agenda: 'Vamos a dar una vuelta, sin prisa.'",
        "No menciones el episodio. Hablen de cualquier otra cosa o caminen en silencio.",
        "El movimiento físico reduce el cortisol residual.",
        "Al volver, puedes preguntar: '¿Te sientes un poco mejor?'",
      ],
    },
    {
      id: 5,
      titulo: "Rutina de cierre de día",
      icono: "DR",
      categoria: "prevencion",
      pasos: [
        "Establece una hora fija para apagar pantallas (30-60 min antes de dormir).",
        "Crea un ritual breve: té, lectura, música suave. La constancia reduce la ansiedad anticipatoria.",
        "Puedes decir: 'Este es nuestro tiempo de calma antes de dormir.'",
        "Aplícalo tú también. El modelo importa.",
      ],
    },
    {
      id: 6,
      titulo: "Espacio de regulación propio",
      icono: "RS",
      categoria: "prevencion",
      pasos: [
        "Ayuda a tu hijo/a a identificar un rincón o actividad que le regule (música, dibujo, lego).",
        "Cuando empiece a ponerse tenso/a, sugiere (sin imponer): '¿Quieres ir a tu espacio un momento?'",
        "Resiste la urgencia de resolver o hablar. La regulación autónoma es una habilidad.",
        "Después de que salga del espacio, espera a que él/ella inicie contacto.",
      ],
    },
    {
      id: 7,
      titulo: "Revisión post-episodio",
      icono: "PE",
      categoria: "despues",
      pasos: [
        "Espera al menos 2 horas después del episodio antes de hablar de lo que pasó.",
        "Pregunta con curiosidad, no con evaluación: '¿Puedes contarme qué estabas sintiendo?'",
        "Escucha sin interrumpir. Refleja: 'O sea que te sentiste...'",
        "Cierra con: '¿Hay algo que quieras que yo haga diferente la próxima vez?'",
      ],
    },
  ];
}

export const EJERCICIOS = getEjercicios("es");

export function getPostsIniciales(lang: Lang): Post[] {
  if (lang === "en") {
    return [
      {
        id: 1,
        alias: "Anonymous parent #374",
        texto:
          "Today my daughter had an episode at school and they called me to pick her up. I didn't know what to say in the car. I just put on her favorite music and we got home in silence. Is that enough?",
        identificados: 47,
        comentarios: [
          {
            alias: "Anonymous parent #129",
            texto:
              "Silent presence is far more powerful than it seems. What you did was exactly right.",
          },
          {
            alias: "Anonymous parent #501",
            texto:
              "I went through the same thing. Music was our connection for months before we could talk.",
          },
        ],
      },
      {
        id: 2,
        alias: "Anonymous parent #261",
        texto:
          "My son says nothing I suggest works. Therapy, exercises, everything. I feel completely useless. Is anyone else going through this?",
        identificados: 89,
        comentarios: [
          {
            alias: "Anonymous parent #88",
            texto:
              "Absolutely. What helps changes week to week. Don't give up — your presence already means something.",
          },
        ],
      },
      {
        id: 3,
        alias: "Anonymous guardian #15",
        texto:
          "First week with the app. It's helped me put words to things I didn't know how to name. Thank you to whoever made it.",
        identificados: 23,
        comentarios: [],
      },
    ];
  }

  return [
    {
      id: 1,
      alias: "Madre anónima #374",
      texto:
        "Hoy mi hija tuvo un episodio en la escuela y la llamaron para que la recogiera. Me quedé sin saber qué decir en el carro. Solo puse su música favorita y llegamos a casa en silencio. ¿Es suficiente con eso?",
      identificados: 47,
      comentarios: [
        {
          alias: "Padre anónimo #129",
          texto:
            "El silencio con presencia es mucho más poderoso de lo que parece. Lo que hiciste fue exactamente lo correcto.",
        },
        {
          alias: "Madre anónima #501",
          texto:
            "Pasé por lo mismo. La música fue nuestra conexión durante meses antes de poder hablar.",
        },
      ],
    },
    {
      id: 2,
      alias: "Padre anónimo #261",
      texto:
        "Mi hijo dice que no le funciona nada de lo que le propongo. La terapia, los ejercicios, todo. Me siento completamente inútil. ¿Alguien más está en esto?",
      identificados: 89,
      comentarios: [
        {
          alias: "Madre anónima #88",
          texto:
            "Absolutamente. Lo que ayuda es diferente cada semana. No te rindas, tu presencia ya es algo.",
        },
      ],
    },
    {
      id: 3,
      alias: "Tutora anónima #15",
      texto:
        "Primera semana con la app. Me ha ayudado a poner palabras a cosas que no sabía cómo nombrar. Gracias a quien sea que la hizo.",
      identificados: 23,
      comentarios: [],
    },
  ];
}

export function getIACategorias(lang: Lang): IACategoria[] {
  return [
    { id: "callada", label: T[lang].ia_cat_callada, icono: "" },
    { id: "enojo", label: T[lang].ia_cat_enojo, icono: "" },
    { id: "no-habla", label: T[lang].ia_cat_nohabla, icono: "" },
    { id: "episodio", label: T[lang].ia_cat_episodio, icono: "" },
    { id: "escuela", label: T[lang].ia_cat_escuela, icono: "" },
    { id: "aislamiento", label: T[lang].ia_cat_aislamiento, icono: "" },
  ];
}

export const IA_CATEGORIAS = getIACategorias("es");

export function getIARespuestas(
  lang: Lang,
): Record<string, { titulo: string; sugerencias: string[] }> {
  if (lang === "en") {
    return {
      callada: {
        titulo: "When they're quiet and withdrawn",
        sugerencias: [
          "Don't interrupt the silence with questions. Be present without demanding answers. You can say: 'You don't have to talk. I'm here if you want.'",
          "Suggest a parallel activity without an agenda (watching a show together, cooking). Connection happens when there's no pressure.",
          "Send a short text if the silence becomes uncomfortable: 'I love you. You don't have to respond to this.'",
        ],
      },
      enojo: {
        titulo: "When they get angry easily",
        sugerencias: [
          "Anger in anxious teenagers is often the safest way they know to express fear. Don't take it personally.",
          "When they're angry, lower your voice (don't raise it). Say: 'I can see you're overwhelmed. I can wait.'",
          "After the episode, when they're calm, ask: 'What were you feeling before you got angry?'",
        ],
      },
      "no-habla": {
        titulo: "When they won't talk about it",
        sugerencias: [
          "Respect the 'no'. Forcing conversation closes doors. Say: 'That's okay, we don't have to talk now. I'm still here.'",
          "Try writing: leave a notebook in their room with a note saying 'If you ever want to write, this is yours.'",
          "Talk about your own day, your own emotions. Modeling vulnerability opens more than asking directly.",
        ],
      },
      episodio: {
        titulo: "After a strong episode",
        sugerencias: [
          "In the moment: fewer words, more presence. Sit nearby, breathe slowly, don't analyze.",
          "Avoid saying 'it's over' or 'calm down'. Instead: 'I'm here. Take all the time you need.'",
          "Wait at least 2 hours before trying to talk about what happened. The nervous system needs time to recover.",
        ],
      },
      escuela: {
        titulo: "When there are problems at school",
        sugerencias: [
          "Before talking to the school, talk to your teenager: 'What would you like me to do? What don't you want me to do?'",
          "Validate first: 'That sounds really exhausting to deal with.' Then look for solutions together.",
          "Ask the school about discreet accommodations, without making your teenager feel singled out.",
        ],
      },
      aislamiento: {
        titulo: "When they're isolating a lot",
        sugerencias: [
          "Isolation can be regulation, not rejection. Ask: 'Do you need time alone or are you really struggling?'",
          "Suggest small, low-pressure connections: eating together even without talking, a short walk.",
          "If the isolation lasts more than a week and you notice decline, consult with the mental health team.",
        ],
      },
    };
  }

  return {
    callada: {
      titulo: "Cuando está callado/a",
      sugerencias: [
        "No interrumpas el silencio con preguntas. Haz presencia sin exigir respuestas. Puedes decir: 'No tienes que hablar. Aquí estoy si quieres.'",
        "Propón una actividad paralela sin agenda (ver una serie juntos, cocinar). La conexión ocurre cuando no hay presión.",
        "Envía un mensaje de texto corto si el silencio se vuelve incómodo: 'Te quiero. No tienes que responder esto.'",
      ],
    },
    enojo: {
      titulo: "Cuando se enoja fácilmente",
      sugerencias: [
        "El enojo en adolescentes con ansiedad suele ser la forma más segura de expresar miedo. No lo tomes personal.",
        "En el momento del enojo, baja tu tono de voz (no lo subas). Di: 'Veo que estás muy activado/a. Puedo esperar.'",
        "Después del episodio, cuando esté tranquilo/a, pregunta: '¿Qué estabas sintiendo antes de enojarte?'",
      ],
    },
    "no-habla": {
      titulo: "Cuando no quiere hablar del tema",
      sugerencias: [
        "Respeta el 'no'. Forzar la conversación cierra puertas. Di: 'Está bien, no tenemos que hablar ahora. Sigo aquí.'",
        "Intenta escritura: deja un cuaderno en su cuarto con una nota que diga 'Si algún día quieres escribir, esto es tuyo.'",
        "Habla de tu propio día, tus propias emociones. Modelar vulnerabilidad abre más que preguntar directamente.",
      ],
    },
    episodio: {
      titulo: "Después de un episodio fuerte",
      sugerencias: [
        "En el momento: menos palabras, más presencia. Siéntate cerca, respira lento, no analices.",
        "Evita decir 'ya pasó' o 'cálmate'. En cambio: 'Estoy aquí. Tómate el tiempo que necesites.'",
        "Espera mínimo 2 horas antes de intentar hablar de lo que ocurrió. El sistema nervioso necesita recuperarse.",
      ],
    },
    escuela: {
      titulo: "Cuando hay problemas en la escuela",
      sugerencias: [
        "Antes de hablar con el colegio, habla con tu hijo/a: '¿Qué te gustaría que yo hiciera? ¿Qué no quieres que haga?'",
        "Valida primero: 'Suena muy agotador tener que lidiar con eso.' Luego busca soluciones juntos.",
        "Pregunta al colegio sobre adaptaciones discretas, sin hacer que tu hijo/a se sienta señalado/a.",
      ],
    },
    aislamiento: {
      titulo: "Cuando se aísla mucho",
      sugerencias: [
        "El aislamiento puede ser regulación, no rechazo. Pregunta: '¿Necesitas tiempo solo/a o estás pasándola muy mal?'",
        "Propón pequeñas conexiones de baja presión: cenar juntos aunque no hablen, dar una vuelta corta.",
        "Si el aislamiento dura más de una semana y nota deterioro, consulta con el equipo de salud mental.",
      ],
    },
  };
}

export const IA_RESPUESTAS = getIARespuestas("es");

export const RESPUESTAS_IA: Record<Lang, string[]> = {
  es: [
    "Entiendo lo que describes. Esto es más común de lo que parece y no significa que estés fallando. ¿Qué fue lo que más te preocupó de ese momento?",
    "Lo que mencionas tiene mucho sentido. En situaciones de ansiedad intensa, el adolescente necesita que el entorno externo sea lo más predecible posible. Tú eres ese entorno para él/ella.",
    "Una sugerencia concreta: en lugar de buscar palabras perfectas, intenta estar presente en silencio los primeros 10 minutos. La presencia física sin agenda habla más que cualquier frase.",
    "Eso es muy válido. Muchos padres se sienten así. Recuerda: no tienes que resolver su ansiedad, solo acompañarla.",
    "¿Has notado si hay algún momento del día en que parece más accesible? A veces la conexión ocurre en los espacios pequeños: un viaje en auto, preparando comida juntos.",
  ],
  en: [
    "I understand what you're describing. This is more common than it seems and doesn't mean you're failing. What worried you most about that moment?",
    "What you're sharing makes a lot of sense. During intense anxiety, teenagers need the external environment to be as predictable as possible. You are that environment for them.",
    "A concrete suggestion: instead of looking for perfect words, try being present in silence for the first 10 minutes. Physical presence without an agenda speaks louder than any phrase.",
    "That's very valid. Many parents feel this way. Remember: you don't have to solve their anxiety, just be with them through it.",
    "Have you noticed if there's any time of day when they seem more reachable? Sometimes connection happens in small spaces: a car ride, cooking together.",
  ],
};
