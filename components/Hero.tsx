import Image from "next/image";

function Hero() {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 lg:max-h-screen text-dark">
      <div className=" uppercase flex flex-col justify-center items-center md:gap-60 gap-48 h-screen pt-80">
        <div className="relative md:text-5xl text-4xl">
          <Image
            src="/hero-small.jpg"
            alt="Danna & Fabian"
            width={350}
            height={300}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 grayscale opacity-80 w-3xs md:w-84"
          />
          <div className=" z-50 relative font-light tracking-widest">
            Danna & Fabian
          </div>
        </div>
        <div className="md:text-xl text-base mb-16 text-center tracking-widest font-light">
          <div>16.07.2026</div>
          <div>Barraquilla, Colombia</div>
        </div>
      </div>
      <div className="relative min-h-[60vh] max-h-screen">
        <Image
          src="/hero-big.jpg"
          alt="Danna & Fabian"
          fill
          className="object-cover opacity-90"
        />
      </div>
    </div>
  );
}

export default Hero;
