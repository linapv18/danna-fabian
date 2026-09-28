import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
export const metadata: Metadata = {title:"Tu invitación | Danna & Fabián",robots:{index:false,follow:false}};
export default function RsvpPage() {
 return <><NavBar /><main className="mx-auto max-w-2xl px-6 pb-24 pt-40"><p className="eyebrow mb-5">Tenemos un lugar para ti</p><h1 className="section-title">Abre tu invitación personal</h1><p className="my-8 text-sm leading-7">Para confirmar tu asistencia, utiliza el enlace único que te enviamos. Allí encontrarás el nombre de tu invitación y los cupos reservados, sin tener que escribir tu nombre.</p><a href="https://wa.link/eae769" className="button">Necesito mi enlace</a></main><Footer /></>;
}
