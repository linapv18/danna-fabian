import type { Metadata } from "next";

import ExploreBarranquilla from "@/components/ExploreBarranquilla";
import NavBar from "@/components/NavBar";
import ReserveButton from "@/components/ReserveButton";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Viaje y Alojamiento",
};

export default function TravelPage() {
  return (
    <div>
      <NavBar />
      <div className="grid lg:grid-cols-2 grid-cols-1">
        <div className="flex flex-col justify-end items-center lg:gap-50 gap-24 md:gap-12 text-center md:py-60 lg:py-24 py-40">
          <h1 className="lg:text-7xl text-4xl font-light tracking-widest">
            VIAJE Y ALOJAMIENTO
          </h1>
          <p className="lg:text-xl text-base tracking-widest font-extralight uppercase">
            Prepárate para una celebración inolvidable
          </p>
        </div>
        <div className="relative w-full lg:h-screen md:h-[600px] opacity-60 h-92">
          <Image
            src="/aduana.jpeg"
            alt="Travel"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center md:gap-10 gap-5 text-center bg-accent md:p-20 p-6 text-light">
        <h2 className="lg:text-5xl text-3xl font-light tracking-wide">
          HOSPEDAJE
        </h2>
        <p className="lg:text-lg text-sm tracking-widest font-extralight uppercase md:max-w-2/3">
          Hemos obtenido un descuento especial para nuestros invitados en el
          Hotel Dann Carlton, cuando reserves por favor utiliza el código:{" "}
          <span className="font-medium">DANNA26</span>
        </p>
        <Image
          src="/dann-hospedaje.webp"
          alt="Hotel Dann Carlton"
          width={1000}
          height={1000}
          className="opacity-70 aspect-video"
        />
        <div className="text-left flex flex-col md:gap-5 gap-3 md:max-w-4/5">
          <h4 className="text-[28px] font-light tracking-widest uppercase">
            Hotel Dann Carlton
          </h4>
          <hr className="border-light w-60 md:mb-8 mb-4" />
          <p className="text-sm tracking-widest font-extralight">
            Hotel Dann Carlton Barranquilla se erige como una de las direcciones
            hoteleras más prestigiosas de la ciudad, con un exterior distinguido
            Por la elegancia y la presencia imponente, las líneas limpias y el
            diseño clásico definen la fachada, reflejando su condición de
            destino de primer nivel.{" "}
          </p>
          <p className="text-base tracking-widest font-extralight uppercase">
            dirección:{" "}
            <a
              href="https://maps.app.goo.gl/f8UM1JvVxeB4K6Xh9"
              className="underline"
            >
              Cl. 98 #52B-10, Riomar
            </a>
          </p>
          <ReserveButton />
        </div>
      </div>
      <ExploreBarranquilla />
      <div className="bg-dark h-12"> </div>
    </div>
  );
}
