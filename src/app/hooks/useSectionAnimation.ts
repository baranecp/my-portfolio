"use client";
import { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function useSectionAnimation(
  ref: RefObject<HTMLElement>,
  options?: { stagger?: number }
) {
  const stagger = options?.stagger ?? 0.15;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const elements = el.querySelectorAll("[data-animate]");

      // Initially hide all elements
      gsap.set(elements, { autoAlpha: 0, y: 40 });

      // Batch animations so multiple triggers are smoother
      ScrollTrigger.batch(elements, {
        start: "top 90%", // triggers even if section is partially visible
        end: "bottom 10%",
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            ease: "power3.out",
            duration: 0.8,
            stagger: stagger,
          });
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            autoAlpha: 0,
            y: 40,
            ease: "power3.out",
            duration: 0.8,
            stagger: stagger,
          });
        },
      });

      // Refresh ScrollTrigger if needed
      ScrollTrigger.refresh();

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { dependencies: [ref] }
  );
}
