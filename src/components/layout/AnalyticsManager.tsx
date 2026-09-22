"use client";

import Script from "next/script";

export function AnalyticsManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID;
  const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  // Si no hay ningún ID configurado, no renderizamos scripts (cumpliendo con: NO inventar IDs)
  if (!gtmId && !ga4Id && !adsId) {
    return null;
  }

  return (
    <>
      {/* Consent Mode (Default: Denied to comply with GDPR/Cookies laws before user action) */}
      <Script
        id="google-consent-mode"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });
          `,
        }}
      />

      {/* 1. Google Tag Manager (Recomendado para manejar todas las etiquetas) */}
      {gtmId && (
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
      )}

      {/* 2. Google Analytics 4 Directo (Si no se usa GTM) */}
      {ga4Id && !gtmId && (
        <>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics-4"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga4Id}');
              `,
            }}
          />
        </>
      )}

      {/* 3. Google Ads Global Tag (Si no se usa GTM y se requiere además de GA4) */}
      {adsId && !gtmId && (
        <>
          {/* Si ya inyectamos el script con ga4Id, gtag ya está definido, pero por seguridad: */}
          {!ga4Id && (
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`}
              strategy="afterInteractive"
            />
          )}
          <Script
            id="google-ads"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${adsId}');
              `,
            }}
          />
        </>
      )}
    </>
  );
}
