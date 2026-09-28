import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getInvitation } from "@/lib/invitations";
import RsvpForm from "@/components/RsvpForm";
import Schedule from "@/components/Schedule";
import VenueDetails from "@/components/VenueDetails";
import ArrowIcon from "@/components/ArrowIcon";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Una invitación especial | Danna & Fabián", robots: { index: false, follow: false }, referrer: "no-referrer" };

export default async function InvitationPage({ params }: { params: Promise<{token:string}> }) {
  const { token } = await params;
  const invitation = await getInvitation(token);
  if (!invitation) notFound();
  return <>
    <header className="flex items-center justify-between border-b border-dark/15 px-6 py-5 md:px-16"><a href="#invitacion" className="display text-3xl" aria-label="Tu invitación">D &amp; F</a><a href="#confirmar" className="button">Confirmar asistencia <ArrowIcon /></a></header>
    <main>
      <section id="invitacion" className="grid lg:grid-cols-2 max-w-[1500px] mx-auto">
        <div className="px-7 py-16 md:px-16 md:py-24 text-center flex flex-col justify-center items-center">
          <p className="eyebrow mb-7">Con todo nuestro cariño, para</p>
          <h1 className="display text-4xl md:text-5xl leading-tight break-words max-w-full">{invitation.name}</h1>
          <div className="my-9 h-14 w-px bg-dark/30" />
          <p className="text-sm leading-7 max-w-md">Hay momentos que se vuelven inolvidables cuando los compartimos con quienes queremos. Nos hará muy felices contar con ustedes en nuestra boda.</p>
          <h2 className="display text-6xl md:text-8xl tracking-tight mt-10">Danna <em>&amp;</em> Fabián</h2>
          <p className="eyebrow mt-8 leading-7">12 de diciembre de 2026<br />Barranquilla, Colombia</p>
          <p className="mt-8 rounded-full border border-dark/25 px-6 py-3 text-sm">Hemos reservado <strong>{invitation.seats} {invitation.seats === 1 ? "cupo" : "cupos"}</strong> para ustedes</p>
          <a href="#confirmar" className="text-link mt-9">Responder invitación <ArrowIcon direction="down-right" /></a>
        </div>
        <div className="relative min-h-[480px] lg:min-h-[760px] mx-6 mb-10 lg:mt-8 overflow-hidden rounded-t-full"><Image src="/hero-big.jpg" alt="Fabián y Danna " fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
      </section>
      <Schedule /><VenueDetails />
      <section className="border-y border-dark/20 px-6 py-14 text-center"><p className="eyebrow mb-4">Para una noche especial</p><h2 className="display text-4xl mb-5">Formal · Black Tie</h2><p className="text-sm leading-7 max-w-xl mx-auto">Vestido largo formal y esmoquin negro. El blanco está reservado para la novia.<br />Celebración exclusivamente para adultos.</p></section>
      <section id="confirmar" className="max-w-2xl mx-auto px-6 py-20"><p className="eyebrow mb-5">Su lugar en nuestra historia</p><h2 className="section-title mb-6">Confirma tu asistencia</h2><p className="mb-10 text-sm leading-7">{invitation.name} · {invitation.seats} {invitation.seats === 1 ? "cupo reservado" : "cupos reservados"}</p><RsvpForm token={token} invitation={invitation} /></section>
    </main><footer className="site-footer"><p className="display text-3xl">Danna &amp; Fabián</p><a href="#invitacion" className="eyebrow">Volver a tu invitación <ArrowIcon direction="up" /></a></footer>
  </>;
}
