import Footer from "@/components/Footer";
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
      <div className="grid lg:grid-cols-2 grid-cols-1 pt-24">
        <div className="flex flex-col justify-center items-start gap-8 text-left px-[12%] py-20">
          <h1 className="section-title">
            Viaje y alojamiento
          </h1>
          <p className="eyebrow leading-6">
            Prepárate para una celebración inolvidable
          </p>
        </div>
        <div className="relative w-[88%] mx-auto lg:h-[620px] h-96 overflow-hidden rounded-t-full mb-12 mt-6">
          <Image
            src="/aduana.jpeg"
            alt="Travel"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center md:gap-10 gap-6 text-center bg-accent md:p-20 px-6 py-16 text-light">
        <h2 className="section-title">
          Hospedaje
        </h2>
        <p className="text-sm leading-7 font-normal max-w-2xl">
          Queremos que disfruten este fin de semana tan especial con total comodidad.
          Por ello, hemos obtenido una tarifa preferencial para nuestros invitados
          en el Hotel Dann Carlton Barranquilla.
        </p>
        <p className="text-sm leading-7 font-normal max-w-2xl">
          Código de reserva del matrimonio: <span className="font-medium">DOJIM</span>
        </p>
        <p className="text-sm leading-7 font-normal max-w-2xl">
          Al momento de realizar la reserva, por favor indicar este código para
          acceder a las tarifas especiales.
        </p>
        <Image
          src="/dann-hospedaje.webp"
          alt="Hotel Dann Carlton"
          width={1000}
          height={1000}
          className="w-full aspect-video object-cover rounded-sm max-w-5xl"
        />
        <div className="text-left flex flex-col gap-5 w-full max-w-5xl">
          <h4 className="text-[28px] font-light tracking-widest uppercase">
            Hotel Dann Carlton
          </h4>
          <hr className="border-light w-60 md:mb-8 mb-4" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-sm leading-7 font-normal">
            <div>
              <h5 className="font-medium">Tarifas especiales</h5>
              <p>Desde $403.410 COP por noche (IVA incluido)</p>
            </div>
            <div>
              <h5 className="font-medium">Suite</h5>
              <p>Desde $522.410 COP por noche (IVA incluido)</p>
            </div>
            <div>
              <h5 className="font-medium">Gran Suite</h5>
              <p>Desde $641.410 COP por noche (IVA incluido)</p>
            </div>
            <div>
              <h5 className="font-medium">Acomodación Adicional</h5>
              <p>Adulto adicional: $99.000 COP + IVA</p>
              <p>Niño menor de 11 años: $69.000 COP + IVA</p>
            </div>
            <div>
              <h5 className="font-medium">Beneficios Incluidos</h5>
              <ul className="list-disc list-inside">
                <li>Desayuno buffet</li>
                <li>Internet Wi-Fi</li>
                <li>Llamadas locales</li>
                <li>Parqueadero privado (sujeto a disponibilidad)</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium">Horarios</h5>
              <p>Check-in: 3:00 p.m.</p>
              <p>Check-out: 1:00 p.m.</p>
            </div>
            <div className="space-y-2">
              <h5 className="font-medium">Reservas</h5>
              <p>
                Para realizar su reserva, por favor contactar directamente al hotel
                e indicar que asistirán a nuestra boda.
              </p>
              <p>Leidy Casallas</p>
              <a className="underline break-all" href="mailto:reservas@danncarltonbaq.co">
                reservas@danncarltonbaq.co
              </a>
              <p>Margot Ruda</p>
              <a className="underline break-all" href="mailto:reservas2@danncarltonbaq.co">
                reservas2@danncarltonbaq.co
              </a>
              <p>(605) 367 7777 Ext. 221 y 219</p>
            </div>
          </div>
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
      <Footer />
    </div>
  );
}
