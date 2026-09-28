import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import RsvpForm from "@/components/RsvpForm";

export const metadata: Metadata = { title: "Confirma tu asistencia | Danna & Fabián" };

export default function RsvpPage() {
  return <><NavBar /><main className="mx-auto max-w-3xl px-6 pb-24 pt-40"><p className="eyebrow mb-5">12 de diciembre de 2026 · Barranquilla</p><h1 className="section-title">Nos encantará<br /><em>celebrar contigo.</em></h1><p className="mt-7 mb-10 max-w-xl text-sm leading-7">Confírmanos si podrás acompañarnos. Nuestra celebración es exclusivamente para adultos; incluye únicamente a los acompañantes de tu invitación.</p><RsvpForm /></main><Footer /></>;
}
