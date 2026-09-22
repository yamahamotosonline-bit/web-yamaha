import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Cookies",
};

export default function PoliticaCookiesPage() {
  return (
    <div className="container-yamaha py-16 min-h-[60vh] max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-yamaha-dark uppercase tracking-tighter mb-8 border-b border-yamaha-light-gray pb-4">
        Política de Cookies
      </h1>
      <div className="prose text-gray-700 max-w-none space-y-6">
        <p>
          En <strong>{siteConfig.businessName}</strong> utilizamos cookies y tecnologías similares para mejorar su experiencia de usuario, 
          personalizar nuestro contenido y analizar el tráfico de nuestro sitio web.
        </p>

        <h2 className="text-xl font-bold text-yamaha-dark mt-8 mb-4">1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en su navegador o dispositivo (computadora, tablet o teléfono móvil) 
          cuando visita un sitio web. Nos permiten recordar sus preferencias, mantener la seguridad de sus sesiones y entender cómo interactúa con nuestra página.
        </p>

        <h2 className="text-xl font-bold text-yamaha-dark mt-8 mb-4">2. Tipos de Cookies que Utilizamos</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Cookies estrictamente necesarias:</strong> Son indispensables para que el sitio web funcione correctamente. Por ejemplo, aquellas que permiten la navegación y el uso de las opciones de seguridad. No se pueden desactivar.</li>
          <li><strong>Cookies de rendimiento y análisis:</strong> Nos ayudan a entender cómo los visitantes interactúan con el sitio web reuniendo información de forma anónima (por ejemplo, Google Analytics).</li>
          <li><strong>Cookies funcionales:</strong> Permiten que el sitio web recuerde las elecciones que usted hace (como su nombre de usuario o región) para brindarle funciones mejoradas y personalizadas.</li>
          <li><strong>Cookies de marketing:</strong> Se utilizan para rastrear a los visitantes en las páginas web con el fin de mostrar anuncios que sean relevantes y atractivos para el usuario individual.</li>
        </ul>

        <h2 className="text-xl font-bold text-yamaha-dark mt-8 mb-4">3. Gestión de Cookies</h2>
        <p>
          Usted tiene el derecho de decidir si acepta o rechaza las cookies. Puede configurar las preferencias de cookies a través 
          de los ajustes de su navegador web. Tenga en cuenta que si elige rechazar las cookies, es posible que no pueda utilizar todas las funciones de nuestro sitio.
        </p>
        <p>
          Puede encontrar información sobre cómo administrar las cookies en los navegadores más populares a continuación:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Google Chrome</li>
          <li>Mozilla Firefox</li>
          <li>Safari</li>
          <li>Microsoft Edge</li>
        </ul>

        <h2 className="text-xl font-bold text-yamaha-dark mt-8 mb-4">4. Actualizaciones a esta Política</h2>
        <p>
          Es posible que actualicemos esta Política de Cookies de vez en cuando para reflejar cambios operativos, legales o reglamentarios. 
          Le invitamos a revisar esta página regularmente para estar informado sobre el uso de cookies en nuestro sitio.
        </p>

        <p className="text-sm text-gray-500 mt-12 italic">
          Última actualización: Septiembre de {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
