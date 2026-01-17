"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";

interface FlashlightWrapperProps {
  children: ReactNode;
  radius?: number;
}

export default function FlashlightWrapper({
  children,
  radius = 600,
}: FlashlightWrapperProps) {
  // We removed wrapperRef as it wasn't being used for logic
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop (width check + reference check)
    if (window.innerWidth < 1024 || !spotlightRef.current) return;

    const el = spotlightRef.current;

    // 1. Initial Setup: Hide offscreen and center anchor point (-50%)
    gsap.set(el, {
      x: -9999,
      y: -9999,
      xPercent: -50,
      yPercent: -50,
      autoAlpha: 1,
    });

    // 2. High Performance Setters (Bypasses normal animation queue)
    const setX = gsap.quickSetter(el, "x", "px");
    const setY = gsap.quickSetter(el, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      setX(e.clientX);
      setY(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [radius]);

  return (
    <div className='relative'>
      <div
        ref={spotlightRef}
        className='spotlight fixed top-0 left-0 z-50 pointer-events-none rounded-full hidden md:block'
        style={{
          width: radius,
          height: radius,
          background:
            "radial-gradient(circle, rgba(29, 78, 216, 0.15) 0%, rgba(0,0,0,0) 70%)",
        }}
      />
      {children}
    </div>
  );
}
