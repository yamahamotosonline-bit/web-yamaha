import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
};

export default function TerminosYCondicionesPage() {
  return (
    <div className="container-yamaha py-16 min-h-[60vh] max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-yamaha-dark uppercase tracking-tighter mb-8 border-b border-yamaha-light-gray pb-4">
        Términos y Condiciones
      </h1>
      <div className="prose text-gray-700 max-w-none space-y-6">
        <p>
          Bienvenido a <strong>{siteConfig.businessName}</strong>. El uso de este sitio web y de nuestros servicios está sujeto a los siguientes 
          términos y condiciones de uso. Al navegar, interactuar o solicitar información a través de esta plataforma, 
          usted acepta estar sujeto a estos términos.
        </p>

        <h2 className="text-xl font-bold text-yamaha-dark mt-8 mb-4">1. Precios e Información Comercial</h2>
        <p>
          Toda la información técnica, características y precios de las motocicletas, repuestos y servicios mostrados en el sitio web son de carácter informativo.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Los precios publicados están sujetos a cambios sin previo aviso y pueden variar según la ciudad, concesionario o disponibilidad.</li>
          <li>Las imágenes de las motocicletas son de referencia y pueden incluir accesorios no contenidos en las versiones estándar, o variar en colores y calcomanías de la versión disponible en tienda.</li>
          <li>Las cotizaciones realizadas a través de este sitio no constituyen un acuerdo vinculante de compra-venta hasta que no sean ratificadas y formalizadas con un asesor de ventas en el concesionario.</li>
        </ul>

        <h2 className="text-xl font-bold text-yamaha-dark mt-8 mb-4">2. Uso de la Plataforma</h2>
        <p>
          Usted se compromete a hacer un uso lícito y adecuado de este sitio web. Queda prohibido:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Utilizar la plataforma para actividades ilegales o fraudulentas.</li>
          <li>Intentar vulnerar la seguridad del sitio o extraer información de manera no autorizada (scraping, hacking, etc.).</li>
          <li>Proporcionar información falsa en los formularios de cotización o contacto.</li>
        </ul>

        <h2 className="text-xl font-bold text-yamaha-dark mt-8 mb-4">3. Propiedad Intelectual</h2>
        <p>
          Todo el contenido de este sitio web (textos, imágenes, logos, diseño, software, marcas registradas) es propiedad 
          exclusiva de <strong>{siteConfig.businessName}</strong>, Incolmotos Yamaha o sus respectivos licenciantes, y está protegido 
          por las leyes de propiedad intelectual. Ningún contenido puede ser reproducido sin autorización previa y por escrito.
        </p>

        <h2 className="text-xl font-bold text-yamaha-dark mt-8 mb-4">4. Disponibilidad del Inventario</h2>
        <p>
          La publicación de un modelo de motocicleta en esta plataforma web no garantiza su disponibilidad inmediata en el 
          inventario del concesionario. La entrega de los vehículos está sujeta a la disponibilidad logística del importador y de la tienda.
        </p>

        <h2 className="text-xl font-bold text-yamaha-dark mt-8 mb-4">5. Modificaciones</h2>
        <p>
          Nos reservamos el derecho de modificar o actualizar estos Términos y Condiciones en cualquier momento sin previo aviso. 
          Le recomendamos revisar esta página periódicamente.
        </p>

        <p className="text-sm text-gray-500 mt-12 italic">
          Última actualización: Septiembre de {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
