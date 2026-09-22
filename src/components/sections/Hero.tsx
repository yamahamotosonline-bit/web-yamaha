"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";

export interface SlideData {
  id: string;
  imageSrc: string;
  mobileImageSrc?: string;
  videoSrc?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

interface HeroProps {
  slides: SlideData[];
  autoPlayInterval?: number; // en milisegundos
}

export function Hero({ slides, autoPlayInterval = 5000 }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // AutoPlay
  useEffect(() => {
    if (slides.length <= 1) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [nextSlide, autoPlayInterval, slides.length]);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] md:h-auto md:aspect-[1942/809] overflow-hidden bg-yamaha-dark group">
      
      {/* Slides Container */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {currentSlide.videoSrc ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={currentSlide.imageSrc}
              className="absolute inset-0 w-full h-full object-cover object-center"
            >
              <source src={currentSlide.videoSrc} type="video/mp4" />
            </video>
          ) : (
            <>
              {currentSlide.mobileImageSrc && (
                <Image
                  src={currentSlide.mobileImageSrc}
                  alt="Yamaha Banner"
                  fill
                  priority={currentIndex === 0}
                  sizes="100vw"
                  className="absolute inset-0 w-full h-full object-cover object-center bg-yamaha-dark md:hidden"
                />
              )}
              <Image
                src={currentSlide.imageSrc}
                alt="Yamaha Banner"
                fill
                priority={currentIndex === 0}
                sizes="100vw"
                className={`absolute inset-0 w-full h-full object-cover object-center bg-yamaha-dark ${currentSlide.mobileImageSrc ? 'hidden md:block' : ''}`}
              />
            </>
          )}

          {/* Gradient Overlay - Always show a light gradient so nav is visible, or remove it */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Content Overlays */}
          <div className="relative z-10 w-full px-4 md:px-8 lg:px-12 h-full flex flex-col justify-end pb-[12%] md:pb-[9%] lg:pb-[8%] text-white">
            <div className="flex flex-col sm:flex-row gap-4">
              {currentSlide.primaryCtaText && currentSlide.primaryCtaLink && (
                <Link 
                  href={currentSlide.primaryCtaLink}
                  className="inline-flex items-center justify-center gap-2 border-2 border-white rounded-full text-white font-bold uppercase tracking-wider px-6 py-3 md:px-7 md:py-3 hover:bg-white hover:text-yamaha-dark transition-colors text-sm md:text-base"
                >
                  {currentSlide.primaryCtaText}
                  <ChevronRight className="w-5 h-5" />
                </Link>
              )}
              {currentSlide.secondaryCtaText && currentSlide.secondaryCtaLink && (
                <Link 
                  href={currentSlide.secondaryCtaLink}
                  className="inline-flex items-center justify-center gap-2 bg-yamaha-blue rounded-full text-white font-bold uppercase tracking-wider px-6 py-3 md:px-7 md:py-3 hover:bg-blue-800 transition-colors text-sm md:text-base"
                >
                  {currentSlide.secondaryCtaText}
                  <ChevronRight className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Flechas de Navegación (Visibles en hover en desktop, siempre en mobile) */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white bg-black/20 hover:bg-black/50 transition-all rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white bg-black/20 hover:bg-black/50 transition-all rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
          </button>
        </>
      )}

      {/* Puntos de Paginación (Dots) */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a la diapositiva ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? "bg-white scale-110 shadow-md" 
                  : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
