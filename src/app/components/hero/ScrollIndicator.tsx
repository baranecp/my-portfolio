"use client";

import { useRef, RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RiScrollToBottomLine } from "react-icons/ri";

interface ScrollIndicatorProps {
  containerRef: RefObject<HTMLElement | null>;
}

export default function ScrollIndicator({
  containerRef,
}: ScrollIndicatorProps) {
  const arrowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Bouncing Animation (Always active)
      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          y: 10,
          duration: 1.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // 2. Scroll-out Logic (Desktop only)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        // Only run if parent container is ready
        if (!containerRef.current || !arrowRef.current) return;

        gsap.to([arrowRef.current, textRef.current], {
          autoAlpha: 0,
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "20% top",
            scrub: 1,
            // Optimization: Hide completely when out of view
            onLeave: () =>
              gsap.set([arrowRef.current, textRef.current], {
                display: "none",
              }),
            onEnterBack: () =>
              gsap.set([arrowRef.current, textRef.current], {
                display: "flex",
              }),
          },
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }, // Scope to the parent container
  );

  return (
    <div
      aria-hidden='true'
      className='absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden lg:flex pointer-events-none'>
      <div
        ref={textRef}
        className='text-accent font-mono text-xs uppercase tracking-widest select-none'>
        Scroll
      </div>
      <div ref={arrowRef}>
        <RiScrollToBottomLine className='text-accent w-7 h-7' />
      </div>
    </div>
  );
}
