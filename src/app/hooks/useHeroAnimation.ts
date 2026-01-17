"use client";
import { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function useHeroAnimation(containerRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-animate]");
      if (!elements.length) return;

      gsap.to(elements, {
        y: -120,
        autoAlpha: 0,
        filter: "blur(10px)", // Added blur here
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom 30%",
          scrub: 1.2,
        },
      });
    },
    { scope: containerRef },
  );
}
