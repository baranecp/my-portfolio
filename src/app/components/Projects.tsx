"use client";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useSectionAnimation } from "../hooks/useSectionAnimation";
import Image from "next/image";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";
import Magnetic from "./animations/Magnetic";

const Projects = forwardRef<HTMLDivElement>((_props, externalRef) => {
  // 1. Create an internal ref we control
  const internalRef = useRef<HTMLDivElement>(null);

  // 2. Sync it with the external ref safely
  useImperativeHandle(externalRef, () => internalRef.current as HTMLDivElement);

  // 3. Pass our strictly typed internal ref to the hook
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
        <div
          data-animate
          className='md:col-span-8 group relative rounded-3xl overflow-hidden bg-[#112240] border border-white/5 h-[500px]'>
          <div className='absolute inset-0 z-10 bg-linear-to-t from-[#0a192f] via-transparent to-transparent opacity-80' />
          <Image
            src='/finance-app-preview.png'
            alt='Finance Dashboard'
            fill
            className='object-cover grayscale-40 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out'
          />

          <div className='absolute bottom-0 left-0 p-8 z-20 w-full flex justify-between items-end'>
            <div className='space-y-2'>
              <span className='text-accent font-mono text-xs px-3 py-1 rounded-full bg-accent/10 border border-accent/20'>
                Featured
              </span>
              <h3 className='text-3xl font-bold text-white'>
                Finance Dashboard
              </h3>
              <p className='text-slate max-w-md text-sm'>
                A full-stack financial management tool with Drizzle ORM and
                real-time analytics.
              </p>
            </div>
            <div className='flex gap-4'>
              <a
                href='https://finance-app-beta-henna.vercel.app/'
                target='_blank'
                className='p-4 rounded-full bg-white text-black hover:bg-accent hover:text-white transition-colors'>
                <FiArrowUpRight size={24} />
              </a>
            </div>
          </div>
        </div>

        <div
          data-animate
          className='md:col-span-4 group relative rounded-3xl overflow-hidden bg-[#112240] border border-white/5 h-[500px]'>
          <Image
            src='/todo-preview.png' // Add your image to public folder
            alt='Todo App'
            fill
            className='object-cover opacity-30 group-hover:opacity-60 transition-opacity duration-500'
          />

          <div className='absolute inset-0 z-10 bg-black/40 group-hover:bg-transparent transition-colors duration-500' />

          <div className='p-8 relative z-20 h-full flex flex-col justify-between'>
            <a href='https://github.com/baranecp/Todo' target='_blank'>
              <FiGithub className='text-3xl text-slate group-hover:text-accent transition-colors' />
            </a>
            <div>
              <h4 className='text-xl font-bold text-white mb-2'>Modern Todo</h4>
              <p className='text-slate text-sm mb-4'>
                Vanilla JS architecture with persistent storage.
              </p>
              <div className='flex flex-wrap gap-2'>
                <span className='text-[10px] font-mono text-slate/60'>JS</span>
                <span className='text-[10px] font-mono text-slate/60'>
                  Webpack
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          data-animate
          className='md:col-span-4 group relative rounded-3xl overflow-hidden bg-[#112240] border border-white/5 h-[400px]'>
          <a
            href='https://github.com/baranecp/etch-a-sketch'
            target='_blank'
            className='block h-full w-full'>
            <div className='p-8 h-full flex flex-col justify-center items-center text-center space-y-4'>
              <div className='w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all'>
                <FiFolder size={32} />
              </div>
              <h4 className='text-xl font-bold text-white'>Etch-a-Sketch</h4>
              <p className='text-slate text-sm'>
                Interactive drawing tool with RGB mode.
              </p>
            </div>
          </a>
        </div>

        <div
          data-animate
          className='md:col-span-8 group relative rounded-3xl overflow-hidden bg-[#112240] border border-white/5 h-[400px]'>
          <Image
            src='/memory-preview.png' // Add your image to public folder
            alt='Memory Game'
            fill
            className='object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500'
          />

          <div className='absolute inset-0 p-8 flex items-center justify-between z-20'>
            <div className='max-w-xs'>
              <h4 className='text-2xl font-bold text-white mb-4'>
                Memory Challenge
              </h4>
              <p className='text-slate text-sm'>
                A React logic game built to master state lifting and hook
                management.
              </p>
              <div className='mt-6 flex gap-4 text-slate group-hover:text-white transition-all'>
                <a
                  href='https://github.com/baranecp/MemoryCard'
                  target='_blank'
                  className='hover:text-accent'>
                  <FiGithub size={24} />
                </a>
                <FiExternalLink
                  size={24}
                  className='opacity-30 cursor-not-allowed'
                />
              </div>
            </div>

            <div className='relative w-64 h-full hidden lg:block translate-y-12 group-hover:translate-y-6 transition-transform duration-700'>
              <div className='absolute inset-0 bg-accent/20 blur-3xl rounded-full' />
              <div className='relative bg-[#1a2a47] border border-white/10 w-full h-full rounded-t-xl' />
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center mt-24 space-y-6'>
        <h4 data-animate className='text-white font-bold text-xl'>
          Want to see more?
        </h4>
        <Magnetic>
          <a
            data-animate
            href='https://github.com/baranecp?tab=repositories'
            target='_blank'
            className='group flex items-center gap-3 border-2 border-accent text-accent px-12 py-5 rounded-full font-mono text-sm hover:bg-accent/10 transition-all duration-300'>
            Check All Repositories{" "}
            <FiGithub
              className='group-hover:rotate-12 transition-transform'
              size={18}
            />
          </a>
        </Magnetic>
      </div>
    </section>
  );
});

const FiFolder = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <path d='M4 19V5a2 2 0 0 1 2-2h4l2 2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z'></path>
  </svg>
);

Projects.displayName = "Projects";
export default Projects;
