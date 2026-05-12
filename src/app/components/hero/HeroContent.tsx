"use client";

import Magnetic from "../animations/Magnetic";

export default function HeroContent() {
  return (
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
        I’m focused on Linux, automation, and building reliable technical systems.
      </h2>

      <p
        data-animate
        className='max-w-xl text-[#8892b0]/80 mt-8 text-lg md:text-xl leading-relaxed'>
        I’m a self-taught developer transitioning into System Administration and DevOps.
        Currently focused on Linux, automation, scripting, backend technologies, and building practical technical skills through real-world projects.
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
  );
}
