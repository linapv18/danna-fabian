import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

import NavBar from "@/components/NavBar";
import StickyStory from "@/components/StoryCollage";

export const metadata: Metadata = {
  title: "Nuestra Historia",
};

export default function StoryPage() {
  return (
    <div>
      <NavBar />
      <StickyStory />
      <div className="flex flex-col items-center justify-center gap-12 text-center mb-20 md:mb-40">
        <div className="text-left text-base leading-8 max-w-2xl px-7 mx-auto mt-8 md:mt-12 space-y-6">
          <p>De todas las historias que pudo escribir el destino, nuestra favorita es la que nos encontró el uno al otro.</p>
          <p>Nuestra historia comenzó de una manera inesperada en Santa Marta. Fue allí donde compartimos nuestras primeras conversaciones, entre risas y momentos que, sin saberlo, marcarían el inicio de algo muy especial.</p>
          <p>Lo que comenzó con una conversación se convirtió en una conexión única que creció día a día, transformándose en un amor sincero, lleno de confianza, complicidad y sueños compartidos. Juntos hemos vivido aventuras, creado recuerdos inolvidables y descubierto la felicidad de caminar de la mano hacia un mismo destino.</p>
          <p>Hoy, con el corazón lleno de amor y gratitud, damos el paso más importante de nuestras vidas. Miramos hacia el futuro con ilusión y emoción, agradecidos por todo lo vivido y por todo lo que está por venir.</p>
          <p>Gracias por acompañarnos en este día tan especial y por ser parte del comienzo de este nuevo capítulo: nuestra vida juntos.</p>
        </div>
        <div>
          <p className="text-center text-xl tracking-wide font-light md:max-w-3xl max-w-xs mx-auto md:text-2xl mb-4 uppercase">
            Confirma tu asistencia para acompañarnos y hacer parte de esta
            inolvidable celebración!
          </p>
          <Link href="/rsvp" className="button">Confirmar asistencia <ArrowIcon /></Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
