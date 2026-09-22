"use client";

import { useState, useEffect } from "react";
import { Motorcycle } from "@/data/yamaha-motorcycles";
import { siteConfig } from "@/config/site";
import { X } from "lucide-react";

interface QuoteModalProps {
  motorcycle: Motorcycle;
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteModal({ motorcycle, isOpen, onClose }: QuoteModalProps) {
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [tipoPago, setTipoPago] = useState<"contado" | "credito">("contado");
  const [cuotaInicial, setCuotaInicial] = useState<number>(0);
  const [plazo, setPlazo] = useState<number>(36);
  const [cuotaMensual, setCuotaMensual] = useState<number>(0);

  // Tasa de interés mensual estimada (1.8%)
  const TASA_INTERES_MENSUAL = 0.018;

  useEffect(() => {
    if (tipoPago === "credito") {
      const valorFinanciar = motorcycle.price - cuotaInicial;
      if (valorFinanciar > 0) {
        // Fórmula de cuota fija: C = P * (i * (1+i)^n) / ((1+i)^n - 1)
        const factor = Math.pow(1 + TASA_INTERES_MENSUAL, plazo);
        const cuota = valorFinanciar * ((TASA_INTERES_MENSUAL * factor) / (factor - 1));
        setCuotaMensual(cuota);
      } else {
        setCuotaMensual(0);
      }
    }
  }, [tipoPago, cuotaInicial, plazo, motorcycle.price]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Evento de Google Analytics / Ads
    import("@/lib/analytics").then(({ trackEvent }) => {
      trackEvent("quote_request", {
        motorcycle: motorcycle.name,
        payment_type: tipoPago,
        price: motorcycle.price
      });
    });

    let mensaje = `Hola, mi nombre es ${nombre} (Cédula: ${cedula}).\n`;
    mensaje += `Me interesa solicitar una cotización para la Yamaha ${motorcycle.name}.\n`;
    mensaje += `Forma de pago elegida: ${tipoPago.toUpperCase()}.\n`;

    if (tipoPago === "credito") {
      const formatter = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
      mensaje += `\nDetalles del crédito:\n`;
      mensaje += `- Precio de la moto: ${formatter.format(motorcycle.price)}\n`;
      mensaje += `- Cuota inicial: ${formatter.format(cuotaInicial)}\n`;
      mensaje += `- Plazo: ${plazo} meses\n`;
      mensaje += `- Cuota mensual estimada: ${formatter.format(cuotaMensual)}\n`;
      mensaje += `\n*(Tasa de interés estimada: 1.8% M.V.)*\n`;
    }

    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  const formatter = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-yamaha-blue p-6 text-white flex justify-between items-center shrink-0">
          <h3 className="text-2xl font-bold uppercase tracking-tight">Solicitar Cotización</h3>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h4 className="font-bold text-lg text-yamaha-dark">{motorcycle.name}</h4>
            <p className="text-yamaha-red font-bold text-xl">{formatter.format(motorcycle.price)}</p>
          </div>

          <form id="quote-form" onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nombre Completo</label>
              <input 
                type="text" 
                required 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-yamaha-blue focus:ring-1 focus:ring-yamaha-blue outline-none transition-all"
                placeholder="Ej. Juan Pérez"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Cédula</label>
              <input 
                type="number" 
                required 
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-yamaha-blue focus:ring-1 focus:ring-yamaha-blue outline-none transition-all"
                placeholder="Número de documento"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Forma de Pago</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setTipoPago("contado")}
                  className={`py-2 px-4 rounded-lg font-bold transition-all border-2 ${tipoPago === "contado" ? "border-yamaha-blue bg-yamaha-blue text-white" : "border-gray-200 text-gray-500 hover:border-yamaha-blue"}`}
                >
                  Contado
                </button>
                <button
                  type="button"
                  onClick={() => setTipoPago("credito")}
                  className={`py-2 px-4 rounded-lg font-bold transition-all border-2 ${tipoPago === "credito" ? "border-yamaha-blue bg-yamaha-blue text-white" : "border-gray-200 text-gray-500 hover:border-yamaha-blue"}`}
                >
                  Crédito
                </button>
              </div>
            </div>

            {tipoPago === "credito" && (
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-4">
                <h5 className="font-bold text-yamaha-dark border-b border-gray-200 pb-2">Calculadora de Financiación</h5>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Cuota Inicial: {formatter.format(cuotaInicial)}
                  </label>
                  <input 
                    type="range" 
                    min={0} 
                    max={motorcycle.price} 
                    step={100000}
                    value={cuotaInicial}
                    onChange={(e) => setCuotaInicial(Number(e.target.value))}
                    className="w-full accent-yamaha-red"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$0</span>
                    <span>{formatter.format(motorcycle.price)}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Plazo (meses)</label>
                  <select 
                    value={plazo} 
                    onChange={(e) => setPlazo(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-yamaha-blue outline-none"
                  >
                    <option value={12}>12 meses</option>
                    <option value={24}>24 meses</option>
                    <option value={36}>36 meses</option>
                    <option value={48}>48 meses</option>
                    <option value={60}>60 meses</option>
                    <option value={72}>72 meses</option>
                  </select>
                </div>

                <div className="bg-white p-4 rounded-lg border border-yamaha-light-gray flex flex-col items-center justify-center">
                  <span className="text-sm font-bold text-gray-500 mb-1">Cuota mensual estimada*</span>
                  <span className="text-3xl font-extrabold text-yamaha-dark">{formatter.format(cuotaMensual)}</span>
                  <span className="text-xs text-gray-400 mt-2 text-center">*La tasa de interés real puede variar según el perfil del cliente (est. 1.8% M.V.).</span>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 shrink-0">
          <button
            type="submit"
            form="quote-form"
            className="w-full bg-green-500 text-white font-bold uppercase tracking-wider py-4 rounded-full hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30"
          >
            Enviar Solicitud por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
