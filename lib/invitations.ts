import { createHash } from "node:crypto";
import { neon } from "@neondatabase/serverless";

export const isInvitationToken = (token: unknown): token is string => typeof token === "string" && /^[a-f0-9]{64}$/.test(token);
export const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

export type Invitation = {
  id: string;
  name: string;
  seats: number;
  response: null | { attending: boolean; partySize: number; dietary: string; message: string };
};

export async function getInvitation(token: string): Promise<Invitation | null> {
  if (!isInvitationToken(token)) return null;
  if (!process.env.DATABASE_URL) throw new Error("Database unavailable");
  const sql = neon(process.env.DATABASE_URL);
  const [row] = await sql`SELECT i.id, i.display_name, i.seats, r.attending, r.party_size,
    r.dietary_requirements, r.message FROM invitations i
    LEFT JOIN invitation_responses r ON r.invitation_id=i.id
    WHERE i.token_hash=${hashToken(token)} AND i.active=true`;
  if (!row) return null;
  return { id: row.id, name: row.display_name, seats: row.seats,
    response: row.attending === null ? null : { attending: row.attending, partySize: row.party_size, dietary: row.dietary_requirements, message: row.message } };
}
