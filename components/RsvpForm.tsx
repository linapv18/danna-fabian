"use client";
import { useState, type FormEvent } from "react";
import ArrowIcon from "@/components/ArrowIcon";
import type { Invitation } from "@/lib/invitations";
const field = "mt-2 w-full rounded-xl border border-dark/25 bg-white/50 px-4 py-3 text-base focus:border-dark";

export default function RsvpForm({ token, invitation }: { token: string; invitation: Invitation }) {
  const singleGuest = invitation.seats === 1;
  const [attending, setAttending] = useState(invitation.response ? invitation.response.attending ? "yes" : "no" : "");
  const [partySize, setPartySize] = useState(Math.min(invitation.seats, invitation.response?.partySize || invitation.seats));
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(Boolean(invitation.response));
  const [dietary, setDietary] = useState(invitation.response?.dietary || "");
  const [message, setMessage] = useState(invitation.response?.message || "");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const data = new FormData(event.currentTarget);
    setPending(true); setError("");
    try {
      const response = await fetch("/api/rsvp", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, attending: attending === "yes", partySize: attending === "yes" ? partySize : 0, dietary, message, website: data.get("website") }) });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "No pudimos guardar tu respuesta.");
      setDone(true);
    } catch (e) { setError(e instanceof Error ? e.message : "Revisa tu conexión e intenta nuevamente."); }
    finally { setPending(false); }
  }
  if (done) return <div role="status" className="rounded-2xl bg-dark px-7 py-12 text-light"><p className="eyebrow mb-4">Ya recibimos tu respuesta</p><h3 className="display text-4xl">¡Gracias, {invitation.name}!</h3><p className="my-6 leading-7">{attending === "yes" ? (singleGuest ? "Nos encantará celebrar contigo. Tu asistencia está confirmada." : `Nos encantará celebrar con ustedes. Confirmamos ${partySize} ${partySize === 1 ? "asistente" : "asistentes"}.`) : (singleGuest ? "Gracias por hacérnoslo saber. Te tendremos presente en este día tan especial." : "Gracias por hacérnoslo saber. Les tendremos presentes en este día tan especial.")}</p><button onClick={() => setDone(false)} className="bg-light! text-dark!">Editar respuesta <ArrowIcon /></button></div>;
  return <form onSubmit={submit} className="space-y-7">
    <p className="text-sm leading-7">Nuestra celebración es exclusivamente para adultos. {singleGuest ? "Confirma si podrás acompañarnos." : "Confirma cuántas personas de esta invitación podrán acompañarnos."}</p>
    <fieldset disabled={pending} className="space-y-7 disabled:opacity-60"><legend className="sr-only">Confirmación para {invitation.name}</legend>
      <fieldset><legend className="text-sm font-medium mb-3">{singleGuest ? "¿Nos acompañarás?" : "¿Nos acompañarán?"} *</legend><div className="grid gap-3 sm:grid-cols-2">{[["yes", singleGuest ? "Sí, ¡allí estaré!" : "Sí, ¡allí estaremos!"], ["no", singleGuest ? "No podré asistir" : "No podremos asistir"]].map(([value, label]) => <label key={value} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm ${attending === value ? "border-dark bg-dark/5" : "border-dark/20"}`}><input type="radio" name="attending" value={value} required checked={attending === value} onChange={() => setAttending(value)} className="accent-dark" />{label}</label>)}</div></fieldset>
      {attending === "yes" && <div className="space-y-6">{!singleGuest && <label className="block text-sm font-medium">¿Cuántas personas asistirán? *<select className={field} value={partySize} onChange={e => setPartySize(Number(e.target.value))}>{Array.from({length:invitation.seats}, (_, i) => <option key={i+1} value={i+1}>{i+1} {i === 0 ? "persona" : "personas"}</option>)}</select></label>}<p className="text-xs leading-6">{singleGuest ? "Tienes 1 cupo reservado." : `La cantidad incluye a todas las personas de esta invitación. Tienen ${invitation.seats} cupos reservados.`}</p><label className="block text-sm font-medium">Restricciones alimentarias (opcional)<textarea rows={3} maxLength={1000} className={field} value={dietary} onChange={e => setDietary(e.target.value)} placeholder={singleGuest ? "Indica si tienes alguna restricción alimentaria." : "Indica a quién corresponde cada restricción."} /></label></div>}
      <label className="block text-sm font-medium">Un mensaje para nosotros (opcional)<textarea rows={3} maxLength={2000} className={field} value={message} onChange={e => setMessage(e.target.value)} /></label>
      <div hidden aria-hidden="true"><label>Sitio web<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="text-xs leading-6 text-dark/75">Esta respuesta quedará asociada a {invitation.name}. Usaremos estos datos únicamente para organizar la boda.</p>
      <button disabled={pending} type="submit" className="w-full sm:w-auto disabled:cursor-wait">{pending ? "Guardando…" : "Guardar confirmación"}<ArrowIcon /></button>
    </fieldset>{error && <p role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900">{error}</p>}
  </form>;
}
