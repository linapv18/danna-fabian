"use client";

import ArrowIcon from "@/components/ArrowIcon";


import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const items = [
  { label: "Nuestra historia", href: "/nuestra-historia" },
  { label: "Viaje y alojamiento", href: "/viaje-alojamiento" },
  { label: "Preguntas frecuentes", href: "/faqs" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => { document.body.style.overflow = previous; };
  }, [isOpen]);
  return (
    <>
      <header className="nav-shell">
        <Link href="/" className="display nav-brand" aria-label="Fabián y Danna , inicio">D<span className="text-lightaccent italic">&amp;</span>F</Link>
        <nav aria-label="Navegación principal" className="nav-links">{items.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</nav>
        <Link href="/rsvp" className="button nav-rsvp">Confirmar asistencia <ArrowIcon /></Link>
        <button className="mobile-toggle" aria-expanded={isOpen} aria-controls="mobile-menu" onClick={() => setIsOpen(true)}>Menú <span aria-hidden="true">☰</span></button>
      </header>
      {isOpen && <dialog ref={dialog} id="mobile-menu" aria-label="Menú de navegación" onCancel={() => setIsOpen(false)} className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-background text-dark p-7 backdrop:bg-dark/30">
        <div className="flex justify-between items-center"><span className="display text-3xl">D &amp; F</span><button autoFocus onClick={() => setIsOpen(false)} aria-label="Cerrar menú">Cerrar ×</button></div>
        <nav className="flex h-4/5 flex-col justify-center gap-10" aria-label="Navegación móvil">{items.map(item => <Link className="display text-4xl" key={item.href} href={item.href} onClick={() => setIsOpen(false)}>{item.label}</Link>)}<Link className="text-link self-start" href="/rsvp" onClick={() => setIsOpen(false)}>Confirmar asistencia <ArrowIcon /></Link></nav>
      </dialog>}
    </>
  );
}
