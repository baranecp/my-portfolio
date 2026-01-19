"use client";

import { forwardRef, useRef, useImperativeHandle } from "react";
import { useHeroAnimation } from "../hooks/useHeroAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RiScrollToBottomLine } from "react-icons/ri";
import Magnetic from "./animations/Magnetic";

const Hero = forwardRef<HTMLDivElement>((_props, externalRef) => {
  // 1. Create an internal ref we control
  const internalRef = useRef<HTMLDivElement>(null);

  // 2. Sync it with the external ref safely
  useImperativeHandle(externalRef, () => internalRef.current as HTMLDivElement);

  // 3. Pass our strictly typed internal ref to the hook
  useHeroAnimation(internalRef);

  const arrowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const heroEl = internalRef.current;
      if (!heroEl || !arrowRef.current || !textRef.current) return;

      gsap.to(arrowRef.current, {
        y: 10,
        duration: 1.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.to([arrowRef.current, textRef.current], {
          autoAlpha: 0,
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: heroEl,
            start: "top top",
            end: "20% top",
            scrub: 1,
            onLeave: () =>
              gsap.set([arrowRef.current, textRef.current], {
                display: "none",
              }),
            onEnterBack: () =>
              gsap.set([arrowRef.current, textRef.current], {
                display: "flex",
              }),
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
      <div className='max-w-5xl z-10'>
        <p
          data-animate
          className='text-accent font-mono text-base md:text-lg mb-4'>
          <span className='opacity-50'>00.</span> Hi, my name is
        </p>

        <h1
          id='hero-heading'
          data-animate
          className='text-[clamp(2.5rem,10vw,5.5rem)] font-bold leading-[1.1] text-white mb-2'>
          Peter Baranec<span className='text-accent'>.</span>
        </h1>

        <h2
          data-animate
          className='text-[clamp(2rem,7vw,4rem)] font-bold leading-[1.1] text-[#8892b0]'>
          I build high-performance web interfaces.
        </h2>

        <p
          data-animate
          className='max-w-xl text-[#8892b0]/80 mt-8 text-lg md:text-xl leading-relaxed'>
          I’m a self-taught developer specializing in crafting clean, responsive
          experiences. Currently, I’m focused on building interactive and
          motion-driven web applications.
        </p>

        <div data-animate className='mt-12 flex flex-wrap gap-4'>
          <Magnetic>
            <a
              href='#projects'
              className='px-10 py-4 border-2 border-accent text-accent rounded font-mono text-sm hover:bg-accent/10 transition-all duration-300'>
              Check out my work!
            </a>
          </Magnetic>
        </div>
      </div>
      <div
        aria-hidden='true'
        className='absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden lg:flex pointer-events-none'>
        <div
          ref={textRef}
          className='text-accent font-mono text-xs uppercase tracking-widest select-none'>
          Scroll
        </div>
        <div ref={arrowRef}>
          <RiScrollToBottomLine className='text-accent w-7 h-7' />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
