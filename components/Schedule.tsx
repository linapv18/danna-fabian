export default function Schedule() {
  return (
    <section id="celebracion" className="schedule">
      <div className="section-shell">
        <div className="schedule-heading">
          <div><p className="eyebrow mb-6 text-[#c3cbaa]">02 / El gran día</p><h2 className="section-title">Cronograma</h2></div>
          <p className="eyebrow">Sábado, 12 de diciembre de 2026</p>
        </div>
        <div className="timeline">
          {[['5:00 PM', 'Ceremonia'], ['7:00 PM', 'Coctel'], ['8:00 PM', 'Cena']].map(([time, title]) => (
            <div className="timeline-item" key={title}><p className="timeline-time">{time}</p><h3 className="display timeline-title">{title}</h3></div>
          ))}
        </div>
      </div>
    </section>
  );
}
