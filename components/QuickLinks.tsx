const QuickLinks = () => {
  return (
    <div className="border-y border-stone-300 grid lg:grid-cols-3 align-baseline grid-cols-1">
      <div className="flex flex-col items-center gap-12 text-center md:py-32 py-24 relative">
        <h2 className="md:text-4xl text-2xl tracking-widest uppercase">Regalos</h2>
        <p className="tracking-wide font-extralight md:max-w-md max-w-xs pb-12">
          Aunque su presencia en nuestra boda es el mejor regalo, si desean
          acompañarnos con un obsequio, los invitamos a visitar nuestra lista de
          regalos.
        </p>
        <button className="absolute left-1/2 -translate-x-1/2 bottom-10 text-sm! md:bottom-14">Registro</button>
      </div>
      <div className="flex flex-col items-center  gap-12 text-center md:py-32 py-24 relative border-y lg:border-y-0 lg:border-x border-stone-300">
        <h2 className="md:text-4xl text-2xl tracking-widest uppercase">
          Preguntas Frecuentes
        </h2>
        <p className="tracking-wide font-extralight md:max-w-md max-w-xs pb-12">
          Visita nuestra sección de preguntas frecuentes para encontrar
          toda la información que necesitas.
        </p>
        <button className="absolute left-1/2 -translate-x-1/2 bottom-10 text-sm! md:bottom-14">Preguntas Frecuentes</button>
      </div>
      <div className="flex flex-col items-center gap-12 text-center md:py-32 py-24 relative">
        <h2 className="md:text-4xl text-2xl tracking-widest uppercase">CONTÁCTANOS</h2>
        <p className="tracking-wide font-extralight md:max-w-md max-w-xs pb-12">
          Si tienen alguna pregunta o necesitan más información, no duden en
          ponerse en contacto con nosotros.
        </p>
        <button className="absolute left-1/2 -translate-x-1/2 bottom-10 text-sm! md:bottom-14">ESCRÍBENOS</button>
      </div>
    </div>
  );
};

export default QuickLinks;
