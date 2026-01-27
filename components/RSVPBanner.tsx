"use client";
import { useEffect, useRef } from "react";

const RSVPBanner = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    let raf = 0;
    const speed = 0.35;
    const baseOffset = -200;
    const minOffset = -500;
    const maxOffset = 150;
    const scale = 1.18;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const rawOffset = rect.top * speed + baseOffset;
        const offset = Math.min(maxOffset, Math.max(minOffset, rawOffset));
        bg.style.transform = `translate3d(0, ${offset}px, 0) scale(${scale})`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden h-[520px] md:h-[900px]"
    >
      <div
        ref={bgRef}
        className="absolute -top-[20%] -bottom-[20%] inset-x-0 bg-cover bg-position-[50%_20%] will-change-transform"
        style={{ backgroundImage: "url('/parallax-rsvp.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 flex flex-col gap-12 h-full items-center justify-center text-center text-white">
        <div className="px-6">
          <h2 className="text-5xl tracking-[0.25em]">RSVP</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-90">
            Por favor, confírmanos si podrás acompañarnos en la celebración de
            nuestro gran día antes del 1 de enero de 2026.
          </p>
        </div>
        <button className="bg-light! text-dark!">CONFIRMAR</button>
      </div>
    </section>
  );
};

export default RSVPBanner;
