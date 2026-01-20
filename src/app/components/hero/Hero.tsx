"use client";

import { forwardRef, useRef, useImperativeHandle } from "react";
import { useHeroAnimation } from "@/app/hooks/useHeroAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";

const Hero = forwardRef<HTMLDivElement>((_props, externalRef) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(externalRef, () => internalRef.current as HTMLDivElement);

  useHeroAnimation(internalRef);

  useGSAP(
    () => {
      const heroEl = internalRef.current;
      const indicatorEl = indicatorRef.current;

      if (!heroEl || !indicatorEl) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          indicatorEl,
          { autoAlpha: 1, y: 0 },
          {
            autoAlpha: 0,
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: heroEl,
              start: "top top",
              end: "30% top",
              scrub: true,
              // invalidateOnRefresh ensures production re-calculates correctly
              invalidateOnRefresh: true,
              // This ensures if we jump to top, it forces visibility
              toggleActions: "play none none reverse",
            },
          },
        );
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
      <ScrollIndicator ref={indicatorRef} />
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
