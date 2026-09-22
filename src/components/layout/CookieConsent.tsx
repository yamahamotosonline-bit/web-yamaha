"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

const CONSENT_KEY = "cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);

    if (stored === "granted") {
      updateConsent("granted");
    } else if (stored !== "denied") {
      setVisible(true);
    }
  }, []);

  function updateConsent(status: "granted" | "denied") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push([
      "consent",
      "update",
      {
        ad_storage: status,
        analytics_storage: status,
        ad_user_data: status,
        ad_personalization: status,
      },
    ]);
  }

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, "granted");
    updateConsent("granted");
    setVisible(false);
  }

  function handleReject() {
    localStorage.setItem(CONSENT_KEY, "denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-4 md:p-6 shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 justify-between">
        <p className="text-sm text-foreground">
          Usamos cookies para mejorar tu experiencia y medir el rendimiento de nuestras campañas. Puedes leer más en nuestra{" "}
          <Link href="/politica-cookies" className="underline">
            política de cookies
          </Link>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleReject}
            className="px-4 py-2 text-sm rounded-md border border-border"
          >
            Rechazar
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
