import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-yamaha-dark text-white pt-16 pb-8">
      <div className="container-yamaha">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Columna 1: Contacto */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-xl mb-2 text-white uppercase tracking-wider">Contacto</h3>
            <div className="flex items-start gap-3 text-gray-300">
              <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{siteConfig.address}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Phone className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{siteConfig.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <MessageCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{siteConfig.phone} (WhatsApp)</span>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-xl mb-2 text-white uppercase tracking-wider">Enlaces Rápidos</h3>
            <Link href="/motos" className="text-sm text-gray-300 hover:text-white transition-colors">Motocicletas</Link>
            <Link href="/servicios" className="text-sm text-gray-300 hover:text-white transition-colors">Servicio Técnico</Link>
            <Link href="/repuestos" className="text-sm text-gray-300 hover:text-white transition-colors">Repuestos y Accesorios</Link>
            <Link href="/contacto" className="text-sm text-gray-300 hover:text-white transition-colors">Red de Distribuidores</Link>
          </div>

          {/* Columna 3: Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-xl mb-2 text-white uppercase tracking-wider">Legal</h3>
            <Link href="/terminos-y-condiciones" className="text-sm text-gray-300 hover:text-white transition-colors">Términos y Condiciones</Link>
            <Link href="/politica-privacidad" className="text-sm text-gray-300 hover:text-white transition-colors">Política de Privacidad</Link>
            <Link href="/politica-cookies" className="text-sm text-gray-300 hover:text-white transition-colors">Política de Cookies</Link>
          </div>


        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} {siteConfig.businessName}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Image 
              src="/images/incolmotos-50-anos.png" 
              alt="50 Años Incolmotos Yamaha" 
              width={160} 
              height={120} 
              className="object-contain w-32 md:w-40 h-auto"
            />
            <span className="text-yamaha-red font-bold text-xl tracking-tighter uppercase">
              YAMAHA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
