"use client";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useSectionAnimation } from "@/app/hooks/useSectionAnimation";
import FeaturedCard from "./FeaturedCard";
import StandardCard from "./StandardCard";
import ProjectCTA from "./ProjectCTA";

const Projects = forwardRef<HTMLDivElement>((_props, externalRef) => {
  const internalRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(externalRef, () => internalRef.current as HTMLDivElement);
  useSectionAnimation(internalRef);

  return (
    <section
      ref={internalRef}
      id='projects'
      className='mx-auto px-6 py-32 min-h-screen max-w-7xl'>
      <div className='flex flex-col mb-16 space-y-2'>
        <p
          data-animate
          className='text-accent font-mono text-sm tracking-widest uppercase'>
          02. Selected Works
        </p>
        <h2 data-animate className='text-4xl md:text-6xl font-bold text-white'>
          Projects
        </h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
        <FeaturedCard />

        <StandardCard
          title='FitStack'
          description='A comprehensive fitness tracking application focused on workout analytics.'
          href='https://github.com/baranecp/fitstack'
          isWip={true}
          techStack={[
            "Next",
            "TypeScript",
            "PostgreSQL",
            "Drizzle",
            "Tailwind",
            "Better-Auth",
          ]}
          className='md:col-span-4 h-[400px] lg:h-[500px]'
        />

        <StandardCard
          title='Pokemon Game'
          description='Memory card game fetching real-time data from PokeAPI.'
          href='https://github.com/baranecp/MemoryCard'
        />

        <StandardCard
          title='Etch-a-Sketch'
          description='Browser-based drawing pad with RGB and shading modes.'
          href='https://github.com/baranecp/etch-a-sketch'
        />

        <StandardCard
          title='Modern Todo'
          description='Task management with project folders and local storage.'
          href='https://github.com/baranecp/Todo'
        />
      </div>

      <ProjectCTA />
    </section>
  );
});

Projects.displayName = "Projects";
export default Projects;
