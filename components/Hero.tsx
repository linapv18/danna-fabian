import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Nos vamos a casar</p>
        <h1 className="hero-title">Danna<br /><em>&amp;</em> Fabián</h1>
        <div className="flex items-center gap-5 mb-9">
          <span className="display text-5xl">12</span>
          <span className="h-10 w-px bg-dark/25" />
          <p className="eyebrow leading-6">Diciembre · 2026<br />Barranquilla, Colombia</p>
        </div>
        <a href="#celebracion" className="text-link">Nuestro gran día <span aria-hidden="true">↘</span></a>
      </div>
      <div className="hero-photo">
        <Image src="/hero-big.jpg" alt="Danna y Fabián juntos" fill priority sizes="(max-width: 900px) 100vw, 52vw" />
        <div className="hero-caption"><span className="eyebrow">El comienzo de siempre</span><span className="display text-4xl">D &amp; F</span></div>
      </div>
    </section>
  );
}
