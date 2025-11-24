"use client";

import { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface UseSectionAnimationOptions {
  stagger?: number;
}

export function useSectionAnimation(
  ref: RefObject<HTMLElement>,
  options?: UseSectionAnimationOptions
) {
  const stagger = options?.stagger ?? 0.15;

  useGSAP(() => {
    const container = ref.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>("[data-animate]");

    elements.forEach((el) => (el.style.willChange = "opacity, transform"));

    gsap.set(elements, { autoAlpha: 0, y: 40 });

    const triggers = ScrollTrigger.batch(elements, {
      start: "top 80%",
      end: "bottom 20%",
      onEnter: (batch) => {
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          ease: "power3.out",
          duration: 0.8,
          stagger,
        });
      },
      onLeaveBack: (batch) => {
        gsap.to(batch, {
          autoAlpha: 0,
          y: 40,
          ease: "power3.out",
          duration: 0.8,
          stagger,
        });
      },
    });

    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => ScrollTrigger.refresh());
    } else {
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }

    return () => {
      triggers.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [ref, stagger]);
}
