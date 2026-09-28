import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import PageMotion from "@/components/PageMotion";
import WeddingMusic from "@/components/WeddingMusic";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://danna-fabian.vercel.app"),
  openGraph: {
    type: "website",
    locale: "es_CO",
    title: "Fabián y Danna · ¡Nos casamos!",
    description: "Acompáñanos a celebrar nuestra boda el 12 de diciembre de 2026 en Barranquilla.",
    images: [{ url: "/hero-couple-f8527a7.jpg", width: 4504, height: 4029, alt: "Fabián y Danna" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabián y Danna · ¡Nos casamos!",
    description: "12 de diciembre de 2026 · Barranquilla, Colombia",
    images: ["/hero-couple-f8527a7.jpg"],
  },
  title: "Fabián y Danna ",
  description: "Celebra con Fabián y Danna  el 12 de diciembre de 2026 en Barranquilla. Nuestra historia y todos los detalles de la boda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={montserrat.variable}
      >
        <WeddingMusic><PageMotion />{children}</WeddingMusic>
      </body>
    </html>
  );
}
