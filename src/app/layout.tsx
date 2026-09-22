import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.compraryamahamotos.com"),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Yamaha", "Motos", "Colombia", "Motocicletas", "Yamaha Colombia", "Comprar moto Yamaha", "Concesionario Yamaha"],
  authors: [{ name: siteConfig.businessName }],
  creator: siteConfig.businessName,
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://www.compraryamahamotos.com",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CotizarButton } from "@/components/ui/CotizarButton";
import { AnalyticsManager } from "@/components/layout/AnalyticsManager";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Obtenemos el GTM ID aquí para poder inyectar el noscript
  const gtmId = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID;

  return (
    <html lang="es-CO" className="scroll-smooth overflow-x-hidden">
      <body className={`${inter.variable} font-sans bg-background text-foreground flex flex-col min-h-screen pt-16 md:pt-20 overflow-x-hidden w-full relative`}>
        {/* GTM Fallback for users with disabled JS */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <AnalyticsManager />
        <Header />
        <main className="flex-grow overflow-x-hidden w-full">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <CotizarButton />
      </body>
    </html>
  );
}
