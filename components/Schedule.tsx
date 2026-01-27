import Image from "next/image";

const Schedule = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      <div className="relative bg-dark flex flex-col justify-center items-center min-h-[60vh]">
        <h2 className="lg:text-7xl text-4xl font-extralight tracking-widest z-40 relative text-center text-light">
          CRONOGRAMA
        </h2>
        <Image
          src="/church.jpg"
          alt="Dann Cartlon"
          fill
          className="object-cover opacity-40"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-16 min-h-[60vh]  text-center md:text-xl text-lg tracking-widest uppercase">
        <div>
          <div>5:00 PM</div>
          <div className="font-extralight">Ceremonia</div>
        </div>
        <div>
          <div>7:00 PM</div>
          <div className="font-extralight">Coctel</div>
        </div>
        <div>
          <div>8:00 PM</div>
          <div className="font-extralight">Cena</div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
