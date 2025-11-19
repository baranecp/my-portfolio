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

  // Detect desktop
  useGSAP(() => {
    if (typeof window === "undefined") return;
    const update = () => setShowSpotlight(window.innerWidth >= 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Lenis smooth scroll + throttled ScrollTrigger update
  useGSAP(() => {
    if (!showSpotlight) return;

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => t, // linear easing for performance
      smoothWheel: true,
    });

    let ticking = false;
    function raf(time: number) {
      lenis.raf(time);
      if (!ticking) {
        requestAnimationFrame(() => {
          ScrollTrigger.update();
          ticking = false;
        });
        ticking = true;
      }
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [showSpotlight]);

  // Spotlight mouse movement
  useGSAP(() => {
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
  }, [showSpotlight]);

  return (
    <div ref={wrapperRef} className='relative'>
      {showSpotlight && (
        <div
          ref={spotlightRef}
          className='spotlight z-50 pointer-events-none'
          style={{ width: radius, height: radius }}
        />
      )}
      {children}
    </div>
  );
}
