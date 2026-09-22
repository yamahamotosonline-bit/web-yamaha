"use client";

import { useState } from "react";
import { Motorcycle, motorcycles } from "@/data/yamaha-motorcycles";
import { MotorcycleCard } from "@/components/ui/MotorcycleCard";
import { RelatedMotorcyclesSlider } from "@/components/ui/RelatedMotorcyclesSlider";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Check } from "lucide-react";
import { siteConfig } from "@/config/site";
import FeatureSlider from "@/components/ui/FeatureSlider";
import { QuoteModal } from "@/components/ui/QuoteModal";
import { trackEvent } from "@/lib/analytics";

export function MotorcycleDetail({ motorcycle }: { motorcycle: Motorcycle }) {
  const [activeImage, setActiveImage] = useState(
    (motorcycle.colors && motorcycle.colors.length > 0 && motorcycle.colors[0].image) 
      ? motorcycle.colors[0].image 
      : motorcycle.image
  );
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Motos relacionadas (misma categoría, excluyendo la actual)
  let relatedMotorcycles = motorcycles
    .filter((m) => m.category === motorcycle.category && m.id !== motorcycle.id);

  // Si hay pocas motos en la misma categoría, rellenar con otras categorías
  if (relatedMotorcycles.length < 12) {
    const otherMotorcycles = motorcycles
      .filter((m) => m.category !== motorcycle.category && m.id !== motorcycle.id);
    relatedMotorcycles = [...relatedMotorcycles, ...otherMotorcycles].slice(0, 15);
  }

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(motorcycle.price);

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="bg-yamaha-gray py-4 border-b border-yamaha-light-gray">
        <div className="container-yamaha flex flex-wrap items-center text-sm text-gray-500 font-medium">
          <Link href="/" className="hover:text-yamaha-red transition-colors">Inicio</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/motos" className="hover:text-yamaha-red transition-colors">Motos</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-yamaha-dark">{motorcycle.name}</span>
        </div>
      </div>

      <div className="container-yamaha py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Galería */}
          <div className="flex flex-col gap-4">
            <motion.div 
              className="aspect-[4/3] bg-yamaha-gray flex items-center justify-center p-4 md:p-8 border border-yamaha-light-gray w-full max-w-full overflow-hidden"
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img src={activeImage} alt={motorcycle.name} className="w-full h-full object-contain" />
            </motion.div>
            

          </div>

          {/* Información */}
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">
              {motorcycle.category}
            </span>
            <h1 className="text-5xl font-bold text-yamaha-dark uppercase tracking-tighter mb-2">
              {motorcycle.name}
            </h1>
            
            <div className="mb-4">
              <span className="inline-block bg-yamaha-blue text-white text-sm font-bold px-4 py-1 rounded-full tracking-widest">
                2027
              </span>
            </div>
            <div className="mb-8">
              {motorcycle.price > 0 ? (
                <div className="flex items-baseline gap-2">
                  {motorcycle.priceLabel && (
                    <span className="text-lg font-bold text-gray-500 uppercase">{motorcycle.priceLabel}</span>
                  )}
                  <span className="text-4xl font-bold text-gray-700">{formattedPrice}</span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-yamaha-dark uppercase">Consultar Precio</span>
              )}
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {motorcycle.description}
            </p>

            {/* Colores */}
            {motorcycle.colors && motorcycle.colors.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-yamaha-dark uppercase mb-4 tracking-wider">Colores Disponibles</h3>
                <div className="flex flex-wrap gap-4">
                  {motorcycle.colors.map((color) => {
                    const isSelected = activeImage === (color.image || motorcycle.image);
                    return (
                      <button 
                        key={color.name} 
                        className="flex flex-col items-center gap-2 group outline-none"
                        onClick={() => setActiveImage(color.image || motorcycle.image)}
                      >
                        <div 
                          className={`w-10 h-10 rounded-full border-2 shadow-inner transition-transform ${isSelected ? 'border-yamaha-red scale-110' : 'border-gray-300 group-hover:scale-110'}`}
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className={`text-xs font-medium ${isSelected ? 'text-yamaha-red' : 'text-gray-600'}`}>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Highlights */}
            <div className="mb-10">
              <h3 className="font-bold text-yamaha-dark uppercase mb-4 tracking-wider">Características Principales</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {motorcycle.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-yamaha-red flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="mt-auto flex flex-col sm:flex-row gap-4 pt-8 border-t border-yamaha-light-gray">
              <a 
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(motorcycle.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                id="btn-whatsapp-detail"
                data-event="click_whatsapp"
                onClick={() => trackEvent('click_whatsapp', { source: 'motorcycle_detail', motorcycle: motorcycle.name })}
                className="flex-1 bg-white border-2 border-yamaha-blue text-yamaha-blue text-center font-bold uppercase tracking-wider py-4 px-6 rounded-full hover:bg-yamaha-blue hover:text-white transition-all"
              >
                Contactar por WhatsApp
              </a>
              <button 
                onClick={() => setIsQuoteModalOpen(true)}
                className="flex-1 bg-white border-2 border-yamaha-blue text-yamaha-blue text-center font-bold uppercase tracking-wider py-4 px-6 rounded-full hover:bg-yamaha-blue hover:text-white transition-all"
              >
                Solicitar Cotización
              </button>
            </div>
          </div>
        </div>

        {/* Especificaciones */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-yamaha-dark uppercase tracking-tighter mb-8 border-b border-yamaha-light-gray pb-4">
            Especificaciones Técnicas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {Object.entries(motorcycle.specifications)
              .slice(0, showAllSpecs ? undefined : 6)
              .map(([key, value], idx) => (
              <div key={key} className={`flex justify-between py-3 ${idx % 2 === 0 ? 'bg-yamaha-gray' : 'bg-white'} px-4`}>
                <span className="font-bold text-yamaha-dark">{key}</span>
                <span className="text-gray-700 text-right">{value}</span>
              </div>
            ))}
          </div>
          
          {Object.keys(motorcycle.specifications).length > 6 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowAllSpecs(!showAllSpecs)}
                className="bg-transparent border-2 border-yamaha-dark text-yamaha-dark font-bold uppercase tracking-wider py-3 px-8 hover:bg-yamaha-dark hover:text-white transition-colors"
              >
                {showAllSpecs ? "Ver Menos" : "Ver Todas las Especificaciones"}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Slider de Características */}
      {motorcycle.featureBanners && motorcycle.featureBanners.length > 0 && (
        <FeatureSlider banners={motorcycle.featureBanners} />
      )}

      {/* También podría interesarte */}
      {relatedMotorcycles.length > 0 && (
        <RelatedMotorcyclesSlider motorcycles={relatedMotorcycles} />
      )}

      <QuoteModal 
        motorcycle={motorcycle} 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </div>
  );
}
