"use client";

import { forwardRef, useRef, useImperativeHandle } from "react";
import { useHeroAnimation } from "@/app/hooks/useHeroAnimation";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";

const Hero = forwardRef<HTMLDivElement>((_props, externalRef) => {
  // 1. Create internal ref
  const internalRef = useRef<HTMLDivElement>(null);

  // 2. Sync with parent
  useImperativeHandle(externalRef, () => internalRef.current as HTMLDivElement);

  // 3. Trigger Main Entrance Animation (Hook)
  useHeroAnimation(internalRef);

  return (
    <section
      id='home'
      ref={internalRef}
      className='relative flex flex-col justify-center mx-auto px-6 py-32 min-h-screen max-w-7xl'>
      <HeroContent />
      <ScrollIndicator containerRef={internalRef} />
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
