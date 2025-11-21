"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MorphingMenuIconProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function MorphingMenuIcon({
  isOpen,
  toggleMenu,
}: MorphingMenuIconProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const middleRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.to(topRef.current, {
        y: isOpen ? 7 : 0,
        rotate: isOpen ? 45 : 0,
        duration: 0.28,
        ease: "power2.inOut",
      });

      gsap.to(middleRef.current, {
        opacity: isOpen ? 0 : 1,
        duration: 0.28,
        ease: "power2.inOut",
      });

      gsap.to(bottomRef.current, {
        y: isOpen ? -7 : 0,
        rotate: isOpen ? -45 : 0,
        duration: 0.28,
        ease: "power2.inOut",
      });
    },
    { dependencies: [isOpen], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      onClick={toggleMenu}
      className='w-10 h-10 flex flex-col justify-center items-center cursor-pointer gap-1'
      aria-label='Toggle menu'
      role='button'>
      <div ref={topRef} className='w-8 h-1 bg-white rounded' />
      <div ref={middleRef} className='w-8 h-1 bg-white rounded' />
      <div ref={bottomRef} className='w-8 h-1 bg-white rounded' />
    </div>
  );
}
