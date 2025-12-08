"use client";

import { useRef, ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

interface FlashlightWrapperProps {
  children: ReactNode;
  radius?: number;
}

export default function FlashlightWrapper({
  children,
  radius = 600,
}: FlashlightWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 1024 || !spotlightRef.current) return;

    const el = spotlightRef.current;

    gsap.set(el, { x: -9999, y: -9999, autoAlpha: 1 });

    const setX = gsap.quickSetter(el, "x", "px");
    const setY = gsap.quickSetter(el, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      setX(e.clientX);
      setY(e.clientY);
    };
    window.addEventListener("mousemove", onMouseMove);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => t,
      wheelMultiplier: 1,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (value !== undefined) lenis.scrollTo(value);
        return lenis.scroll.instance?.scroll || 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: "transform",
    });

    ScrollTrigger.addEventListener("refresh", () => ScrollTrigger.update());
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [radius]);

  return (
    <div ref={wrapperRef} className='relative'>
      <div
        ref={spotlightRef}
        className='spotlight z-50 pointer-events-none'
        style={{ width: radius, height: radius }}
      />
      {children}
    </div>
  );
}
