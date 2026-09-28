"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export type GuestRow = { id: string; invitationUrl: string; name: string; seats: number; attending: boolean | null; partySize: number | null; dietary: string | null; message: string | null; updated: string | null };
const status = (r: GuestRow) => r.attending === null ? "Sin respuesta" : r.attending ? "Asistirán" : "No asistirán";
const date = (value: string) => new Date(value).toLocaleString("es-CO", { timeZone: "America/Bogota" });
export default function GuestReport({ rows, loadedAt }: { rows: GuestRow[]; loadedAt: string }) {
  const router = useRouter();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copyError, setCopyError] = useState("");
  async function copyLink(row: GuestRow) {
    setCopyError("");
    try {
      await navigator.clipboard.writeText(row.invitationUrl);
      setCopiedId(row.id);
      setTimeout(() => setCopiedId(current => current === row.id ? null : current), 2000);
    } catch {
      setCopyError("No se pudo copiar el enlace. Revisa el permiso del portapapeles e intenta de nuevo.");
    }
  }
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todas");
  const normalize = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const visible = rows.filter(r => (filter === "Todas" || status(r) === filter) && normalize(r.name).includes(normalize(search)));
  function download() {
    // Prevent spreadsheet programs from treating guest-provided text as formulas.
    const cell = (v: unknown) => { let s = String(v ?? ""); if (/^[\s]*[=+@-]/.test(s)) s = "'" + s; return '"' + s.replaceAll('"', '""') + '"'; };
    const values = [["Invitación", "Estado", "Cupos asignados", "Personas confirmadas", "Restricciones alimentarias", "Mensaje", "Última respuesta (Colombia)", "Enlace de invitación"], ...visible.map(r => [r.name, status(r), r.seats, r.partySize ?? "", r.dietary, r.message, r.updated ? date(r.updated) : "", r.invitationUrl])];
    const url = URL.createObjectURL(new Blob(["\uFEFF" + values.map(r => r.map(cell).join(";")).join("\r\n")], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = "confirmaciones-boda.csv"; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const stats = [
    ["Personas confirmadas", rows.reduce((n, r) => n + (r.attending ? r.partySize || 0 : 0), 0)],
    ["Invitaciones que asistirán", rows.filter(r => r.attending === true).length],
    ["Invitaciones que no asistirán", rows.filter(r => r.attending === false).length],
    ["Invitaciones sin respuesta", rows.filter(r => r.attending === null).length],
  ];
  return <><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{stats.map(([label, count]) => <div key={label} className="rounded-2xl border border-dark/20 p-6"><p className="display text-5xl mb-3">{count}</p><p className="text-sm">{label}</p></div>)}</div><p className="my-6 text-sm leading-7">{rows.length} invitaciones · {rows.reduce((n, r) => n + r.seats, 0)} cupos asignados. Las confirmaciones se registran por invitación o familia, no por nombre de cada acompañante.</p><div className="flex flex-wrap gap-4 items-end my-8"><label className="text-sm flex-1 min-w-48">Buscar invitación<input value={search} onChange={e => setSearch(e.target.value)} placeholder="Nombre o familia" className="block w-full border border-dark/25 rounded-xl p-3 mt-2" /></label><label className="text-sm">Estado<select value={filter} onChange={e => setFilter(e.target.value)} className="block border border-dark/25 rounded-xl p-3 mt-2">{["Todas", "Asistirán", "No asistirán", "Sin respuesta"].map(x => <option key={x}>{x}</option>)}</select></label><button onClick={() => router.refresh()}>Actualizar</button><button onClick={download}>Descargar CSV para Excel</button></div><p className="text-xs mb-5">{visible.length} invitaciones visibles · Datos consultados: {date(loadedAt)} (Colombia). La descarga incluye los resultados filtrados.</p><p role="status" className="sr-only">{copiedId ? "Enlace copiado" : ""}</p>{copyError && <p role="alert" className="mb-4 text-sm text-red-800">{copyError}</p>}<div className="overflow-x-auto rounded-xl border border-dark/20"><table className="w-full text-sm text-left"><thead className="bg-dark text-light"><tr>{["Invitación", "Enlace personal", "Estado", "Confirmados / cupos", "Restricciones", "Mensaje", "Última respuesta"].map(x => <th key={x} className="p-4 whitespace-nowrap">{x}</th>)}</tr></thead><tbody>{visible.map(r => <tr key={r.id} className="border-b border-dark/10"><th scope="row" className="p-4 min-w-48">{r.name}</th><td className="p-4"><button type="button" onClick={() => copyLink(r)} aria-label={`Copiar link de ${r.name}`} className="whitespace-nowrap">{copiedId === r.id ? "¡Copiado!" : "Copiar link"}</button></td><td className="p-4 whitespace-nowrap">{status(r)}</td><td className="p-4">{r.partySize ?? "—"} / {r.seats}</td><td className="p-4 min-w-48 whitespace-pre-wrap break-words">{r.dietary || "—"}</td><td className="p-4 min-w-56 whitespace-pre-wrap break-words">{r.message || "—"}</td><td className="p-4 min-w-40">{r.updated ? date(r.updated) : "—"}</td></tr>)}</tbody></table>{!visible.length && <p className="p-8">No hay invitaciones que coincidan con estos filtros.</p>}</div></>;
}
