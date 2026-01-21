"use client";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

const cardBaseClass =
  "group relative rounded-3xl overflow-hidden bg-[#112240] border border-white/5 transition-transform duration-300 hover:-translate-y-2 will-change-transform transform-gpu";

const shadowLayerClass =
  "absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out shadow-[0_20px_40px_-15px_rgba(100,255,218,0.3)] rounded-3xl will-change-opacity";

export default function FeaturedCard() {
  return (
    <div
      data-animate
      className={`md:col-span-8 h-[400px] lg:h-[500px] ${cardBaseClass}`}>
      <div className={shadowLayerClass} />
      <Image
        src='/finance-app-preview.png'
        alt='Finance Dashboard'
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
        priority
        className='object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out'
      />

      <div className='absolute inset-0 z-10 bg-[#0a192f]/40 group-hover:bg-[#0a192f]/20 transition-colors duration-500' />

      <div className='absolute inset-0 z-10 bg-linear-to-t from-[#0a192f] via-[#0a192f]/40 to-transparent' />

      <div className='absolute bottom-0 left-0 p-8 z-20 w-full flex justify-between items-end'>
        <div className='space-y-2'>
          <span className='text-accent font-mono text-xs px-3 py-1 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-md'>
            Featured
          </span>
          <h3 className='text-3xl font-bold text-white drop-shadow-md'>
            Finance Dashboard
          </h3>
          <p className='text-slate-200 max-w-md text-sm drop-shadow-sm font-medium'>
            Full-stack financial management with Drizzle ORM.
          </p>
        </div>

        <div className='flex gap-4'>
          <a
            href='https://finance-app-beta-henna.vercel.app/'
            target='_blank'
            className='p-4 rounded-full bg-white text-black hover:bg-accent hover:text-white transition-colors shadow-lg'>
            <FiArrowUpRight size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}
