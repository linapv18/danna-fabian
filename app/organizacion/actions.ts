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

export async function saveInvitation(input: { id?: string; name: string; seats: number; requestId: string }) {
  if (!(await reportAuthorized())) return { error: "Tu sesión venció. Vuelve a iniciar sesión." };
  const name = typeof input.name === "string" ? input.name.trim() : "";
  if (!name || name.length > 200) return { error: "Escribe un nombre de hasta 200 caracteres." };
  if (!Number.isInteger(input.seats) || input.seats < 1 || input.seats > 20) return { error: "Los cupos deben ser un número entero entre 1 y 20." };
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuid.test(input.requestId) || (input.id && !uuid.test(input.id))) return { error: "Solicitud inválida. Actualiza la página." };
  try {
    const sql = neon(process.env.DATABASE_URL!);
    if (input.id) {
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
