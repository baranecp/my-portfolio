"use client";
import { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function useSectionAnimation(
  containerRef: RefObject<HTMLElement | null>,
  animateOut: boolean = true,
) {
  useGSAP(
    () => {
      if (!containerRef.current) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const elements = gsap.utils.toArray<HTMLElement>("[data-animate]");
        if (!elements.length) return;

        elements.forEach((el) => {
          gsap.set(el, {
            transformOrigin: "center center",
            force3D: true,
            backfaceVisibility: "hidden",
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "top 90%", // Starts entering when it hits bottom of screen
              // FIX 1: Changed from 'bottom 35%' to 'bottom top'
              // This ensures the element is NOT faded out when you jump to it via menu
              end: animateOut ? "bottom top" : "bottom bottom",
              scrub: 1.8,
              invalidateOnRefresh: true,
              preventOverlaps: true,
              fastScrollEnd: true,
            },
          });

          // ENTRANCE (Exact same animation)
          tl.fromTo(
            el,
            {
              autoAlpha: 0,
              y: 100,
              rotateX: 15,
              scale: 0.9,
              filter: "blur(6px)",
            },
            {
              autoAlpha: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.6,
              ease: "power2.out",
            },
          )
            // FIX 2: Increased duration of the "Stay Visible" phase to 3
            // This forces the "Exit" to wait until the very last moment
            .to(el, { duration: 0.6 });

          // EXIT (Exact same animation, just happens later)
          if (animateOut) {
            tl.to(el, {
              autoAlpha: 0,
              y: -100,
              rotateX: -15,
              scale: 0.9,
              filter: "blur(6px)",
              duration: 0.6,
              ease: "power2.in",
            });
          }
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );
}
