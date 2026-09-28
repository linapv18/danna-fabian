export default function Gifts() {
  return (
    <section className="section-shell text-center" aria-labelledby="gifts-title">
      <svg className="mx-auto mb-6 h-12 w-12 text-lightaccent" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <rect x="5" y="13" width="38" height="26" rx="2" />
        <path d="m6 15 18 14 18-14M6 38l12-12m24 12L30 26M24 3v6m-3-3h6" />
      </svg>
      <p className="eyebrow mb-6 text-lightaccent">Lluvia de sobres</p>
      <h2 id="gifts-title" className="section-title mx-auto max-w-3xl">Su compañía es<br />nuestro mejor regalo.</h2>
      <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-dark/80">Pero si desean hacernos un detalle, hemos dispuesto una lluvia de sobres para quienes quieran contribuir a esta nueva etapa que comenzamos juntos. ✨</p>
    </section>
  );
}
