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
      { label: "Nuestra Historia", href: "/nuestra-historia" },
      { label: "Viaje y Alojamiento", href: "/viaje-alojamiento" },
      { label: "Preguntas Frecuentes", href: "/faqs" },
    ],
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
          </nav>

          <div className="hidden lg:block">
            <button>Confirmar Asistencia</button>
          </div>

          {/* Mobile */}
          <button
            type="button"
            aria-label="Open menu"
            className="lg:hidden! bg-transparent! text-dark! absolute right-3 top-3"
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
