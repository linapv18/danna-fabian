export default function Quote() {
  return (
    <section className="quote-section">
      <svg className="mx-auto h-9 w-9 text-lightaccent" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true" focusable="false">
        <path d="M20 4v32M4 20h32M8.7 8.7l22.6 22.6M8.7 31.3 31.3 8.7" />
      </svg>
      <blockquote className="display">“Amar no es mirarse el uno al otro; es mirar juntos en la misma dirección.”</blockquote>
      <p className="eyebrow">Antoine de Saint-Exupéry</p>
    </section>
  );
}
