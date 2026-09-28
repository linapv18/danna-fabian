import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";
import type { Invitation } from "@/lib/invitations";

export default function InvitationCover({ invitation, token }: { invitation: Invitation; token: string }) {
  return (
    <main className="invitation-entry">
      <article className="invitation-card" aria-labelledby="invitation-title">
        <div className="invitation-seal" aria-hidden="true">D<span>&amp;</span>F</div>
        <p className="eyebrow">Una fecha, una vida juntos</p>
        <h1 id="invitation-title" className="invitation-couple">Danna <span>&amp;</span> Fabián</h1>
        <p className="invitation-date">12 · DICIEMBRE · 2026</p>
        <div className="invitation-divider" aria-hidden="true">✧</div>
        <p className="eyebrow">Con mucho cariño, para</p>
        <h2 className="invitation-guest">{invitation.name}</h2>
        <p className="invitation-message">Nuestro día será aún más especial<br />{invitation.seats === 1 ? "contigo a nuestro lado." : "con ustedes a nuestro lado."}</p>
        <p className="invitation-seats">Hemos reservado <strong>{invitation.seats} {invitation.seats === 1 ? "cupo" : "cupos"}</strong> para {invitation.seats === 1 ? "ti" : "ustedes"}.</p>
        <Link className="invitation-open" href={`/?token=${encodeURIComponent(token)}&abierta=1`}>
          Abrir la invitación <ArrowIcon />
        </Link>
        <p className="invitation-location">Barranquilla, Colombia</p>
      </article>
    </main>
  );
}
