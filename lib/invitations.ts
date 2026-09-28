import { createHash } from "node:crypto";
import { neon } from "@neondatabase/serverless";

import { isInvitationToken } from "./invitation-token";
export { isInvitationToken } from "./invitation-token";
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
  const short = token.length === 16;
  const lookup = short ? Buffer.from(token, "base64url").toString("hex") : hashToken(token);
  const rows = await sql`SELECT i.id, i.display_name, i.seats, r.attending, r.party_size,
    r.dietary_requirements, r.message FROM invitations i
    LEFT JOIN invitation_responses r ON r.invitation_id=i.id
    WHERE (CASE WHEN ${short} THEN left(i.token_hash, 24) ELSE i.token_hash END)=${lookup} AND i.active=true LIMIT 2`;
  if (rows.length !== 1) return null;
  const [row] = rows;
  if (!row) return null;
  return { id: row.id, name: row.display_name, seats: row.seats,
    response: row.attending === null ? null : { attending: row.attending, partySize: row.party_size, dietary: row.dietary_requirements, message: row.message } };
}
