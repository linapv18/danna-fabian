"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ArrowIcon from "@/components/ArrowIcon";

const MusicContext = createContext<() => void>(() => {});

export default function WeddingMusic({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isOrganizer = pathname === "/organizacion" || pathname.startsWith("/organizacion/");
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOrganizer) audio.current?.pause();
  }, [isOrganizer]);

  function play() {
    if (isOrganizer) return;
    const player = audio.current;
    if (!player) return;
    setError(false);
    player.volume = 0.55;
    void player.play().catch(() => { setPlaying(false); setError(true); });
  }

  return (
    <MusicContext.Provider value={play}>
      {children}
      <audio ref={audio} src="/music/cumbiana.mp3" loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); setError(true); }} />
      {!isOrganizer && <div className="wedding-music">
        {error && <p role="status" className="music-notice">No se pudo reproducir. Toca para reintentar.</p>}
        <button type="button" onClick={() => playing ? audio.current?.pause() : play()} aria-label={playing ? "Pausar música" : "Reproducir música"} aria-pressed={playing} title="Carlos Vives · Cumbiana">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {playing ? <><path d="M9 5v14M15 5v14" /></> : <path d="m9 5 10 7-10 7V5Z" />}
          </svg>
          <span>{playing ? "Pausar" : "Música"}</span>
        </button>
      </div>}
    </MusicContext.Provider>
  );
}

export function OpenInvitation({ href }: { href: string }) {
  const play = useContext(MusicContext);
  return <Link href={href} className="invitation-open" onClick={(event) => {
    if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) play();
  }}>Abrir la invitación <ArrowIcon /></Link>;
}
