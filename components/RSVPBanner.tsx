"use client";

import Link from "@/components/InvitationLink";
import ArrowIcon from "@/components/ArrowIcon";

import { useEffect, useRef } from "react";

const RSVPBanner = ({ invitation }: { invitation?: { name: string; seats: number } | null }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const updatePosition = () => {
      raf = 0;
      if (motionQuery.matches) {
        bg.style.transform = "translate3d(0, 0, 0)";
        return;
      }

      const rect = section.getBoundingClientRect();
      // Only move within the extra image area, leaving a small rounding buffer.
      const travel = Math.max(0, (bg.offsetHeight - rect.height) / 2 - 2);
      const distanceFromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset = Math.max(-travel, Math.min(travel, distanceFromCenter * 0.35));
      bg.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    const scheduleUpdate = () => {
      if (!raf) raf = requestAnimationFrame(updatePosition);
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(section);
    resizeObserver.observe(bg);
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    motionQuery.addEventListener("change", scheduleUpdate);
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      motionQuery.removeEventListener("change", scheduleUpdate);
    };
  }, []);

  return (
    <section
      id="rsvp"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-dark min-h-[clamp(520px,85svh,900px)] flex items-center justify-center"
    >
      <div
        ref={bgRef}
        aria-hidden="true"
        className="absolute -top-[20%] -bottom-[20%] inset-x-0 bg-cover bg-position-[50%_20%] will-change-transform"
        style={{ backgroundImage: "url('/parallax-rsvp.jpg')" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 flex w-full flex-col gap-8 md:gap-12 px-6 py-20 md:py-28 items-center justify-center text-center text-white">
        <div className="w-full">
          {invitation && <p className="display text-2xl md:text-4xl mb-6">{invitation.name}</p>}
          <h2 className="text-7xl md:text-9xl tracking-tight">RSVP</h2>
          {invitation && <p className="mt-5 text-sm">{invitation.seats} {invitation.seats === 1 ? "cupo reservado" : "cupos reservados"}</p>}
          <p className="mx-auto mt-4 max-w-xl opacity-90">
            Por favor, confírmanos si podrás acompañarnos en la celebración de
            nuestro gran día antes del 12 de noviembre de 2026.
          </p>
        </div>
        <Link href="/rsvp" className="button max-w-full bg-light! text-dark!">Confirmar asistencia <ArrowIcon /></Link>
      </div>
    </section>
  );
};

export default RSVPBanner;
