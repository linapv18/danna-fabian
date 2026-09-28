"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { removeInvitation } from "@/app/organizacion/actions";
export default function OrganizerActions({ guest }: { guest: { id: string; name: string; seats: number; attending: boolean | null; partySize: number | null } }) {
  const router = useRouter();
  const [mode, setMode] = useState<"delete" | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (pending) return;
    setPending(true); setError("");
    try {
      const result = await removeInvitation(guest.id);
      if (result.error) setError(result.error);
      else { setMode(null); router.refresh(); }
    } catch { setError("No pudimos guardar el cambio. Intenta de nuevo."); }
    finally { setPending(false); }
  }
  return <div className="organizer-row-actions"><div className="flex flex-wrap gap-2"><button type="button" onClick={() => { setMode("delete"); setError(""); }} className="bg-red-800!">Borrar</button></div>{mode && <form onSubmit={submit} className="organizer-action-form rounded-xl border border-dark/20 p-4"><fieldset disabled={pending} className="space-y-4"><p className="font-medium">{`¿Borrar la invitación de ${guest.name}?`}</p><p className="text-xs leading-6">Se quitará de la lista y de los totales, y su enlace dejará de funcionar. Su respuesta se conservará en el historial.</p><div className="flex flex-wrap gap-2"><button type="submit">{pending ? "Guardando…" : "Sí, borrar"}</button><button type="button" onClick={() => setMode(null)}>Cancelar</button></div></fieldset>{error && <p role="alert" className="mt-3 text-red-800">{error}</p>}</form>}</div>;
}
