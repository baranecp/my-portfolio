"use client";

import { forwardRef, useRef, useImperativeHandle } from "react";
import { useHeroAnimation } from "@/app/hooks/useHeroAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";

const Hero = forwardRef<HTMLDivElement>((_props, externalRef) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null); // <--- Reference to the indicator

  useImperativeHandle(externalRef, () => internalRef.current as HTMLDivElement);

  // 1. Hero Entrance Animation
  useHeroAnimation(internalRef);

  // 2. Scroll Indicator Fade Out Logic
  // We put this HERE so it is perfectly synced with the Hero section
  useGSAP(
    () => {
      const heroEl = internalRef.current;
      const indicatorEl = indicatorRef.current;

      if (!heroEl || !indicatorEl) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.to(indicatorEl, {
          autoAlpha: 0, // Fades to 0
          y: -20, // Moves up slightly
          ease: "none",
          scrollTrigger: {
            trigger: heroEl,
            start: "top top", // Starts fading exactly when you start scrolling
            end: "30% top", // Fully hidden when Hero is 30% scrolled
            scrub: true, // Smoothly tied to scrollbar

            // Optimization: Set display:none when invisible to save clicks/GPU
            onLeave: () => gsap.set(indicatorEl, { display: "none" }),
            onEnterBack: () => gsap.set(indicatorEl, { display: "flex" }),
          },
        });
      });

      return () => mm.revert();
    },
    { scope: internalRef },
  );

  return (
    <section
      id='home'
      ref={internalRef}
      className='relative flex flex-col justify-center mx-auto px-6 py-32 min-h-screen max-w-7xl'>
      <HeroContent />

      {/* We pass the ref so we can animate it from above */}
      <ScrollIndicator ref={indicatorRef} />
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
