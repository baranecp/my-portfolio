"use client";
import { useEffect, useRef, ReactNode } from "react";
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

  useEffect(() => {
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

    // sync lenis with GSAP ScrollTrigger updates
    lenis.on("scroll", () => ScrollTrigger.update());

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    // initial position offscreen
    gsap.set(el, { x: -9999, y: -9999, autoAlpha: 1 });

    // follow mouse smoothly
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
  }, []);

  return (
    <div className='relative min-h-screen'>
      {/* noise overlay for subtle texture */}
      <div className='absolute inset-0 bg-noise z-40 pointer-events-none' />

      {/* spotlight element */}
      <div
        ref={spotlightRef}
        className='spotlight z-50'
        style={{ width: radius, height: radius }}
      />

      {/* content on top */}
      <div className='relative z-60'>{children}</div>
    </div>
  );
}
