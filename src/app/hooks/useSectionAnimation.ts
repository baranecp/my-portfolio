"use client";

import { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface UseSectionAnimationOptions {
  stagger?: number;
  fromY?: number;
  toY?: number;
  autoAlphaStart?: number;
  autoAlphaEnd?: number;
}

export function useSectionAnimation(
  ref: RefObject<HTMLElement>,
  options?: UseSectionAnimationOptions
) {
  const {
    stagger = 0.15,
    fromY = 40,
    toY = 0,
    autoAlphaStart = 0,
    autoAlphaEnd = 1,
  } = options || {};

  useGSAP(() => {
    const container = ref.current;
    if (!container) return;

    const elements = Array.from(
      container.querySelectorAll<HTMLElement>("[data-animate]")
    );
    if (!elements.length) return;

    elements.forEach((el) => {
      el.style.willChange = "opacity, transform";
    });

    // Set initial state
    gsap.set(elements, { autoAlpha: autoAlphaStart, y: fromY });

    // Batch scroll animation for smoother and bi-directional control
    const triggers = ScrollTrigger.batch(elements, {
      start: "top 85%", // when element enters ~15% from bottom
      end: "bottom 15%", // when element leaves ~15% from top
      onEnter: (batch) => {
        gsap.to(batch, {
          autoAlpha: autoAlphaEnd,
          y: toY,
          ease: "power3.out",
          duration: 0.8,
          stagger,
        });
      },
      onLeave: (batch) => {
        gsap.to(batch, {
          autoAlpha: autoAlphaStart,
          y: fromY,
          ease: "power3.out",
          duration: 0.8,
          stagger,
        });
      },
      onEnterBack: (batch) => {
        gsap.to(batch, {
          autoAlpha: autoAlphaEnd,
          y: toY,
          ease: "power3.out",
          duration: 0.8,
          stagger,
        });
      },
      onLeaveBack: (batch) => {
        gsap.to(batch, {
          autoAlpha: autoAlphaStart,
          y: fromY,
          ease: "power3.out",
          duration: 0.8,
          stagger,
        });
      },
      // optional: adjust batch interval for performance
      interval: 0.1,
    });

    // Refresh ScrollTrigger after idle
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => ScrollTrigger.refresh());
    } else {
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }

    return () => {
      triggers.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [ref, stagger, fromY, toY, autoAlphaStart, autoAlphaEnd]);
}
