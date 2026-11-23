import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import WhatsAppFab from "@/components/WhatsAppFab";
import { site } from "@/lib/data";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument" });
const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.inizio.es"),
  title: {
    default: "INIZIO · Arquitectos de vivienda unifamiliar en Pozuelo de Alarcón",
    template: "%s · INIZIO Arquitectura",
  },
  description:
    "Estudio de arquitectura en Pozuelo de Alarcón especializado en vivienda unifamiliar a medida en Madrid: estudio de parcela, proyecto y dirección de obra.",
  openGraph: { type: "website", locale: "es_ES", siteName: "INIZIO Arquitectura", images: ["/img/casa-angulo.webp"] },
};

export const viewport: Viewport = { themeColor: "#f3efe8" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ArchitecturalFirm",
  name: site.legalName,
  url: "https://www.inizio.es",
  telephone: site.phone,
  email: site.email,
  image: "https://www.inizio.es/img/casa-angulo.webp",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    postalCode: "28224",
    addressLocality: "Pozuelo de Alarcón",
    addressRegion: "Madrid",
    addressCountry: "ES",
  },
  areaServed: ["Pozuelo de Alarcón", "Majadahonda", "Las Rozas", "Madrid", "Ávila", "Segovia", "Toledo", "Guadalajara"],
  openingHours: "Mo-Fr 09:00-19:00",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <WhatsAppFab />
        <Cursor />
      </body>
    </html>
  );
}
