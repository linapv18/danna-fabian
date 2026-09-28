import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import RsvpForm from "@/components/RsvpForm";
import { getInvitation } from "@/lib/invitations";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {title:"Confirma tu asistencia | Danna & Fabián",robots:{index:false,follow:false},referrer:"no-referrer"};
export default async function RsvpPage({ searchParams }: { searchParams: Promise<{token?: string}> }) {
 const { token }=await searchParams;
 const invitation=token ? await getInvitation(token) : null;
 if(token && !invitation) notFound();
 return <><NavBar /><main className="mx-auto max-w-3xl px-6 pb-24 pt-40"><p className="eyebrow mb-5">12 de diciembre de 2026 · Barranquilla</p><h1 className="section-title">Nos encantará<br /><em>{invitation && invitation.seats > 1 ? "celebrar con ustedes." : "celebrar contigo."}</em></h1>{invitation && token ? <><div className="my-8 border-y border-dark/20 py-6"><p className="display text-3xl">{invitation.name}</p><p className="mt-3 text-sm">{invitation.seats} {invitation.seats === 1 ? "cupo reservado" : "cupos reservados"}</p></div><p className="mb-8 text-sm leading-7">Nuestra celebración es exclusivamente para adultos. {invitation.seats === 1 ? "Confirma si podrás acompañarnos." : "Confirma cuántas personas de esta invitación podrán acompañarnos."}</p><RsvpForm token={token} invitation={invitation} /></> : <><p className="my-8 text-sm leading-7">Abre el enlace personal que te enviamos para confirmar tu asistencia y ver los cupos reservados.</p><a href="https://wa.link/eae769" className="button">Necesito mi enlace</a></>}</main><Footer /></>;
}
