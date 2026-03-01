import type { Metadata } from "next";

import NavBar from "@/components/NavBar";
import StickyStory from "@/components/StoryCollage";

export const metadata: Metadata = {
  title: "Nuestra Historia",
};

export default function StoryPage() {
  return (
    <div>
      <NavBar />
      <StickyStory />
      <div className="flex flex-col items-center justify-center gap-12 text-center mb-20 md:mb-40">
        <p className="text-center text-base tracking-wide leading-relaxed md:max-w-3xl max-w-xs font-extralight mx-auto mt-8 md:mt-12 md:text-xl">
          We&apos;re Marc and Julia, a couple whose journey together has been as
          enchanting as the city of Paris itself. From our first meeting in a
          quaint Parisian café to our romantic strolls along the Seine, our bond
          has grown stronger with each passing day. We are thrilled to share
          this special moment in our lives with you in the city that has
          witnessed our love blossom. Join us as we embark on this new chapter,
          celebrating our union in the heart of Paris, where every corner holds
          a memory, and every moment is filled with love.
        </p>
        <div>
          <p className="text-center text-xl tracking-wide font-light md:max-w-3xl max-w-xs mx-auto md:text-2xl mb-4 uppercase">
            Confirma tu asistencia para acompañarnos y hacer parte de esta
            inolvidable celebración!
          </p>
          <button>CONFIRMAR ASISTENCIA</button>
        </div>
      </div>
      <div className="bg-dark h-12"> </div>
    </div>
  );
}
