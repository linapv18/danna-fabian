"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";

const field = "mt-2 w-full rounded-xl border border-dark/25 bg-white/50 px-4 py-3 text-base outline-offset-4 focus:border-dark";

export default function RsvpForm() {
  const [attending, setAttending] = useState("");
  const [companions, setCompanions] = useState<string[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const submissionId = useRef("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setError("");
    const data = new FormData(event.currentTarget);
    submissionId.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId: submissionId.current, name: data.get("name"), email: data.get("email"), attending: attending === "yes", companions: attending === "yes" ? companions : [], dietary: data.get("dietary") ?? "", message: data.get("message"), website: data.get("website") }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "No pudimos guardar tu respuesta. Intenta nuevamente.");
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No pudimos conectar. Revisa tu conexión e intenta nuevamente.");
    } finally { setPending(false); }
  }

  if (done) return <div role="status" className="rounded-2xl bg-dark px-7 py-12 text-light"><p className="eyebrow mb-4">Respuesta guardada</p><h2 className="text-4xl">¡Gracias por confirmarnos!</h2><p className="my-6 leading-7">{attending === "yes" ? "Nos hace muy felices compartir este día contigo. ¡Nos vemos en la boda!" : "Gracias por hacérnoslo saber. Te tendremos presente en este día tan especial."}</p><Link href="/" className="button bg-light! text-dark!">Volver al inicio <ArrowIcon /></Link></div>;

  return <form onSubmit={submit} className="space-y-7">
    <fieldset disabled={pending} className="space-y-7 disabled:opacity-60">
      <legend className="sr-only">Confirmación de asistencia</legend>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="text-sm font-medium">Nombre completo *<input name="name" autoComplete="name" required minLength={2} maxLength={120} className={field} /></label>
        <label className="text-sm font-medium">Correo electrónico *<input name="email" type="email" autoComplete="email" required maxLength={254} className={field} /></label>
      </div>
      <fieldset><legend className="text-sm font-medium mb-3">¿Podrás acompañarnos? *</legend><div className="grid gap-3 sm:grid-cols-2">{[["yes", "Sí, ¡allí estaré!"], ["no", "No podré asistir"]].map(([value, label]) => <label key={value} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm ${attending === value ? "border-dark bg-dark/5" : "border-dark/20"}`}><input type="radio" name="attending" value={value} required checked={attending === value} onChange={() => setAttending(value)} className="accent-dark" />{label}</label>)}</div></fieldset>
      {attending === "yes" && <div className="space-y-6">
        <label className="block text-sm font-medium">Acompañantes incluidos en tu invitación<select className={field} value={companions.length} onChange={e => setCompanions(previous => Array.from({length: Number(e.target.value)}, (_, i) => previous[i] || ""))}>{Array.from({length: 10}, (_, i) => <option key={i} value={i}>{i === 0 ? "Asistiré sin acompañantes" : `${i} ${i === 1 ? "acompañante" : "acompañantes"}`}</option>)}</select></label>
        {companions.map((name, index) => <label key={index} className="block text-sm font-medium">Nombre del acompañante {index + 1} *<input required minLength={2} maxLength={120} value={name} className={field} onChange={e => setCompanions(previous => previous.map((n, i) => i === index ? e.target.value : n))} /></label>)}
        <label className="block text-sm font-medium">Restricciones alimentarias (opcional)<textarea name="dietary" rows={3} maxLength={1000} className={field} placeholder="Indica a quién corresponde cada restricción." /></label>
      </div>}
      <label className="block text-sm font-medium">Un mensaje para nosotros (opcional)<textarea name="message" rows={3} maxLength={2000} className={field} /></label>
      <div hidden aria-hidden="true"><label>Sitio web<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="text-xs leading-6 text-dark/75">Usaremos estos datos únicamente para organizar la boda y gestionar tu asistencia. Los campos con * son obligatorios.</p>
      <button disabled={pending} type="submit" className="w-full sm:w-auto disabled:cursor-wait">{pending ? "Guardando respuesta…" : "Enviar confirmación"}<ArrowIcon /></button>
    </fieldset>
    {error && <p role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900">{error}</p>}
  </form>;
}
