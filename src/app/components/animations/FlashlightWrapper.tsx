"use client";

import { useRef, ReactNode, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface FlashlightWrapperProps {
  children: ReactNode;
  radius?: number;
}

export default function FlashlightWrapper({
  children,
  radius = 600,
}: FlashlightWrapperProps) {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [showSpotlight, setShowSpotlight] = useState(false);

  // Detect desktop & update spotlight toggle
  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const update = () => {
        setShowSpotlight(window.innerWidth >= 1024);
      };

      update(); // first sync
      window.addEventListener("resize", update);

      return () => {
        window.removeEventListener("resize", update);
      };
    },
    { dependencies: [] }
  );

  // Lenis smooth scrolling when spotlight is active
  useGSAP(
    () => {
      if (!showSpotlight) return;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      lenis.on("scroll", () => ScrollTrigger.update());

      return () => lenis.destroy();
    },
    { dependencies: [showSpotlight] }
  );

  // Spotlight mouse movement
  useGSAP(
    () => {
      if (!showSpotlight) return;

      const el = spotlightRef.current;
      if (!el) return;

      gsap.set(el, { x: -9999, y: -9999, autoAlpha: 1 });

      const move = (e: MouseEvent) => {
        gsap.to(el, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.35,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", move);

      return () => window.removeEventListener("mousemove", move);
    },
    { dependencies: [showSpotlight], scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className='relative min-h-screen'>
      <div className='absolute inset-0 bg-noise z-40 pointer-events-none' />

      {showSpotlight && (
        <div
          ref={spotlightRef}
          className='spotlight z-50'
          style={{ width: radius, height: radius }}
        />
      )}

      <div className='relative z-60'>{children}</div>
    </div>
  );
}
