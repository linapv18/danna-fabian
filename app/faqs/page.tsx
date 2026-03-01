import NavBar from "@/components/NavBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
};

export default function FaqsPage() {
  return (
    <div>
      <NavBar />
      <div className="my-40 md:px-24 px-6">
        <div className="grid lg:grid-cols-2 gap-8 pt-10">
          <h1 className="uppercase lg:text-4xl text-3xl font-light tracking-widest">
            vestimenta
          </h1>
          <ul className="list-disc list-inside flex flex-col gap-10">
            <li className="font-light text-lg tracking-wider">
              ¿HAY CÓDIGO DE VESTIMENTA? <br />
              <span className="text-sm tracking-wide">
                Sí — el código de vestimenta es formal. Les invitamos a optar
                por atuendos elegantes: vestidos largos sofisticados para
                mujeres, y traje o esmoquin para hombres. Piensen en un look
                clásico, pulido y acorde a una celebración especial de noche.
              </span>
            </li>
            <li className="font-light text-lg tracking-wider">
              ¿HAY COLORES ESPECÍFICOS PARA EL VESTUARIO? <br />
              <span className="text-sm tracking-wide">
                No hay una paleta obligatoria. Sin embargo, les pedimos
                amablemente evitar el color blanco, ya que está reservado para
                la novia. Fuera de eso, siéntanse libres de elegir colores que
                los hagan sentir cómodos y seguros.
              </span>
            </li>
          </ul>
        </div>
        <hr className="border-dark opacity-15 w-full mt-30 lg:mt-10" />
        <div className="grid lg:grid-cols-2 gap-8 mt-20 lg:mt-10">
          <h1 className="uppercase lg:text-4xl text-3xl font-light tracking-widest">
            Niños
          </h1>
          <ul className="list-disc list-inside flex flex-col gap-10">
            <li className="font-light text-lg tracking-wider">
              ¿LOS NIÑOS SON BIENVENIDOS A LA BODA? <br />
              <span className="text-sm tracking-wide">
                ¡Por supuesto! Nos encantará contar con ellos en este día tan
                especial. Hemos preparado un espacio pensado para los más
                pequeños, con actividades y entretenimiento para que también
                disfruten la celebración.
              </span>
            </li>
            <li className="font-light text-lg tracking-wider">
              ¿EXISTE UN LÍMITE DE EDAD PARA ASISTIR? <br />
              <span className="text-sm tracking-wide">
                No hay límite de edad. Queremos que toda la familia sea parte de
                este momento, desde los más pequeños hasta los mayores.
              </span>
            </li>
          </ul>
        </div>
        <hr className="border-dark opacity-15 w-full mt-30 lg:mt-10" />
        <div className="grid lg:grid-cols-2 gap-8 mt-20 lg:mt-10">
          <h1 className="uppercase lg:text-4xl text-3xl font-light tracking-widest">
           comida
          </h1>
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
      </div>
      <div className="bg-dark h-12"> </div>
    </div>
  );
}
