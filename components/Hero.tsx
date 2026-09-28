import type { Invitation } from "@/lib/invitations";
import ArrowIcon from "@/components/ArrowIcon";
import Image from "next/image";

export default function Hero({ invitation }: { invitation?: Invitation | null }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Nos vamos a casar</p>
        {invitation && <div className="mt-6 max-w-full"><p className="eyebrow mb-2">Esta invitación es para</p><p className="display text-2xl md:text-3xl leading-tight break-words">{invitation.name}</p><p className="text-sm mt-3">Hemos reservado <strong>{invitation.seats} {invitation.seats === 1 ? "cupo" : "cupos"}</strong> para {invitation.seats === 1 ? "ti" : "ustedes"}.</p></div>}
        <h1 className="hero-title">Danna<br /><em>&amp;</em> Fabián</h1>
        <div className="flex items-center gap-5 mb-9">
          <span className="display text-5xl">12</span>
          <span className="h-10 w-px bg-dark/25" />
          <p className="eyebrow leading-6">Diciembre · 2026<br />Barranquilla, Colombia</p>
        </div>
        <a href="#celebracion" className="text-link">Nuestro gran día <ArrowIcon direction="down-right" /></a>
      </div>
      <div className="hero-photo">
        <Image src="/hero-big.jpg" alt="Fabián y Danna  juntos" fill priority sizes="(max-width: 900px) 100vw, 52vw" />
        <div className="hero-caption"><span className="eyebrow">El comienzo de siempre</span><span className="display text-4xl">D &amp; F</span></div>
      </div>
    </section>
  );
}
