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

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const elements = el.querySelectorAll("[data-animate]");

    // Smooth animations with will-change
    elements.forEach(
      (el) => ((el as HTMLElement).style.willChange = "opacity, transform")
    );

    gsap.set(elements, { autoAlpha: 0, y: 40 });

    ScrollTrigger.batch(elements, {
      start: "top 80%",
      end: "bottom 20%",
      onEnter: (batch) => {
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          ease: "power3.out",
          duration: 0.6,
          stagger,
        });
      },
      onLeaveBack: (batch) => {
        gsap.to(batch, {
          autoAlpha: 0,
          y: 40,
          ease: "power3.out",
          duration: 0.6,
          stagger,
        });
      },
    });

    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => ScrollTrigger.refresh());
    } else {
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, [ref]);
}
