"use client";
import { OpenInvitation } from "@/components/WeddingMusic";
import type { Invitation } from "@/lib/invitations";
import { useEffect, useRef, useState } from "react";
import "./InvitationCover.css";
export default function InvitationCover({ invitation, token }: { invitation: Invitation; token: string }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);
  function closeEnvelope() {
    if (closing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setOpen(false); return; }
    setClosing(true);
    closeTimer.current = setTimeout(() => { setOpen(false); setClosing(false); }, 1400);
  }
  return <main className={`envelope-preview ${open ? "is-open" : ""} ${closing ? "is-closing" : ""}`}>
    <p className="envelope-intro">UNA INVITACIÓN PARA UN DÍA INOLVIDABLE</p>
    <div className="envelope-stage">
      <div className="envelope-back" />
      <article className="envelope-letter" aria-hidden={!open || closing} inert={!open || closing}>
        <p className="eyebrow">¡Nos casamos!</p>
        <h1>Fabián <em>&amp;</em> Danna</h1>
        <p className="envelope-date">12 · DICIEMBRE · 2026</p>
        <div className="envelope-rule" />
        <p className="eyebrow">Con mucho cariño, para</p>
        <h2>{invitation.name}</h2>
        <p>Nuestro día será aún más especial<br />{invitation.seats === 1 ? "contigo a nuestro lado." : "con ustedes a nuestro lado."}</p>
        <p className="envelope-seat">Hemos reservado <strong>{invitation.seats} {invitation.seats === 1 ? "cupo" : "cupos"}</strong> para {invitation.seats === 1 ? "ti" : "ustedes"}.</p>
        <OpenInvitation href={`/?token=${encodeURIComponent(token)}&abierta=1`} />
      </article>
      <div className="envelope-front" />
      <div className="envelope-flap" />
      <button className="envelope-seal" onClick={() => setOpen(true)} disabled={open} aria-label="Abrir el sobre de la invitación"><span>F<span>&amp;</span>D</span></button>
      <div className="envelope-address" aria-hidden={open}><p>Para</p><h2>{invitation.name}</h2><span>CON TODO NUESTRO CARIÑO</span></div>
    </div>
    <p className="envelope-hint" aria-live="polite">{open ? "El comienzo de siempre." : "Toca el sello para abrir tu invitación"}</p>
    {open && <button className="envelope-replay" onClick={closeEnvelope} disabled={closing}>Volver a ver el sobre</button>}

  </main>;
}
