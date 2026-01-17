"use client";
import { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function useSectionAnimation(
  containerRef: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-animate]");
      if (!elements.length) return;

      elements.forEach((el) => {
        // Create a single timeline that tracks the element's entire life on screen
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            // Start: When the top of the element hits the bottom of the viewport
            start: "top bottom",
            // End: When the bottom of the element leaves the top of the viewport
            end: "bottom top",
            scrub: 1.2, // Smooth "catch-up" momentum
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          el,
          { autoAlpha: 0, y: 80, filter: "blur(10px)" }, // Start hidden below
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.3, // Entrance phase
            ease: "power2.out",
          },
        )
          .to(el, {
            // This is the "Stay" phase.
            // We do nothing for a bit so it stays visible in the middle.
            duration: 0.5,
          })
          .to(el, {
            autoAlpha: 0,
            y: -80, // Exit phase (Slide up and out)
            filter: "blur(10px)",
            duration: 0.3,
            ease: "power2.in",
          });
      });
    },
    { scope: containerRef },
  );
}
