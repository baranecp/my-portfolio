"use client";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useSectionAnimation } from "../hooks/useSectionAnimation";

const About = forwardRef<HTMLDivElement>((_props, externalRef) => {
  // 1. Create an internal ref we control
  const internalRef = useRef<HTMLDivElement>(null);

  // 2. Sync it with the external ref safely
  useImperativeHandle(externalRef, () => internalRef.current as HTMLDivElement);

  // 3. Pass our strictly typed internal ref to the hook
  useSectionAnimation(internalRef);

  return (
    <section
      id='about'
      ref={internalRef}
      aria-labelledby='about-heading'
      className='flex flex-col justify-center mx-auto px-6 py-32 min-h-screen max-w-7xl'>
      <div className='flex items-center gap-4 mb-16'>
        <h2
          id='about-heading'
          data-animate
          className='text-4xl md:text-5xl font-bold whitespace-nowrap'>
          <span className='text-accent font-mono'>01.</span> About Me
        </h2>
        <div data-animate className='h-px w-full max-w-md bg-slate/20'></div>
      </div>

      <div className='grid lg:grid-cols-[1.5fr_1fr] gap-16 items-start'>
        <div className='space-y-8 text-[#8892b0] text-lg md:text-xl leading-relaxed'>
          <p data-animate>
            Hi! I’m <span className='text-white font-semibold'>Peter</span>, a
            developer who enjoys bridging the gap between engineering and
            design. My journey into tech started with
            <span className='text-accent'> Electrical Engineering</span> and a
            background as a communications specialist in the army.
          </p>

          <p data-animate>
            Transitioning into software development allowed me to channel my
            technical discipline into a creative outlet. Today, I focus on
            building
            <span className='text-accent'>
              {" "}
              high-performance interfaces
            </span>{" "}
            that feel fluid and alive.
          </p>

          <div
            data-animate
            className='p-6 rounded-xl border border-accent/10 bg-accent/5 backdrop-blur-sm'>
            <p className='italic text-accent/90'>
              I’m a dynamic and curious person who loves learning new things and
              improving every day. I adapt quickly and take every challenge
              head-on.
            </p>
          </div>

          <div data-animate className='space-y-4 pt-4'>
            <h3 className='text-white font-bold text-2xl'>Technical Toolkit</h3>
            <ul className='grid grid-cols-2 gap-2 font-mono text-sm text-accent'>
              <li className='flex items-center gap-2'>▹ React (Next.js)</li>
              <li className='flex items-center gap-2'>▹ TypeScript</li>
              <li className='flex items-center gap-2'>▹ GSAP & Framer</li>
              <li className='flex items-center gap-2'>▹ Tailwind CSS</li>
              <li className='flex items-center gap-2'>▹ PostgreSQL</li>
              <li className='flex items-center gap-2'>▹ Drizzle</li>
            </ul>
          </div>
        </div>
        <div className='flex flex-col gap-6'>
          <div
            data-animate
            className='group relative p-8 rounded-2xl border border-slate/20 bg-lightNavy/50 hover:border-accent/50 transition-colors'>
            <div className='absolute top-4 right-4 text-slate/20 group-hover:text-accent/20 transition-colors'>
              <span className='text-6xl font-bold'>01</span>
            </div>
            <h4 className='text-white text-xl font-bold mb-2 uppercase tracking-widest'>
              The Background
            </h4>
            <p className='text-slate text-base'>
              Electronics technician & Army Communications Specialist.
              Discipline turned into code.
            </p>
          </div>

          <div
            data-animate
            className='group relative p-8 rounded-2xl border border-slate/20 bg-lightNavy/50 hover:border-accent/50 transition-colors'>
            <div className='absolute top-4 right-4 text-slate/20 group-hover:text-accent/20 transition-colors'>
              <span className='text-6xl font-bold'>02</span>
            </div>
            <h4 className='text-white text-xl font-bold mb-2 uppercase tracking-widest'>
              Interests
            </h4>
            <p className='text-slate text-base'>
              Gym, Gaming, and Anime. Always searching for inspiration in
              different mediums.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";
export default About;
