"use client";
import Link from "next/link";
import { useState } from "react";
import "./preview.css";
export default function EnvelopePreview() {
  const [open, setOpen] = useState(false);
  return <main className={`envelope-preview ${open ? "is-open" : ""}`}>
    <p className="envelope-intro">UNA INVITACIÓN PARA UN DÍA INOLVIDABLE</p>
    <div className="envelope-stage">
      <div className="envelope-back" />
      <article className="envelope-letter" aria-hidden={!open}>
        <p className="eyebrow">¡Nos casamos!</p>
        <h1>Fabián <em>&amp;</em> Danna</h1>
        <p className="envelope-date">12 · DICIEMBRE · 2026</p>
        <div className="envelope-rule" />
        <p className="eyebrow">Con mucho cariño, para</p>
        <h2>Lina Perez Vergara</h2>
        <p>Nuestro día será aún más especial<br />contigo a nuestro lado.</p>
        <p className="envelope-seat">Hemos reservado <strong>1 cupo</strong> para ti.</p>
        <Link href="/?abierta=1" tabIndex={open ? 0 : -1} className="button">Ver la invitación <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg></Link>
      </article>
      <div className="envelope-front" />
      <div className="envelope-flap" />
      <button className="envelope-seal" onClick={() => setOpen(true)} disabled={open} aria-label="Abrir el sobre de la invitación"><span>F<span>&amp;</span>D</span></button>
      <div className="envelope-address" aria-hidden={open}><p>Para</p><h2>Lina Perez Vergara</h2><span>CON TODO NUESTRO CARIÑO</span></div>
    </div>
    <p className="envelope-hint" aria-live="polite">{open ? "El comienzo de siempre." : "Toca el sello para abrir tu invitación"}</p>
    {open && <button className="envelope-replay" onClick={() => setOpen(false)}>Volver a ver el sobre</button>}
    <p className="envelope-demo">Vista previa del diseño</p>
  </main>;
}
