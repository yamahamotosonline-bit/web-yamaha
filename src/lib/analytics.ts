declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export type TrackEventName = 
  | 'click_phone' 
  | 'click_whatsapp' 
  | 'contact_form_submit' 
  | 'quote_request'
  | 'click_view_models' 
  | 'click_motorcycle' 
  | 'click_request_information';

export const trackEvent = (eventName: TrackEventName, eventParams?: Record<string, string | number | boolean | null | undefined>) => {
  // Asegurarse de que el código corre en el cliente
  if (typeof window === 'undefined') return;

  // 1. Compatibilidad con Google Tag Manager (DataLayer)
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams
    });
  }

  // 2. Compatibilidad Directa con GA4 / Google Ads (gtag.js)
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
    triggerGoogleAdsConversion(eventName);
  }
};

const triggerGoogleAdsConversion = (eventName: TrackEventName) => {
  // Leemos las variables de entorno sin invenciones, seguras para no romper si no existen
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  let conversionLabel = '';

  switch (eventName) {
    case 'click_whatsapp':
      conversionLabel = process.env.NEXT_PUBLIC_GADS_CONVERSION_WHATSAPP || '';
      break;
    case 'click_phone':
      conversionLabel = process.env.NEXT_PUBLIC_GADS_CONVERSION_PHONE || '';
      break;
    case 'contact_form_submit':
      conversionLabel = process.env.NEXT_PUBLIC_GADS_CONVERSION_FORM || '';
      break;
    case 'quote_request':
      conversionLabel = process.env.NEXT_PUBLIC_GADS_CONVERSION_QUOTE || '';
      break;
    default:
      return; // No es una conversión principal
  }

  // Solo si se configuraron el ID general y el label de la conversión específica
  if (adsId && conversionLabel) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        'send_to': `${adsId}/${conversionLabel}`
      });
    }
  }
};
