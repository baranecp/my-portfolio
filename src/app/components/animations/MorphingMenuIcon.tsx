"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MorphingMenuIconProps {
  isOpen: boolean;
  // Allow the function to accept a Mouse or Touch event
  toggleMenu: (e: React.MouseEvent | React.TouchEvent) => void;
}

export default function MorphingMenuIcon({
  isOpen,
  toggleMenu,
}: MorphingMenuIconProps) {
  const containerRef = useRef<HTMLButtonElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const middleRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const translateVal = 8;

      const tl = gsap.timeline();

      tl.to(
        topRef.current,
        {
          y: isOpen ? translateVal : 0,
          rotate: isOpen ? 45 : 0,
          duration: 0.28,
          ease: "back.out(1.7)",
        },
        0,
      )
        .to(
          middleRef.current,
          {
            opacity: isOpen ? 0 : 1,
            duration: 0.28,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          bottomRef.current,
          {
            y: isOpen ? -translateVal : 0,
            rotate: isOpen ? -45 : 0,
            duration: 0.28,
            ease: "back.out(1.7)",
          },
          0,
        );
    },
    { dependencies: [isOpen], scope: containerRef },
  );

  return (
    <button
      ref={containerRef}
      onClick={toggleMenu}
      className='group w-10 h-10 flex flex-col justify-center items-center gap-1 z-50 focus:outline-none'
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      type='button'>
      <div
        ref={topRef}
        className='w-8 h-1 bg-white rounded origin-center transition-colors group-hover:bg-green-400'
      />
      <div
        ref={middleRef}
        className='w-8 h-1 bg-white rounded transition-colors group-hover:bg-green-400'
      />
      <div
        ref={bottomRef}
        className='w-8 h-1 bg-white rounded origin-center transition-colors group-hover:bg-green-400'
      />
    </button>
  );
}
