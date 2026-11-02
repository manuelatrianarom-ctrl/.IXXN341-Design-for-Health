import React, { useState } from "react";
import type { Screen, Post } from "../types.ts";
import { useLang } from "../context/LangContext.tsx";
import { T } from "../data/translations.ts";
import { BackButton, BottomNav, BrandLogo } from "./Common.tsx";
import { IconBubble, UsersIcon, ChatQuotesIcon } from "./AppIcons.tsx";

export function ComunidadFeed({
  posts,
  setPosts,
  onNav,
  onSelectPost,
}: {
  posts: Post[];
  setPosts: (p: Post[]) => void;
  onNav: (s: Screen) => void;
  onSelectPost: (p: Post) => void;
}) {
  const lang = useLang();

  function handleIdentificar(id: number) {
    setPosts(
      posts.map((p) =>
        p.id === id ? { ...p, identificados: p.identificados + 1 } : p,
      ),
    );
  }

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
              Comunidad de <span className="font-bold">cuidadores</span>
            </>
          ) : (
            <>
              Caregivers <span className="font-bold">community</span>
            </>
          )}
        </h1>
        <p className="text-xs text-[#6B6052] mt-0.5">{T[lang].com_sub}</p>
      </div>

      <div className="px-5 mt-4 space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#D4C9B6] space-y-3"
          >
            <div className="flex items-center gap-2.5">
              <IconBubble tone="lime" size="sm">
                <UsersIcon className="w-3.5 h-3.5 text-[#1E2760]" />
              </IconBubble>
              <p className="text-xs font-bold text-[#6B6052]">
                {post.alias}
              </p>
            </div>

            <p className="text-xs text-[#1E2760] leading-relaxed">
              {post.texto}
            </p>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => handleIdentificar(post.id)}
                className="flex items-center gap-1.5 text-xs font-bold text-[#1E2760] bg-[#EBF5C5] border border-[#ADCC16] px-3.5 py-1.5 rounded-full active:scale-95 transition-transform"
              >
                <span>{T[lang].com_identify}</span>
                <span className="text-[#1E2760] font-bold">({post.identificados})</span>
              </button>
              <button
                onClick={() => {
                  onSelectPost(post);
                  onNav("comunidad-detalle");
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-[#6B6052] bg-white border border-[#D4C9B6] px-3.5 py-1.5 rounded-full active:scale-95 transition-transform"
              >
                <ChatQuotesIcon className="w-3.5 h-3.5 text-[#6B6052]" />
                <span>{T[lang].com_comment}</span>
                <span>({post.comentarios.length})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button (FAB) - circle perfect, 1 indigo solid */}
      <button
        onClick={() => onNav("comunidad-crear")}
        aria-label="Nueva publicación"
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#1E2760] text-white text-2xl rounded-full flex items-center justify-center active:scale-95 transition-transform z-30"
      >
        +
      </button>

      <BottomNav active="home" onNav={onNav} />
    </div>
  );
}

export function ComunidadCrear({
  posts,
  setPosts,
  onBack,
}: {
  posts: Post[];
  setPosts: (p: Post[]) => void;
  onBack: () => void;
}) {
  const lang = useLang();
  const [texto, setTexto] = useState("");

  function handlePublicar() {
    if (!texto.trim()) return;
    const nuevoAlias =
      lang === "es"
        ? `Cuidador/a #${Math.floor(Math.random() * 900) + 100}`
        : `Caregiver #${Math.floor(Math.random() * 900) + 100}`;
    const nuevo: Post = {
      id: Date.now(),
      alias: nuevoAlias,
      texto: texto.trim(),
      identificados: 0,
      comentarios: [],
    };
    setPosts([nuevo, ...posts]);
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
              Nueva <span className="font-bold">publicación</span>
            </>
          ) : (
            <>
              New <span className="font-bold">post</span>
            </>
          )}
        </h1>
      </div>

      <div className="px-5 mt-5 space-y-4">
        <div className="bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl p-4">
          <p className="text-xs text-[#6B6052] font-semibold leading-relaxed">
            {T[lang].com_anon_warning}
          </p>
        </div>

        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder={T[lang].com_placeholder}
          rows={7}
          className="w-full bg-[#FAF7F2] border border-[#D4C9B6] rounded-2xl p-4 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760] resize-none"
        />

        <button
          onClick={handlePublicar}
          disabled={!texto.trim()}
          className="w-full bg-[#1E2760] text-white font-bold py-4 rounded-full active:scale-[0.98] transition-transform disabled:opacity-40 text-sm"
        >
          {T[lang].com_publish}
        </button>
      </div>
    </div>
  );
}

export function ComunidadDetalle({
  post,
  posts,
  setPosts,
  onBack,
}: {
  post: Post;
  posts: Post[];
  setPosts: (p: Post[]) => void;
  onBack: () => void;
}) {
  const lang = useLang();
  const [comentario, setComentario] = useState("");
  const currentPost = posts.find((p) => p.id === post.id) || post;

  function handleComentar() {
    if (!comentario.trim()) return;
    const alias =
      lang === "es"
        ? `Cuidador/a #${Math.floor(Math.random() * 900) + 100}`
        : `Caregiver #${Math.floor(Math.random() * 900) + 100}`;
    setPosts(
      posts.map((p) =>
        p.id === post.id
          ? {
              ...p,
              comentarios: [
                ...p.comentarios,
                { alias, texto: comentario.trim() },
              ],
            }
          : p,
      ),
    );
    setComentario("");
  }

  return (
    <div className="min-h-screen bg-[#E9DECE] pb-10">
      <div className="bg-[#FAF7F2] border-b border-[#D4C9B6] px-5 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <BackButton onBack={onBack} />
          <BrandLogo />
        </div>
        <h1 className="font-display text-xl text-[#1E2760] font-normal mt-3">
          {lang === "es" ? (
            <>
              Conversación en <span className="font-bold">comunidad</span>
            </>
          ) : (
            <>
              Community <span className="font-bold">conversation</span>
            </>
          )}
        </h1>
      </div>

      <div className="px-5 mt-4 space-y-4">
        <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#D4C9B6]">
          <div className="flex items-center gap-2 mb-2">
            <IconBubble tone="warm" size="sm">
              <UsersIcon className="w-3.5 h-3.5 text-[#1E2760]" />
            </IconBubble>
            <p className="text-xs font-bold text-[#6B6052]">
              {currentPost.alias}
            </p>
          </div>
          <p className="text-xs text-[#1E2760] leading-relaxed">
            {currentPost.texto}
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-bold text-[#6B6052] uppercase tracking-wide">
            {currentPost.comentarios.length} {T[lang].com_comments_label}
          </p>
          {currentPost.comentarios.map((c, i) => (
            <div
              key={i}
              className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#D4C9B6]"
            >
              <p className="text-xs font-bold text-[#6B6052] mb-1">
                {c.alias}
              </p>
              <p className="text-xs text-[#1E2760] leading-relaxed">
                {c.texto}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <input
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder={T[lang].com_comment_ph}
            className="flex-1 bg-[#FAF7F2] border border-[#D4C9B6] rounded-full px-4 py-3 text-xs text-[#1E2760] focus:outline-none focus:ring-2 focus:ring-[#1E2760]"
          />
          <button
            onClick={handleComentar}
            disabled={!comentario.trim()}
            className="w-11 h-11 rounded-full bg-[#1E2760] text-white flex items-center justify-center font-bold text-sm shrink-0 active:scale-95 disabled:opacity-40"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
