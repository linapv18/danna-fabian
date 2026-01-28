import Image from "next/image";

type CollagePhoto = {
  src: string;
  alt: string;
  className: string;
  aspect: string;
};

const PHOTOS: CollagePhoto[] = [
  {
    src: "/story-1.webp",
    alt: "Foto 1",
    className: "left-0 top-[14vh] w-[500px] max-w-[50vw]",
    aspect: "aspect-[10/16]",
  },
  {
    src: "/story-2.webp",
    alt: "Foto 2",
    className: "right-2 md:top-[35vh] top-[60vh] w-[550px] max-w-[50vw]",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/story-3.webp",
    alt: "Foto 3",
    className: "left-[8%] md:left-[15%] top-[85vh] md:top-[100vh] w-[500px] max-w-[60vw]",
    aspect: "aspect-[1/1]",
  },
  {
    src: "/story-4.webp",
    alt: "Foto 4",
    className: "right-[5%] top-[120vh] w-[500px] max-w-[40vw]",
    aspect: "aspect-[8/12]",
  },
  {
    src: "/story-5.webp",
    alt: "Foto 5",
    className: "left-1/2 md:top-[200vh] top-[160vh] w-[700px] max-w-[80vw] -translate-x-1/2",
    aspect: "aspect-[4/3]",
  },
];

export default function StoryCollage() {
  return (
    <section className="relative">
      <div className="relative md:min-h-[290vh] min-h-[220vh]">
        <div className="pointer-events-none sticky top-1/2 z-20 flex justify-center">
          <div className="w-full max-w-5xl px-6 text-center">
            <p className="md:text-xl text-base tracking-widest opacity-70">DANNA & FABIAN</p>
            <h2 className="mt-6 md:text-8xl text-4xl font-light tracking-wide">NUESTRA HISTORIA</h2>
          </div>
        </div>
        <div className="absolute inset-0">
          {PHOTOS.map((p) => (
            <div
              key={p.src}
              className={`absolute ${p.className} shadow-[0_20px_60px_rgba(0,0,0,0.18)]`}
            >
              <div className="relative overflow-hidden bg-black/5 aspe">
                <div className={`relative ${p.aspect}`}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 70vw, 560px"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
