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

    elements.forEach((el) => (el.style.willChange = "opacity, transform"));

    // Set initial state
    gsap.set(elements, { autoAlpha: autoAlphaStart, y: fromY });

    // Create individual ScrollTriggers with scrub for smooth scroll
    const triggers = elements.map((el, i) =>
      gsap.to(el, {
        autoAlpha: autoAlphaEnd,
        y: toY,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "bottom 10%",
          scrub: true,
          invalidateOnRefresh: true,
        },
        duration: 1,
        delay: i * stagger,
      })
    );

    return () => {
      triggers.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [ref, stagger, fromY, toY, autoAlphaStart, autoAlphaEnd]);
}
