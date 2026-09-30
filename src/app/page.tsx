import { Hero } from "@/components/sections/Hero";
import { FeaturedMotorcycles } from "@/components/sections/FeaturedMotorcycles";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { WhatsAppCta } from "@/components/sections/WhatsAppCta";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.businessName} | Distribuidor Autorizado`,
  description: siteConfig.description,
};

export default function Home() {
  const heroSlides = [
    {
      id: "blue-days",
      imageSrc: "/images/hero-blue-days.png",
      mobileImageSrc: "/images/mobile-hero-1.png",
      primaryCtaText: "WhatsApp",
      primaryCtaLink: "https://wa.me/573138439872",
      secondaryCtaText: "Ver Modelos",
      secondaryCtaLink: "/motos"
    },
    {
      id: "second-banner",
      imageSrc: "/images/hero-banner-2.png",
      mobileImageSrc: "/images/mobile-hero-2.png",
      primaryCtaText: "WhatsApp",
      primaryCtaLink: "https://wa.me/573138439872",
      secondaryCtaText: "VER MODELOS",
      secondaryCtaLink: "/motos",
    },
    {
      id: "third-banner",
      imageSrc: "/images/hero-banner-3.png",
      mobileImageSrc: "/images/mobile-hero-3.png",
      primaryCtaText: "WhatsApp",
      primaryCtaLink: "https://wa.me/573138439872",
      secondaryCtaText: "VER MODELOS",
      secondaryCtaLink: "/motos",
    }
  ];

  return (
    <>
      <Hero slides={heroSlides} autoPlayInterval={8000} />
      <CategoryGrid />
      <FeaturedMotorcycles />
      <WhatsAppCta />
      {/* TODO: Add Promos / Contact / Services later */}
    </>
  );
}
