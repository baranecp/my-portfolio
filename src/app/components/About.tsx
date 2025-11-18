"use client";
import { forwardRef } from "react";
import Image from "next/image";

const About = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section
      id='about'
      ref={ref}
      className='about flex flex-col lg:flex-row items-center justify-center min-h-screen px-8 py-20 gap-8'>
      <div className='flex flex-col gap-6 max-w-2xl'>
        <div className='flex items-center gap-4 text-3xl'>
          <h2 className='font-sans'>
            <span className='text-accent'>#</span> About Me
          </h2>
          <div className='h-px w-70 bg-[#8892b0]'></div>
        </div>
        <p>
          Hi! I’m Peter, a self-taught frontend developer passionate about
          crafting clean, responsive, and visually engaging web experiences. I
          work mainly with <span className='text-accent'>React</span>,
          <span className='text-accent'>Next</span>, and
          <span className='text-accent'>Tailwind</span> CSS, and I’m currently
          diving deep into animations with
          <span className='text-accent'>GSAP</span>.
        </p>
        <p>
          My path to coding wasn’t typical — I studied
          <span className='text-accent'> electrical engineering</span>, worked
          as an electronics technician and later served in the army as a
          communication specialist. After leaving the army for health reasons, I
          decided to give programming a real chance — and it quickly became my
          passion.
        </p>
        <p>
          I’m a <span className='text-accent'>dynamic and curious person </span>
          who loves learning new things and improving every day. I adapt quickly
          and take every challenge head-on.
        </p>
        <p>
          When I’m not coding, you’ll find me{" "}
          <span className='text-accent'>
            training at the gym, playing games
          </span>
          , or <span className='text-accent'>watching anime</span> — things that
          keep me inspired and balanced.
        </p>
      </div>

      <Image
        src='retro-computer.svg'
        width={400}
        height={400}
        alt='about me'
        className='hidden lg:block'
      />
    </section>
  );
});

About.displayName = "About";
export default About;
