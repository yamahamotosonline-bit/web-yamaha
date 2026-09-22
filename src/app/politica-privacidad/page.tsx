import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-yamaha py-16 min-h-[60vh] max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-yamaha-dark uppercase tracking-tighter mb-8 border-b border-yamaha-light-gray pb-4">
        Política de Privacidad
      </h1>
      <div className="prose text-gray-700 max-w-none space-y-6">
        <p>
          En cumplimiento con la Ley 1581 de 2012 y el Decreto 1377 de 2013 sobre protección de datos personales en Colombia, 
          <strong> {siteConfig.businessName}</strong> informa a sus clientes, proveedores, colaboradores y usuarios de nuestro sitio web 
          sobre nuestra política de tratamiento de datos personales.
        </p>

        <h2 className="text-xl font-bold text-yamaha-dark mt-8 mb-4">1. Recolección y Uso de Datos</h2>
        <p>
          Los datos personales recolectados a través de nuestros formularios de contacto, cotizaciones o suscripciones serán utilizados con los siguientes fines:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Gestionar sus solicitudes de cotización, compra o información general.</li>
          <li>Enviar comunicaciones promocionales, novedades y ofertas de motocicletas, repuestos o servicios Yamaha.</li>
          <li>Evaluar la calidad de nuestros servicios y realizar estudios de mercado.</li>
          <li>Cumplir con obligaciones legales o contractuales derivadas de su relación comercial con nosotros.</li>
        </ul>

        <h2 className="text-xl font-bold text-yamaha-dark mt-8 mb-4">2. Derechos del Titular</h2>
        <p>
          Como titular de la información, usted tiene los siguientes derechos establecidos por el <i>Habeas Data</i>:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Conocer, actualizar y rectificar sus datos personales ante nosotros en todo momento.</li>
          <li>Solicitar prueba de la autorización otorgada para el tratamiento de datos.</li>
          <li>Ser informado, previa solicitud, respecto al uso que le hemos dado a sus datos.</li>
          <li>Revocar la autorización y/o solicitar la supresión del dato en caso de que no se respeten los principios, derechos y garantías constitucionales.</li>
          <li>Acceder en forma gratuita a los datos personales que hayan sido objeto de tratamiento.</li>
        </ul>

        <h2 className="text-xl font-bold text-yamaha-dark mt-8 mb-4">3. Seguridad de la Información</h2>
        <p>
          Nos comprometemos a proteger la seguridad de su información personal. Contamos con protocolos físicos, técnicos y administrativos 
          para evitar el acceso no autorizado, la divulgación, alteración o destrucción de los datos que recopilamos en línea.
        </p>

        <h2 className="text-xl font-bold text-yamaha-dark mt-8 mb-4">4. Transferencia de Datos</h2>
        <p>
          Nos abstenemos de comercializar o compartir su información personal con terceros no autorizados, salvo cuando 
          exista un mandato legal o se requiera para prestar el servicio directamente relacionado con su compra (ej. entidades financieras, entidades de tránsito).
        </p>

        <h2 className="text-xl font-bold text-yamaha-dark mt-8 mb-4">5. Contacto</h2>
        <p>
          Si desea ejercer sus derechos como titular o tiene alguna duda sobre esta política, puede comunicarse con nosotros 
          a través de nuestros canales de contacto oficiales publicados en la sección <strong>Contacto</strong> de nuestro sitio web.
        </p>

        <p className="text-sm text-gray-500 mt-12 italic">
          Última actualización: Septiembre de {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
