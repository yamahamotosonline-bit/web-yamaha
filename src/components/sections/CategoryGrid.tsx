"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const categories = [
  // Fila 1 (y parte de la 2 para Hyper Naked)
  { name: "HYPER NAKED", image: "/images/categories/hyper-naked.jpg", video: "/videos/hyper-naked.mp4", position: "col-span-1 row-span-2 md:col-span-3 md:col-start-1 md:row-start-1 md:row-span-4" },
  { name: "SÚPER DEPORTIVAS", image: "/images/categories/super-deportivas.jpg", video: "/videos/super-deportivas.mp4", position: "col-span-1 row-span-1 md:col-span-4 md:col-start-4 md:row-start-1 md:row-span-3" },
  { name: "COMPETICIÓN", image: "/images/categories/competicion.jpg", video: "/videos/competicion.mp4", position: "col-span-1 row-span-1 md:col-span-2 md:col-start-8 md:row-start-1 md:row-span-3" },
  { name: "ADVENTURE TOURING", image: "/images/categories/adventure.jpg", video: "/videos/adventure.mp4", position: "col-span-1 row-span-2 md:col-span-3 md:col-start-10 md:row-start-1 md:row-span-3" },
  // Fila 2
  { name: "SCOOTER", image: "/images/categories/scooter.jpg", video: "/videos/scooter.mp4", position: "col-span-1 row-span-1 md:col-span-3 md:col-start-1 md:row-start-5 md:row-span-2" },
  { name: "SPORT TOURING", image: "/images/categories/sport-touring.jpg", video: "/videos/sport-touring.mp4", position: "col-span-1 row-span-1 md:col-span-4 md:col-start-4 md:row-start-4 md:row-span-3" },
  { name: "SPORT HERITAGE", image: "/images/categories/sport-heritage.jpg", video: "/videos/sport-heritage.mp4", position: "col-span-1 row-span-1 md:col-span-2 md:col-start-8 md:row-start-4 md:row-span-3", objectPosition: "object-[35%_center]" },
  { name: "URBANAS", image: "/images/categories/urbanas.jpg", video: "/videos/urbanas.mp4", position: "col-span-1 row-span-1 md:col-span-3 md:col-start-10 md:row-start-4 md:row-span-3" },
];

export function CategoryGrid() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section className="bg-white pb-0">
      <div className="py-6 flex justify-center">
        <h2 className="text-center text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-[-0.03em] leading-none m-0">
          SÚBETE A UNA YAMAHA
        </h2>
      </div>
      
      {/* Contenedor Full Width, 12 columnas (PC) o 2 columnas asimétrico (Móvil) */}
      <div className="w-full grid grid-cols-2 auto-rows-[45vw] md:grid-cols-12 md:grid-rows-6 md:auto-rows-auto gap-0 h-auto md:h-[600px] lg:h-[800px]">
        {categories.map((cat, index) => {
          const isActive = activeCard === cat.name;
          
          return (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
            className={`relative group overflow-hidden bg-yamaha-dark ${cat.position} w-full h-full`}
            onMouseEnter={(e) => {
              setActiveCard(cat.name);
              const video = e.currentTarget.querySelector("video");
              if (video) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                  playPromise.catch(error => console.log("Autoplay prevented:", error));
                }
              }
            }}
            onMouseLeave={(e) => {
              setActiveCard(null);
              const video = e.currentTarget.querySelector("video");
              if (video) {
                video.pause();
                video.currentTime = 0.001;
              }
            }}
            onTouchStart={(e) => {
              setActiveCard(cat.name);
              const video = e.currentTarget.querySelector("video");
              if (video) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                  playPromise.catch(error => console.log("Autoplay prevented:", error));
                }
              }
            }}
            onTouchEnd={(e) => {
              // Dejamos un pequeño delay antes de quitar el estado para que se vea la animación
              setTimeout(() => setActiveCard(null), 300);
              const video = e.currentTarget.querySelector("video");
              if (video) {
                setTimeout(() => {
                  if (activeCard !== cat.name) {
                    video.pause();
                    video.currentTime = 0.001;
                  }
                }, 300);
              }
            }}
            onTouchCancel={(e) => {
              setActiveCard(null);
              const video = e.currentTarget.querySelector("video");
              if (video) {
                video.pause();
                video.currentTime = 0.001;
              }
            }}
          >
            <Link href={`/motos?categoria=${encodeURIComponent(cat.name)}`} className="block w-full h-full relative">
              <Image 
                src={cat.image} 
                alt={cat.name} 
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className={`object-cover transition-transform duration-700 ${isActive ? 'scale-105' : 'group-hover:scale-105'} ${cat.objectPosition || 'object-center'}`}
              />
              {cat.video && (
                <video
                  src={cat.video}
                  muted
                  loop
                  playsInline
                  preload="none"
                  disablePictureInPicture
                  disableRemotePlayback
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} ${cat.objectPosition || 'object-center'}`}
                />
              )}
              <div className={`absolute inset-0 transition-colors duration-300 pointer-events-none ${isActive ? 'bg-transparent' : 'bg-black/20 group-hover:bg-transparent'}`} />
              
              {/* Etiqueta estilo Yamaha */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-start">
                <span className="text-white font-bold text-[10px] md:text-base uppercase tracking-wider bg-[#1a1a1a]/80 px-2 py-1 md:px-4 md:py-2">
                  {cat.name}
                </span>
              </div>
            </Link>
          </motion.div>
          );
        })}
      </div>
    </section>
  );
}
