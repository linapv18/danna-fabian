import Image from "next/image";

const VenueDetails = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 min-h-[60vh] border-y border-stone-300 place-items-center">
      <div className="flex flex-col justify-center items-center md:gap-24 gap-12 text-center lg:text-xl text-lg my-24 tracking-widest font-light order-2 md:order-0 max-w-4/5">
        <div className="flex flex-col gap-5">
          <div>
            <div className="uppercase font-medium">Ceremonia:</div>
            <div className="underline uppercase font-light tracking-wide">Parroquia Inmaculada Concepción</div>
          </div>
          <div className="flex lg:gap-2 gap-0 lg:text-base text-sm">
            <div className="font-medium">Dirección:</div>
            <a
              href="https://www.google.com/maps/dir//Cra.+57+%2368-85,+Nte.+Centro+Historico,+Barranquilla,+Atl%C3%A1ntico/@11.0133248,-74.8158976,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8ef42d75e1dd0ccd:0xdbcfdb56e4963e8a!2m2!1d-74.798139!2d10.9987988?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D"
              className="underline"
            >
              Cra. 57 #68-85, Nte. Centro Historico
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <div className="uppercase font-medium">Recepción:</div>
            <div className="underline uppercase font-light tracking-wide">Hotel Dann Carlton</div>
          </div>
          <div className="flex lg:gap-2 gap-1 lg:text-base text-sm">
            <div className="font-medium">Dirección: </div>
            <a
              href="https://www.google.com/maps?sca_esv=e4930b54a8b6c4ed&sxsrf=ANbL-n4zkNGyqOL5O1m_mU3UVs38vV2B1A:1768597297743&fbs=ADc_l-aQh0vc06UKBNukb4vcZb6s0JOSNj2A2XThnwXfEBOd0p_DiaqG_qzhunH-iD-GdUvb8q1HmD6ZYPm-c2naVfIwhbIKMkOnj_W2jL1S2i-BLBC5fjzeZLhGFCoOAvwdS0KLX9kYB0TGFH9PtN5QsyeaA9hzMcs-QHbLyg2Io12541WXzj4vH-3_jhz2y8LChO-bzCGF6OAPGCIEllVjmJs2UdngvyGGGskY7p7u2DPRXLpmxr8&biw=2540&bih=1363&dpr=1&aic=0&um=1&ie=UTF-8&fb=1&gl=co&sa=X&geocode=KXPHHqpDLfSOMYg8vQwemqq2&daddr=Cl.+98+%2352B-10,+Riomar,+Barranquilla,+Atl%C3%A1ntico"
              className="underline"
            >
              Cl. 98 #52B-10, Riomar
            </a>
          </div>
        </div>
        <button>Viaje y Alojamiento</button>
      </div>
      <div className="relative bg-dark flex flex-col justify-center items-center min-h-[70vh] w-full">
        <h2 className="lg:text-7xl text-4xl font-extralight tracking-widest z-40 relative text-center text-light">
          UBICACIÓN
        </h2>
        <Image
          src="/venue.jpg"
          alt="Venue"
          width={350}
          height={350}
          className=" opacity-50 absolute w-3xs lg:w-96"
        />
      </div>
    </div>
  );
};

export default VenueDetails;
