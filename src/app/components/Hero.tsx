"use client";
import { forwardRef } from "react";

export const Hero = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <section
      ref={ref}
      className='hero flex flex-col justify-center min-h-screen px-8 gap-2 lg:gap-4 text-center lg:text-left'>
      <p className='text-[#64ffda] font-mono text-lg'>Hi, my name is</p>

      <h1 className='text-[clamp(3rem,8vw,6rem)] font-bold leading-tight'>
        Peter Baranec.
      </h1>

      <h2 className='text-[clamp(2.25rem,6vw,4.5rem)] font-bold text-slate -mt-2'>
        I build things for the web.
      </h2>

      <p className='max-w-xl text-muted mx-auto lg:mx-0 mt-4 text-lg'>
        I’m a software engineer specializing in building exceptional digital
        experiences. Currently, I focus on accessible, human-centered products.
      </p>

      <a
        href='#'
        className='inline-block border border-accent text-accent px-8 py-3 rounded font-mono hover:bg-accent/10 transition-all duration-300 mt-6'>
        Get in touch!
      </a>
    </section>
  );
});

Hero.displayName = "Hero";
