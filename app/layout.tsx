import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Danna & Fabian",
  description: "Celebra con Danna y Fabián el 12 de diciembre de 2026 en Barranquilla. Nuestra historia y todos los detalles de la boda.",
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
        {children}
      </body>
    </html>
  );
}
