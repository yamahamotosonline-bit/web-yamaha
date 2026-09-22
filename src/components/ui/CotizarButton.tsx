"use client";

import { FileText } from "lucide-react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function CotizarButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="fixed right-0 top-[65%] -translate-y-1/2 z-40 flex"
        >
          <Link
            href="/contacto"
            id="btn-cotizar-float"
            data-event="click_request_information"
            onClick={() => trackEvent('click_request_information', { source: 'floating_button' })}
            className="bg-yamaha-blue hover:bg-blue-800 text-white shadow-lg transition-colors flex flex-col items-center justify-center p-3 w-20 md:w-24 gap-1 group"
            aria-label="Ir a cotizar"
          >
            <div className="relative">
              <FileText className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-1 -right-2 text-[10px] md:text-xs font-bold bg-white text-yamaha-blue rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                $
              </span>
            </div>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1 text-center">
              Cotizar
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
