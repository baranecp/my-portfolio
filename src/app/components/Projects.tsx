"use client";
import { forwardRef } from "react";
import Image from "next/image";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const Projects = forwardRef<HTMLDivElement>((_props, ref) => {
  const smallProjects = [
    {
      title: "Workout Planner",
      description:
        "A simple fitness workout planning tool where users can build routines and track muscle group volume.",
      github: "#",
    },
    {
      title: "Anime Dashboard",
      description:
        "Dashboard that lists anime, allows searching, and includes filters using public APIs.",
      github: "#",
    },
    {
      title: "Healthy Recipes",
      description:
        "Minimal UI recipe browser with nutritional stats and favorites stored in localStorage.",
      github: "#",
    },
  ];

  return (
    <section
      ref={ref}
      id='projects'
      className='mx-auto px-6 py-24 min-h-screen'>
      <div className='flex items-center gap-4 mb-12 text-4xl font-semibold'>
        <h2>
          <span className='text-accent'>#</span> Projects
        </h2>
        <div className='flex-1 h-px bg-[#8892b0]' />
      </div>

      {/* Featured Project */}
      <div className='grid md:grid-cols-2 gap-10 mb-24 items-center'>
        <div className='w-full h-full rounded-xl overflow-hidden border border-[#233554]'>
          <Image
            src='/finance-app-preview.svg'
            alt='Finance App Preview'
            width={800}
            height={400}
            className='w-full h-auto object-cover'
          />
        </div>

        <div className='space-y-5'>
          <h3 className='text-3xl font-bold text-white'>
            Featured Project — Finance App
          </h3>

          <p className='text-[#a8b2d1] leading-relaxed'>
            A full financial dashboard built with Next.js, TypeScript, Neon
            PostgreSQL, Drizzle ORM, React Query, and Tailwind. Includes
            filtering, sorting, pagination, recurring bills, theme switching,
            and responsive UI.
          </p>

          <div className='flex flex-wrap gap-2'>
            {[
              "Next.js",
              "TypeScript",
              "Tailwind",
              "PostgreSQL",
              "Drizzle",
              "React Query",
            ].map((tech) => (
              <span
                key={tech}
                className='px-3 py-1 text-sm rounded-lg bg-[#233554] text-[#a8b2d1]'>
                {tech}
              </span>
            ))}
          </div>

          <div className='flex gap-4 pt-2'>
            <a
              href='#'
              target='_blank'
              className='flex items-center gap-2 px-4 py-2 border border-accent text-accent rounded-lg hover:bg-accent hover:text-black transition'>
              <FiGithub /> GitHub
            </a>

            <a
              href='#'
              target='_blank'
              className='flex items-center gap-2 px-4 py-2 border border-accent text-accent rounded-lg hover:bg-accent hover:text-black transition'>
              <FiExternalLink /> Live Demo
            </a>
          </div>
        </div>
      </div>

      {/* Smaller Projects */}
      <h3 className='text-3xl font-bold mb-10'>Smaller Projects</h3>

      <div className='grid md:grid-cols-3 gap-8'>
        {smallProjects.map((project, i) => (
          <div
            key={i}
            className='p-6 rounded-xl bg-[#112240] border border-[#233554] hover:border-accent hover:bg-[#1a2a47] transition cursor-pointer'>
            <h4 className='text-xl font-semibold mb-3'>{project.title}</h4>

            <p className='text-[#a8b2d1] leading-relaxed mb-4'>
              {project.description}
            </p>

            <a
              href={project.github}
              target='_blank'
              className='flex items-center gap-2 text-accent hover:underline'>
              <FiGithub /> GitHub
            </a>
          </div>
        ))}
      </div>
    </section>
  );
});

Projects.displayName = "Projects";
export default Projects;
