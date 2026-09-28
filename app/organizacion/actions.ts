"use server";
import { neon } from "@neondatabase/serverless";
import { randomBytes, createHash } from "node:crypto";
import { revalidatePath } from "next/cache";
import { reportAuthorized } from "@/lib/report-auth";
import { redirect } from "next/navigation";
import { matches, createReportSession, clearReportSession } from "@/lib/report-auth";
export async function login(form: FormData) {
  const password = form.get("password");
  if (!process.env.REPORT_PASSWORD || typeof password !== "string" || !matches(password, process.env.REPORT_PASSWORD)) redirect("/organizacion?error=1");
  await createReportSession();
  redirect("/organizacion");
}
export async function logout() { await clearReportSession(); redirect("/organizacion"); }

export async function saveInvitation(input: { id?: string; name: string; seats: number; requestId: string; response?: { attending: boolean; partySize: number } }) {
  if (!(await reportAuthorized())) return { error: "Tu sesión venció. Vuelve a iniciar sesión." };
  const name = typeof input.name === "string" ? input.name.trim() : "";
  if (!name || name.length > 200) return { error: "Escribe un nombre de hasta 200 caracteres." };
  if (!Number.isInteger(input.seats) || input.seats < 1 || input.seats > 20) return { error: "Los cupos deben ser un número entero entre 1 y 20." };
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuid.test(input.requestId) || (input.id && !uuid.test(input.id))) return { error: "Solicitud inválida. Actualiza la página." };
  const response = input.response;
  if (response && (typeof response.attending !== "boolean" || !Number.isInteger(response.partySize) || (response.attending ? response.partySize < 1 || response.partySize > input.seats : response.partySize !== 0))) return { error: "La cantidad confirmada debe estar entre 1 y los cupos asignados." };
  try {
    const sql = neon(process.env.DATABASE_URL!);
    if (input.id && response) {
      const updated = await sql`WITH edited AS (
        UPDATE invitations SET display_name=${name}, seats=${input.seats}
        WHERE id=${input.id} AND active=true RETURNING id
      ) INSERT INTO invitation_responses(invitation_id,attending,party_size)
        SELECT id,${response.attending},${response.partySize} FROM edited
        ON CONFLICT(invitation_id) DO UPDATE SET attending=EXCLUDED.attending,party_size=EXCLUDED.party_size,updated_at=now()
        RETURNING invitation_id`;
      if (!updated.length) return { error: "La invitación ya no está disponible." };
    } else if (input.id) {
      const updated = await sql`UPDATE invitations i SET display_name=${name}, seats=${input.seats}
        WHERE i.id=${input.id} AND i.active=true AND NOT EXISTS (
          SELECT 1 FROM invitation_responses r WHERE r.invitation_id=i.id AND r.party_size > ${input.seats}
        ) RETURNING id`;
      if (!updated.length) return { error: "No se pudo guardar: la invitación no está disponible o tiene más personas confirmadas que los cupos indicados." };
    } else {
      const hash = createHash("sha256").update(randomBytes(32)).digest("hex");
      await sql`INSERT INTO invitations(id,source_key,display_name,seats,token_hash)
        VALUES(${input.requestId},${"panel-" + input.requestId},${name},${input.seats},${hash}) ON CONFLICT(id) DO NOTHING`;
    }
    revalidatePath("/organizacion");
    return { success: true };
  } catch { return { error: "No pudimos guardar la invitación. Intenta nuevamente." }; }
}

export async function removeInvitation(id: string) {
  if (!(await reportAuthorized())) return { error: "Tu sesión venció. Vuelve a iniciar sesión." };
  try {
    const sql = neon(process.env.DATABASE_URL!);
    // Keep historical responses, but revoke the invitation and exclude it from reports.
    const rows = await sql`UPDATE invitations SET active=false WHERE id=${id} AND active=true RETURNING id`;
    if (!rows.length) return { error: "La invitación ya no está disponible." };
    revalidatePath("/organizacion");
    return { success: true };
  } catch { return { error: "No pudimos borrar la invitación. Intenta de nuevo." }; }
}

export async function confirmInvitation(id: string, attending: boolean, partySize: number) {
  if (!(await reportAuthorized())) return { error: "Tu sesión venció. Vuelve a iniciar sesión." };
  if (typeof attending !== "boolean" || !Number.isInteger(partySize) || (attending ? partySize < 1 || partySize > 20 : partySize !== 0)) return { error: "Revisa la cantidad de asistentes." };
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`INSERT INTO invitation_responses(invitation_id,attending,party_size)
      SELECT id,${attending},${partySize} FROM invitations WHERE id=${id} AND active=true AND seats>=${partySize}
      ON CONFLICT(invitation_id) DO UPDATE SET attending=EXCLUDED.attending,party_size=EXCLUDED.party_size,updated_at=now() RETURNING invitation_id`;
    if (!rows.length) return { error: "La invitación cambió o la cantidad supera sus cupos. Actualiza el panel." };
    revalidatePath("/organizacion");
    return { success: true };
  } catch { return { error: "No pudimos guardar la confirmación. Intenta de nuevo." }; }
}
