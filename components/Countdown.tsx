"use client";

import { useEffect, useState } from "react";

// 7:30 p. m. in Barranquilla (UTC-5).
const ceremonyTime = Date.parse("2026-12-12T19:30:00-05:00");

export default function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setRemaining(Math.max(0, Math.floor((ceremonyTime - Date.now()) / 1000)));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (remaining === 0) return <p className="display text-3xl mt-10">¡Llegó el momento de celebrar!</p>;
  const units = [
    ["Días", remaining === null ? null : Math.floor(remaining / 86400)],
    ["Horas", remaining === null ? null : Math.floor(remaining / 3600) % 24],
    ["Minutos", remaining === null ? null : Math.floor(remaining / 60) % 60],
    ["Segundos", remaining === null ? null : remaining % 60],
  ] as const;
  return <div className="ceremony-countdown" role="timer" aria-label="Tiempo restante para la ceremonia" aria-live="off">
    {units.map(([label, value]) => <div key={label}><span className="countdown-number">{value === null ? "—" : String(value).padStart(2, "0")}</span><span className="countdown-label">{label}</span></div>)}
  </div>;
}
