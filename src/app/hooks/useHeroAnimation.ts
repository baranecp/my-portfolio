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
          y: 20, // smaller movement for smoother feel
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 0.5, // smooth scrub
            invalidateOnRefresh: true,
          },
        }
      );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { dependencies: [ref] }
  );
}
