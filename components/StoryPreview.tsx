import Image from "next/image";
import Link from "next/link";

export default function StoryPreview() {
  return (
    <section className="section-shell story-intro">
      <div className="story-image"><Image src="/hero-small.jpg" alt="Un recuerdo de Danna y Fabián" fill sizes="(max-width: 600px) 240px, 350px" /></div>
      <div className="story-copy">
        <span className="eyebrow">01 / Nuestra historia</span>
        <h2 className="section-title mt-6">Una historia que se escribe con el <em>tiempo.</em></h2>
        <p>Todo comienza con pequeños momentos que, sin darse cuenta, se vuelven importantes. Esta es una historia hecha de recuerdos, caminos compartidos y capítulos que siguen escribiéndose.</p>
        <Link href="/nuestra-historia" className="text-link">Lee nuestra historia <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}
