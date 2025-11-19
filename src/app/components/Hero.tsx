"use client";

import { forwardRef, useRef } from "react";
import { useHeroAnimation } from "../hooks/useHeroAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiScrollToBottomLine } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const Hero = forwardRef<HTMLDivElement>((_props, ref) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useHeroAnimation(ref as any);

  const arrowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // GSAP scroll indicator animation
  useGSAP(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const heroEl = (ref as any).current;
    if (!arrowRef.current || !textRef.current || !heroEl) return;

    // Bounce animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(arrowRef.current, { y: 12, duration: 0.8, ease: "power1.inOut" }).to(
      textRef.current,
      { y: 6, duration: 0.8, ease: "power1.inOut" },
      0
    );

    // Fade out on scroll
    gsap.to([arrowRef.current, textRef.current], {
      autoAlpha: 0,
      scrollTrigger: {
        trigger: heroEl,
        start: "top top",
        end: "bottom 50%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  }, [ref]);

  return (
    <section
      ref={ref}
      className='hero flex flex-col justify-center min-h-screen px-8 gap-2 lg:gap-4 text-center lg:text-left relative'>
      <div>
        <p data-animate className='text-[#64ffda] font-mono text-lg'>
          Hi, my name is
        </p>

        <h1
          data-animate
          className='text-[clamp(3rem,8vw,6rem)] font-bold leading-tight'>
          Peter Baranec.
        </h1>

        <h2
          data-animate
          className='text-[clamp(2.25rem,6vw,4.5rem)] font-bold -mt-2'>
          I build things for the web.
        </h2>

        <p
          data-animate
          className='max-w-xl text-muted mx-auto lg:mx-0 mt-4 text-lg'>
          I’m a software engineer specializing in building exceptional digital
          experiences.
        </p>

        <a
          data-animate
          href='#'
          className='inline-block border border-accent text-accent px-8 py-3 rounded font-mono hover:bg-accent/10 transition-all duration-300 mt-6'>
          Get in touch!
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className='fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1'>
        <div
          ref={textRef}
          className='text-accent font-mono text-sm select-none'>
          Scroll
        </div>
        <div ref={arrowRef}>
          <RiScrollToBottomLine className='text-accent w-6 h-6' />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
