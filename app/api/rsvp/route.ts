import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { parseRsvp } from "@/lib/rsvp";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  try {
    if (origin && new URL(origin).host !== request.headers.get("host")) {
      return NextResponse.json({ error: "Solicitud no permitida." }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Solicitud no permitida." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Formato no válido." }, { status: 415 });
  }
  let input;
  try {
    const body = await request.text();
    if (body.length > 16000) return NextResponse.json({ error: "La respuesta es demasiado larga." }, { status: 413 });
    const raw = JSON.parse(body);
    if (raw?.website) return NextResponse.json({ error: "No se pudo enviar la respuesta." }, { status: 400 });
    input = parseRsvp(raw);
  } catch (error) {
    return NextResponse.json({ error: error instanceof SyntaxError ? "Formato no válido." : error instanceof Error ? error.message : "Revisa los datos." }, { status: 400 });
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Las confirmaciones no están disponibles en este momento. Intenta más tarde." }, { status: 503 });
  }
  try {
    const sql = neon(process.env.DATABASE_URL);
    // Reusing the submission ID makes retries safe without exposing previous replies.
    await sql`INSERT INTO rsvp_responses
      (id, full_name, email, attending, companions, party_size, dietary_requirements, message)
      VALUES (${input.submissionId}, ${input.name}, ${input.email}, ${input.attending},
        ${JSON.stringify(input.companions)}::jsonb, ${input.attending ? input.companions.length + 1 : 0},
        ${input.dietary}, ${input.message})
      ON CONFLICT (id) DO NOTHING`;
    return NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "No pudimos guardar tu respuesta. Por favor intenta nuevamente." }, { status: 503 });
  }
}
