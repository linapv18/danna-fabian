import Countdown from "@/components/Countdown";

export default function Schedule() {
  return (
    <section id="celebracion" className="schedule">
      <div className="section-shell">
        <div className="schedule-heading">
          <div><p className="eyebrow mb-6 text-[#c3cbaa]">02 / El gran día</p><h2 className="section-title">La ceremonia</h2></div>
          <p className="eyebrow">Sábado, 12 de diciembre de 2026</p>
        </div>
        <div className="ceremony-details">
          <div><time className="display ceremony-time" dateTime="2026-12-12T19:30:00-05:00">7:30 <span>p. m.</span></time><p className="eyebrow mt-5">Hora de Barranquilla, Colombia</p></div>
          <p className="ceremony-note">Cada vez falta menos<br />para celebrar juntos.</p>
        </div>
        <Countdown />
      </div>
    </section>
  );
}
