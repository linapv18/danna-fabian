import ArrowIcon from "@/components/ArrowIcon";
import Link from "@/components/InvitationLink";

export default function QuickLinks() {
  return (
    <section className="quick-grid">
      <div className="quick-card"><p className="eyebrow">Todo lo que necesitas saber</p><h2>Preguntas frecuentes</h2><p>Visita nuestra sección de preguntas frecuentes para encontrar toda la información que necesitas.</p><Link href="/faqs" className="text-link">Ver preguntas <ArrowIcon /></Link></div>
      <div className="quick-card"><p className="eyebrow">Estamos para ayudarte</p><h2>Contáctanos</h2><p>Si tienen alguna pregunta o necesitan más información, no duden en ponerse en contacto con nosotros.</p><a href="https://wa.link/eae769" className="text-link" target="_blank" rel="noopener noreferrer">Escríbenos <ArrowIcon /></a></div>
    </section>
  );
}
