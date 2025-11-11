"use client";
import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";

interface FlashlightWrapperProps {
  children: ReactNode;
  radius?: number;
  color?: string;
  intensity?: number;
}

export default function FlashlightWrapper({
  children,
  radius = 600,
  color = "29,78,216",
  intensity = 0.15,
}: FlashlightWrapperProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(overlay, {
        duration: 0.3,
        backgroundImage: `radial-gradient(${radius}px at ${e.clientX}px ${e.clientY}px, rgba(${color},${intensity}), transparent 80%)`,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [radius, color, intensity]);
  return (
    <div className='relative w-full min-h-screen overflow-hidden'>
      <div
        ref={overlayRef}
        className='fixed inset-0 pointer-events-none bg-transparent z-50'></div>
      <div className='relative z-10'>{children}</div>
    </div>
  );
}
