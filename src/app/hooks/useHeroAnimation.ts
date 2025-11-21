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

      const elements = Array.from(
        el.querySelectorAll<HTMLElement>("[data-animate]")
      );

      // Ensure elements have will-change for smoother animations
      elements.forEach((el) => (el.style.willChange = "opacity, transform"));

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

      return () => {
        // Clean up ScrollTriggers created in this hero
        ScrollTrigger.getAll()
          .filter((st) => st.trigger === el)
          .forEach((st) => st.kill());
      };
    },
    { dependencies: [ref] }
  );
}
