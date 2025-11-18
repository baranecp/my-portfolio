"use client";
import { forwardRef } from "react";

const Hero = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section
      id='hero'
      ref={ref}
      className='hero flex flex-col justify-center min-h-screen px-8 gap-4'>
      <p className='text-[#64ffda] font-mono'>Hi, my name is</p>
      <h1 className='text-[clamp(2.5rem,8vw,5rem)] font-bold'>
        Peter Baranec.
      </h1>
      <h2 className='text-[clamp(2rem,6vw,4rem)] font-bold text-slate'>
        I build things for the web.
      </h2>
      <p className='max-w-lg text-muted text-center'>
        I’m a software engineer specializing in building exceptional digital
        experiences. Currently, I focus on accessible, human-centered products.
      </p>
      <a
        href='#'
        className='border border-accent text-accent px-6 py-3 rounded font-mono hover:bg-accent/10 transition-all duration-300'>
        Get in touch!
      </a>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
