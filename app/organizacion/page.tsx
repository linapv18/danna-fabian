import type { Metadata } from "next";
import { neon } from "@neondatabase/serverless";
import { reportAuthorized } from "@/lib/report-auth";
import { login, logout } from "./actions";
import GuestReport, { type GuestRow } from "@/components/GuestReport";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Organización | Fabián y Danna", robots: { index: false, follow: false }, referrer: "no-referrer" };
export default async function ReportPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (!(await reportAuthorized())) {
    const { error } = await searchParams;
    return <main className="mx-auto max-w-lg px-6 py-24"><p className="eyebrow mb-6">Fabián &amp; Danna · Acceso privado</p><h1 className="display text-5xl mb-6">Organización de la boda</h1><p className="text-sm leading-7 mb-8">Consulta las confirmaciones y prepara la lista de invitados.</p>{process.env.REPORT_PASSWORD ? <form action={login}><label className="block text-sm">Clave de acceso<input type="password" name="password" required autoComplete="current-password" className="block w-full border rounded-xl p-4 mt-2 mb-5" /></label>{error && <p role="alert" className="mb-5 text-red-800">No pudimos iniciar sesión. Revisa la clave.</p>}<button>Entrar al panel</button></form> : <p>El acceso privado aún no está configurado.</p>}</main>;
  }
  let rows: GuestRow[];
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const records = await sql`SELECT i.token_hash, i.id, i.display_name AS name, i.seats, r.attending, r.party_size AS "partySize", r.dietary_requirements AS dietary, r.message, r.updated_at AS updated FROM invitations i LEFT JOIN invitation_responses r ON r.invitation_id=i.id WHERE i.active=true ORDER BY i.display_name` ;
    rows = records.map(({ token_hash, ...row }) => ({ ...row, invitationUrl: `https://danna-fabian.vercel.app/?token=${Buffer.from(token_hash.slice(0, 24), "hex").toString("base64url")}` })) as GuestRow[];
  } catch {
    return <main className="p-12"><h1 className="display text-4xl">No pudimos cargar las confirmaciones</h1><p className="my-6">Intenta actualizar la página en unos minutos.</p><a href="/organizacion" className="button">Reintentar</a></main>;
  }
  return <main className="mx-auto max-w-7xl px-5 py-12"><header className="flex flex-wrap items-center justify-between gap-6 mb-10"><div><p className="eyebrow mb-3">Fabián &amp; Danna · 12.12.2026</p><h1 className="display text-5xl">Confirmaciones</h1></div><form action={logout}><button>Cerrar sesión</button></form></header><GuestReport rows={rows} loadedAt={new Date().toISOString()} /></main>;
}
