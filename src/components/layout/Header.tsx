"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, X, ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import { CATEGORIES } from "@/data/yamaha-motorcycles";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-yamaha-light-gray shadow-sm">
      <div className="container-yamaha h-16 md:h-20 flex items-center justify-between">
        
        {/* Mobile Hamburger */}
        <button 
          className="md:hidden p-2 text-yamaha-dark focus:outline-none"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Abrir menú principal"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none md:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/images/yamaha-logo-red.png" 
              alt="Yamaha Motor" 
              width={180} 
              height={45} 
              className="h-8 md:h-11 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          <div 
            className="h-full flex items-center relative group"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <Link 
              href="/motos" 
              className="font-bold text-sm tracking-wide text-yamaha-dark hover:text-yamaha-red transition-colors flex items-center gap-1"
            >
              MOTOS
              <ChevronDown className="w-4 h-4" />
            </Link>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {isMegaMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white border border-yamaha-light-gray shadow-xl p-6 grid grid-cols-4 gap-4"
                >
                  {CATEGORIES.map((category) => {
                    const videoMap: Record<string, string> = {
                      "URBANAS": "/videos/urbanas.mp4",
                      "SUPER DEPORTIVAS": "/videos/super-deportivas.mp4",
                      "HYPER NAKED": "/videos/hyper-naked.mp4",
                      "COMPETICIÓN": "/videos/competicion.mp4",
                      "ADVENTURE TOURING": "/videos/adventure.mp4",
                      "SPORT TOURING": "/videos/sport-touring.mp4",
                      "SCOOTERS": "/videos/scooter.mp4",
                      "SPORT HERITAGE": "/videos/sport-heritage.mp4",
                    };
                    const videoPath = videoMap[category];
                    
                    return (
                      <Link 
                        key={category} 
                        href={`/motos?categoria=${encodeURIComponent(category)}`}
                        className="group flex flex-col items-center gap-2 p-2 hover:bg-yamaha-gray rounded transition-colors"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        <div className="w-full aspect-video bg-yamaha-gray rounded overflow-hidden relative">
                          <video
                            src={`${videoPath}#t=0.001`}
                            muted
                            loop
                            playsInline
                            preload="none"
                            disablePictureInPicture
                            disableRemotePlayback
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <span className="text-[11px] font-bold text-center group-hover:text-yamaha-red transition-colors uppercase">
                          {category}
                        </span>
                      </Link>
                    );
                  })}
                  <div className="col-span-4 mt-4 pt-4 border-t border-yamaha-light-gray text-center">
                    <Link 
                      href="/motos" 
                      className="text-sm font-bold text-yamaha-red hover:underline"
                      onClick={() => setIsMegaMenuOpen(false)}
                    >
                      VER TODAS LAS MOTOCICLETAS
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/servicios" className="font-bold text-sm tracking-wide text-yamaha-dark hover:text-yamaha-red transition-colors">
            SERVICIOS
          </Link>
          <Link href="/repuestos" className="font-bold text-sm tracking-wide text-yamaha-dark hover:text-yamaha-red transition-colors">
            REPUESTOS
          </Link>
          <Link href="/contacto" className="font-bold text-sm tracking-wide text-yamaha-dark hover:text-yamaha-red transition-colors">
            CONTACTO
          </Link>
        </nav>

        {/* Search Icon (Desktop & Mobile space preserver) */}
        <div className="flex-shrink-0 flex items-center md:gap-4 w-6 md:w-auto">
          <button className="text-yamaha-dark hover:text-yamaha-red transition-colors" aria-label="Buscar">
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white flex flex-col md:hidden"
          >
            <div className="h-16 flex items-center justify-between px-4 border-b border-yamaha-light-gray">
              <Image 
                src="/images/yamaha-logo-red.png" 
                alt="Yamaha Motor" 
                width={140} 
                height={35} 
                className="h-8 w-auto object-contain"
              />
              <button 
                className="p-2 text-yamaha-dark" 
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="font-bold text-lg text-yamaha-dark border-b border-yamaha-light-gray pb-2">MOTOS</div>
                <div className="grid grid-cols-2 gap-3 pl-4">
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category}
                      href={`/motos?categoria=${encodeURIComponent(category)}`}
                      className="text-sm font-semibold text-gray-600 hover:text-yamaha-red"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                  <Link
                      href="/motos"
                      className="text-sm font-bold text-yamaha-red mt-2 col-span-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Ver todas
                  </Link>
                </div>
              </div>
              
              <Link href="/servicios" className="font-bold text-lg text-yamaha-dark border-b border-yamaha-light-gray pb-2" onClick={() => setIsMobileMenuOpen(false)}>
                SERVICIOS
              </Link>
              <Link href="/repuestos" className="font-bold text-lg text-yamaha-dark border-b border-yamaha-light-gray pb-2" onClick={() => setIsMobileMenuOpen(false)}>
                REPUESTOS
              </Link>
              <Link href="/contacto" className="font-bold text-lg text-yamaha-dark border-b border-yamaha-light-gray pb-2" onClick={() => setIsMobileMenuOpen(false)}>
                CONTACTO
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
