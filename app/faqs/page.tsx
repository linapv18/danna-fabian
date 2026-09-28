import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
};

export default function FaqsPage() {
  return (
    <div>
      <NavBar />
      <main className="faq-content">
        <div className="faq-heading"><p className="eyebrow mb-5">Los detalles del gran día</p><h1 className="section-title">Preguntas frecuentes</h1></div>
        <div className="grid lg:grid-cols-2 gap-8 pt-10">
          <h2 className="text-4xl font-light tracking-tight">
            vestimenta
          </h2>
          <ul className="list-disc list-inside flex flex-col gap-10">
            <li className="font-light text-lg tracking-wider">
              ¿HAY CÓDIGO DE VESTIMENTA? <br />
              <span className="text-sm tracking-wide">
                Sí. Nuestro código de vestimenta es Formal · Black Tie. Las mujeres
                pueden optar por vestidos largos de estilo formal y elegante,
                mientras que los caballeros deberán vestir esmoquin negro (Black Tie)
              </span>
            </li>
            <li className="font-light text-lg tracking-wider">
              ¿HAY COLORES RESERVADOS PARA EL VESTUARIO? <br />
              <span className="text-sm tracking-wide">
                Les agradecemos evitar el color blanco, ya que está reservado
                exclusivamente para la novia. Fuera de esta consideración,
                siéntanse libres de elegir colores y estilos con los que se
                sientan cómodos y elegantes para acompañarnos en esta celebración
                tan especial.
              </span>
            </li>
          </ul>
        </div>
        <hr className="border-dark opacity-15 w-full mt-30 lg:mt-10" />
        <div className="grid lg:grid-cols-2 gap-8 mt-20 lg:mt-10">
          <h2 className="text-4xl font-light tracking-tight">
            Niños
          </h2>
          <ul className="list-disc list-inside flex flex-col gap-10">
            <li className="font-light text-lg tracking-wider">
              ¿LA CELEBRACIÓN SERÁ EXCLUSIVA PARA ADULTOS? <br />
              <span className="text-sm tracking-wide">
                Con mucho cariño, hemos decidido que nuestra boda sea una
                celebración exclusivamente para adultos. Esperamos que esta
                ocasión les permita relajarse, disfrutar de la velada y compartir
                con nosotros una noche inolvidable. Agradecemos profundamente su
                comprensión y su compañía en este día tan especial.
              </span>
            </li>
          </ul>
        </div>
        <hr className="border-dark opacity-15 w-full mt-30 lg:mt-10" />
        <div className="grid lg:grid-cols-2 gap-8 mt-20 lg:mt-10">
          <h2 className="text-4xl font-light tracking-tight">
           comida
          </h2>
          <ul className="list-disc list-inside flex flex-col gap-10">
            <li className="font-light text-lg tracking-wider">
              ¿CONTEMPLAN RESTRICCIONES ALIMENTARIAS? <br />
              <span className="text-sm tracking-wide">
                Sí. Queremos que todos nuestros invitados disfruten plenamente
                la experiencia gastronómica. Contaremos con opciones
                vegetarianas y alternativas para distintas necesidades
                alimentarias. Les pedimos indicar cualquier restricción en su
                confirmación de asistencia para poder tenerlo en cuenta.
              </span>
            </li>
            <li className="font-light text-lg tracking-wider">
              ¿PODEMOS SOLICITAR PLATOS ESPECÍFICOS POR RESTRICCIONES? <br />
              <span className="text-sm tracking-wide">
                Si tienes alguna alergia o requerimiento particular, por favor
                háznoslo saber con anticipación. Haremos nuestro mejor esfuerzo
                para adaptarnos y asegurarnos de que puedas disfrutar la
                celebración con tranquilidad.
              </span>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
