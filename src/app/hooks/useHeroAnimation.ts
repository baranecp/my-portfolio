"use client";
import { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function useHeroAnimation(ref: RefObject<HTMLElement>) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const elements = el.querySelectorAll("[data-animate]");

      gsap.fromTo(
        elements,
        { autoAlpha: 1, y: 0 },
        {
          autoAlpha: 0,
          y: -40,
          ease: "power3.out",
          duration: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom 50%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { dependencies: [ref] }
  );
}
