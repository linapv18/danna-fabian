import ArrowIcon from "@/components/ArrowIcon";
import Image from "next/image";
import Link from "next/link";

export default function VenueDetails() {
  return (
    <section className="section-shell venue-grid">
      <div className="venue-photo"><Image src="/church.jpg" alt="Lugar de la ceremonia" fill sizes="(max-width: 600px) 100vw, 45vw" /></div>
      <div>
        <p className="eyebrow mb-6">03 / Nos encontramos aquí</p>
        <h2 className="section-title">Ubicación</h2>
        <div className="venue-card"><p className="eyebrow">Ceremonia</p><h3>Parroquia Inmaculada Concepción</h3><a href="https://www.google.com/maps/search/?api=1&query=Parroquia+Inmaculada+Concepcion+Barranquilla">Cra. 57 #68-85, Nte. Centro Histórico <ArrowIcon /></a></div>
        <div className="venue-card"><p className="eyebrow">Recepción</p><h3>Hotel Dann Carlton</h3><a href="https://maps.app.goo.gl/f8UM1JvVxeB4K6Xh9">Cl. 98 #52B-10, Riomar <ArrowIcon /></a></div>
        <Link href="/viaje-alojamiento" className="button mt-8">Viaje y alojamiento <ArrowIcon /></Link>
      </div>
    </section>
  );
}
