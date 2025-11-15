"use client";
import { useEffect, useRef, ReactNode, useState } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const [showSpotlight, setShowSpotlight] = useState(false);

  // Detect desktop and handle window resize
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateSpotlight = () => {
      setShowSpotlight(window.innerWidth >= 1024);
    };

    // Defer initial update to avoid cascading render
    const id = requestAnimationFrame(updateSpotlight);

    // Listen to window resize
    window.addEventListener("resize", updateSpotlight);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", updateSpotlight);
    };
  }, []);

  // Lenis smooth scrolling only when spotlight active
  useEffect(() => {
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
  }, [showSpotlight]);

  // Spotlight follows mouse only when active
  useEffect(() => {
    if (!showSpotlight) return;

    const el = spotlightRef.current;
    if (!el) return;

    gsap.set(el, { x: -9999, y: -9999, autoAlpha: 1 });

    const move = (e: MouseEvent) => {
      gsap.to(el, {
        duration: 0.35,
        x: e.clientX,
        y: e.clientY,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [showSpotlight]);

  return (
    <div className='relative min-h-screen'>
      <div className='absolute inset-0 bg-noise z-40 pointer-events-none' />

      {/* spotlight only renders on desktop */}
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
