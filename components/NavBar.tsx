"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type NavItem = {
  label: string;
  href?: string;
  trailing?: string;
};

type NavGroup = {
  label: string;
  href?: string;
  trailing?: string;
  items: NavItem[];
};

function BurgerIcon() {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center">
      <span className="flex flex-col gap-2">
        <span className="h-[2px] w-8 bg-dark opacity-80" />
        <span className="h-[2px] w-8 bg-dark opacity-80" />
      </span>
    </span>
  );
}

function CloseIcon() {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center text-2xl leading-none">
      ×
    </span>
  );
}

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
    setInfoOpen(false);
  };

  const items: NavItem[] = useMemo(
    () => [
      { label: "Nuestra Historia", href: "/story" },
      { label: "Viaje y Alojamiento", href: "#travel" },
      { label: "Preguntas Frecuentes", href: "#faqs" },
    ],
    []
  );

  const infoGroup: NavGroup = useMemo(
    () => ({
      label: "Información",
      href: "#info",
      trailing: "›",
      items: [
        { label: "Evento", href: "#evento" },
        { label: "Menú", href: "#menu" },
      ],
    }),
    []
  );

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <header className="max-w-screen absolute top-0 left-0 right-0 z-50"> 
       <Link href="/">  
          <Image src="/monogram.svg" alt="Danna & Fabian" width={80} height={80} className="absolute top-2 left-1/2 -translate-x-1/2"/>
        </Link>
        <div className="flex items-center justify-between px-6 py-6 md:px-12 md:py-10">
          {/* Desktop */}
          <nav className="hidden lg:flex items-center gap-4 text-sm tracking-wider group/nav">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="uppercase opacity-90 group-hover/nav:opacity-50 hover:opacity-100 focus-visible:opacity-100 transition-opacity"
              >
                {item.label}
              </a>
            ))}

            {/* Información dropdown */}
            <div className="relative group">
              <a
                href={infoGroup.href}
                className="uppercase opacity-90 group-hover/nav:opacity-50 hover:opacity-100 focus-visible:opacity-100 transition-opacity inline-flex items-center"
              >
                <span>{infoGroup.label}</span>
              </a>
              <div className="pointer-events-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto transition absolute left-0 top-full pt-3">
                <div className="min-w-56 ">
                  <ul className="py-2">
                    {infoGroup.items.map((sub) => (
                      <li key={sub.label}>
                        <a
                          href={sub.href}
                          className="block px-4 py-3 uppercase tracking-wider text-xs hover:bg-dark/5"
                        >
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </nav>

          <div className="hidden lg:block">
            <button>Confirmar Asistencia</button>
          </div>

          {/* Mobile */}
          <button
            type="button"
            aria-label="Open menu"
            className="lg:hidden! bg-transparent! text-dark! fixed right-3 top-3"
            onClick={() => {
              setInfoOpen(false);
              setIsOpen(true);
            }}
          >
            <BurgerIcon />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-60 bg-background text-dark">
          <div className="flex h-full flex-col">
            <div className="flex items-center px-6 py-6">
              <button
                type="button"
                aria-label="Close menu"
                className="bg-light! text-dark! fixed right-3 top-3"
                onClick={closeMenu}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center px-10">
              <ul className="w-full max-w-sm text-center">
                {items.map((item) => (
                  <li key={item.label} className="py-8">
                    <a
                      href={item.href}
                      className="block uppercase tracking-[0.25em] hover:opacity-90"
                      onClick={closeMenu}
                    >
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}

                <li className="py-8">
                  <button
                    type="button"
                    className="bg-transparent! text-dark! p-0! font-normal! w-full justify-center uppercase tracking-[0.25em] hover:opacity-90"
                    aria-expanded={infoOpen}
                    onClick={() => setInfoOpen((v) => !v)}
                  >
                    <span className="block uppercase tracking-[0.25em] hover:opacity-90">{infoGroup.label}</span>
                    <span className="ml-3 opacity-70">{infoGroup.trailing}</span>
                  </button>

                  {infoOpen && (
                    <ul className="mt-6 space-y-5">
                      {infoGroup.items.map((sub) => (
                        <li key={sub.label}>
                          <a
                            href={sub.href}
                            className="block uppercase tracking-[0.25em] opacity-80 hover:opacity-100"
                            onClick={closeMenu}
                          >
                            {sub.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </div>

            <div className="px-10 pb-12 self-center">
              <button onClick={closeMenu}>
                CONFIRMAR ASISTENCIA
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
