"use client";
import { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function useHeroAnimation(containerRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (!containerRef.current) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1300px)", () => {
        const elements = gsap.utils.toArray<HTMLElement>("[data-animate]");
        if (!elements.length) return;

        gsap.set(containerRef.current, { perspective: 1000 });
        gsap.set(elements, {
          transformOrigin: "center center",
          force3D: true,
          backfaceVisibility: "hidden",
        });

        gsap.to(elements, {
          y: -100,
          rotateX: -15,
          scale: 0.9,
          autoAlpha: 0,
          filter: "blur(4px)",
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom 30%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );
}
