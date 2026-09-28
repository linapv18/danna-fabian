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
