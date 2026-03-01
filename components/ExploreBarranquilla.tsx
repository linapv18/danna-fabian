"use client";

import Image from "next/image";
import { useState } from "react";

type SectionId = "meal" | "culture" | "things";

const ExploreBarranquilla = () => {
  const [open, setOpen] = useState<SectionId | null>("meal");

  const toggle = (id: SectionId) => {
    setOpen((current) => (current === id ? null : id));
  };

  return (
    <section className="flex flex-col items-center gap-10 p-10 md:p-20">
      <h2 className="lg:text-5xl text-3xl font-light tracking-wide text-center">
        EXPLORA BARRANQUILLA
      </h2>

      <div className="grid lg:grid-cols-2 grid-cols-1 w-full max-w-5xl items-start lg:items-center">
        <div className="flex flex-col gap-8">
          <div className="border-y border-dark/20 divide-y divide-dark/20">
            <div>
              <button
                type="button"
                onClick={() => toggle("meal")}
                aria-expanded={open === "meal"}
                className="group flex w-full items-center justify-between! px-0! py-5 text-left bg-transparent! text-dark! border-none! shadow-none! rounded-none!"
              >
                <span className="tracking-[0.25em] text-xs md:text-sm uppercase font-normal">
                  Para una comida memorable
                </span>
                <span className="flex items-center text-xl md:text-2xl leading-none">
                  {open === "meal" ? "−" : "+"}
                </span>
              </button>
              {open === "meal" && (
                <div className="pb-6 md:pb-8">
                  <p className="text-xs font-extralight mb-3 uppercase tracking-wide text-center">
                    Se recomienda hacer reserva con anticipación
                  </p>
                  <ul className="list-disc list-inside flex flex-col gap-3 text-sm text-left">
                    <li>
                      <a
                        href="https://www.instagram.com/emilianorestaurante/?hl=es"
                        className="underline text-lightaccent font-bold tracking-wider"
                      >
                        Emiliano
                      </a>{" "}
                      — Restaurante vibrante donde la música es protagonista.
                      Perfecto para una cena animada con buena comida y
                      cocteles.
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/cuzcobarranquilla/?hl=es"
                        className="underline text-lightaccent font-bold tracking-wider"
                      >
                        Cuzco
                      </a>{" "}
                      — Cocina peruana contemporánea en un espacio elegante y
                      acogedor. Ideal para disfrutar ceviches frescos y platos
                      bien ejecutados.
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/manuelrestaurante/?hl=es"
                        className="underline text-lightaccent font-bold tracking-wider"
                      >
                        Manuel
                      </a>{" "}
                      — Cocina colombiana moderna, reconocido en Latin
                      America&apos;s 50 Best Restaurants. Ideal para una
                      experiencia gastronómica especial.
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/devoto_col/?hl=es"
                        className="underline text-lightaccent font-bold tracking-wider"
                      >
                        Devoto
                      </a>{" "}
                      — Cocina ítalo-americana con pizzas artesanales y pastas
                      hechas en casa, en un espacio acogedor y con mucha
                      personalidad.
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/devoto_col/?hl=es"
                        className="underline text-lightaccent font-bold tracking-wider"
                      >
                        Kinto Elemento
                      </a>{" "}
                      — Cocina nikkei con sushi impecable y coctelería bien
                      lograda, en un ambiente moderno y lleno de energía.
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div>
              <button
                type="button"
                onClick={() => toggle("culture")}
                aria-expanded={open === "culture"}
                className="flex w-full items-center justify-between! px-0! py-5 text-left bg-transparent! text-dark! border-none! shadow-none! rounded-none!"
              >
                <span className="tracking-[0.25em] text-xs md:text-sm uppercase font-normal">
                  Museos &amp; cultura
                </span>
                <span className="flex items-center text-xl md:text-2xl leading-none">
                  {open === "culture" ? "−" : "+"}
                </span>
              </button>
              {open === "culture" && (
                <div className="pb-6 md:pb-8">
                  <ul className="list-disc list-inside flex flex-col gap-3 text-sm text-left">
                    <li>
                      <a
                        href="https://www.instagram.com/museocarnavalbq/?hl=es"
                        className="font-semibold tracking-wide text-lightaccent underline"
                      >
                        Museo del Carnaval
                      </a>{" "}
                      — Una inmersión vibrante en la historia y tradición del
                      Carnaval de Barranquilla, Patrimonio de la Humanidad.
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/elcitylover/?hl=es"
                        className="font-semibold tracking-wide text-lightaccent underline"
                      >
                        City Lovers Barranquilla
                      </a>{" "}
                      — Tours y experiencias guiadas para descubrir la historia,
                      arquitectura y esencia cultural de la ciudad desde una
                      mirada local.
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/aduanapianobar/?hl=es"
                        className="font-semibold tracking-wide text-lightaccent underline"
                      >
                        Aduana Piano Bar
                      </a>{" "}
                      — Espacio emblemático de la escena cultural local, donde
                      la música en vivo y la tradición bohemia siguen marcando
                      historia.
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Cosas para hacer */}
            <div>
              <button
                type="button"
                onClick={() => toggle("things")}
                aria-expanded={open === "things"}
                className="group flex w-full items-center justify-between! px-0! py-5 text-left bg-transparent! text-dark! border-none! shadow-none! rounded-none!"
              >
                <span className="tracking-[0.25em] text-xs md:text-sm uppercase font-normal">
                  Cosas para hacer
                </span>
                <span className="flex items-center text-xl md:text-2xl leading-none">
                  {open === "things" ? "−" : "+"}
                </span>
              </button>
              {open === "things" && (
                <div className="pb-6 md:pb-8">
                  <ul className="list-disc list-inside flex flex-col gap-3 text-sm text-left">
                    <li>
                      <a
                        href="https://www.instagram.com/granmaleconbaq/?hl=es"
                        className="font-semibold tracking-wide text-lightaccent underline"
                      >
                        Gran Malecón del Rio
                      </a>{" "}
                      — El plan infalible al atardecer. Camina junto al río
                      Magdalena, disfruta la brisa y siéntate a ver cómo cambia
                      el cielo sobre el agua.
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/playapuertomocho/?hl=es"
                        className="font-semibold tracking-wide text-lightaccent underline"
                      >
                        Puerto Mocho
                      </a>{" "}
                      — La playa local por excelencia. Perfecta para un día
                      relajado de sol, mar y comida típica.
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/cienagademallorquin/?hl=es"
                        className="font-semibold tracking-wide text-lightaccent underline"
                      >
                        Ciénaga de Mallorquín
                      </a>{" "}
                      — Naturaleza y manglares a pocos minutos de la ciudad.
                      Ideal para senderismo suave y avistamiento de aves
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/muelle1888/?hl=es"
                        className="font-semibold tracking-wide text-lightaccent underline"
                      >
                        Muelle de Puerto Colombia
                      </a>{" "}
                      — Un atardecer frente al Caribe en un muelle histórico
                      recientemente renovado.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:pl-10 pt-2">
          <Image
            src="/barranquilla.jpg"
            alt="Barranquilla"
            width={400}
            height={1000}
            className="opacity-80 max-h-[600px] object-cover aspect-square md:aspect-video md:w-full lg:aspect-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default ExploreBarranquilla;
