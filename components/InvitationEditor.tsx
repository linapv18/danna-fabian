"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { saveInvitation } from "@/app/organizacion/actions";
export default function InvitationEditor({ invitation, onClose }: { invitation?: { id: string; name: string; seats: number; attending: boolean | null; partySize: number | null }; onClose: () => void }) {
  const router = useRouter();
  const [name, setName] = useState(invitation?.name || "");
  const [seats, setSeats] = useState(String(invitation?.seats || 1));
  const [attendance, setAttendance] = useState(invitation?.attending === true ? "yes" : invitation?.attending === false ? "no" : "pending");
  const [count, setCount] = useState(String(invitation?.partySize || invitation?.seats || 1));
  const [responseChanged, setResponseChanged] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [requestId] = useState(() => crypto.randomUUID());
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    setPending(true); setError("");
    try {
      const result = await saveInvitation({ id: invitation?.id, name, seats: Number(seats), requestId, response: responseChanged ? attendance === "pending" ? null : { attending: attendance === "yes", partySize: attendance === "yes" ? Number(count) : 0 } : undefined });
      if (result.error) setError(result.error);
      else { router.refresh(); onClose(); }
    } catch { setError("No pudimos guardar. Revisa tu conexión e intenta de nuevo."); }
    finally { setPending(false); }
  }
  return <section className="my-8 rounded-2xl border border-dark/25 bg-white/50 p-6" aria-label={invitation ? "Editar invitación" : "Agregar invitación"}><h2 className="display text-3xl mb-5">{invitation ? "Editar invitación" : "Nueva invitación"}</h2><form onSubmit={submit}><fieldset disabled={pending} className="space-y-5"><label className="block text-sm">Nombre de la persona o familia<input autoFocus required maxLength={200} value={name} onChange={e => setName(e.target.value)} className="mt-2 block w-full rounded-xl border p-3" /></label><label className="block text-sm">Cupos asignados<input required type="number" min={1} max={20} step={1} value={seats} onChange={e => setSeats(e.target.value)} className="mt-2 block w-28 rounded-xl border p-3" /></label>{invitation && <><label className="block text-sm">Asistencia<select value={attendance} onChange={e => { setAttendance(e.target.value); setResponseChanged(true); }} className="mt-2 block w-full rounded-xl border p-3"><option value="pending">Sin confirmar</option><option value="yes">Asistirá / asistirán</option><option value="no">No asistirá / no asistirán</option></select></label>{attendance === "yes" && <label className="block text-sm">Personas confirmadas<input type="number" required min={1} max={Number(seats)} step={1} value={count} onChange={e => { setCount(e.target.value); setResponseChanged(true); }} className="mt-2 block w-28 rounded-xl border p-3" /></label>}<p className="text-xs leading-6">{attendance === "pending" && invitation.attending !== null ? "Al guardar, se quitará la respuesta anterior, incluidas sus restricciones y mensaje. La invitación y su enlace se conservarán, y volverá a aparecer como sin respuesta." : "Se conserva el enlace, las restricciones alimentarias y el mensaje. La cantidad confirmada no puede superar los cupos asignados."}</p></>}<div className="flex flex-wrap gap-3"><button type="submit">{pending ? "Guardando…" : "Guardar invitación"}</button><button type="button" onClick={onClose}>Cancelar</button></div></fieldset>{error && <p role="alert" className="mt-4 text-red-800">{error}</p>}</form></section>;
}
