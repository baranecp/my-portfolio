"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { useSectionAnimation } from "@/app/hooks/useSectionAnimation";
import AboutContent from "./AboutContent";
import FeatureCard from "./FeatureCard";

const About = forwardRef<HTMLDivElement>((_props, externalRef) => {
  const internalRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(externalRef, () => internalRef.current as HTMLDivElement);
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
        <AboutContent />

        <div className='flex flex-col gap-6'>
          <FeatureCard
            number='01'
            title='The Background'
            description='Electronics technician & Army Communications Specialist. Discipline turned into code.'
          />

          <FeatureCard
            number='02'
            title='Interests'
            description='Gym, Gaming, and Anime. Always searching for inspiration in different mediums.'
          />
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";
export default About;
