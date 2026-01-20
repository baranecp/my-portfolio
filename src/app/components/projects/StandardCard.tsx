"use client";
import { FiGithub } from "react-icons/fi";
import FolderIcon from "./FolderIcon";

interface StandardCardProps {
  title: string;
  description: string;
  href: string;
  isWip?: boolean;
  techStack?: string[];
  className?: string;
}

const cardBaseClass =
  "group relative rounded-3xl overflow-hidden bg-[#112240] border border-white/5 transition-transform duration-300 hover:-translate-y-2 will-change-transform";
const shadowLayerClass =
  "absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out shadow-[0_20px_40px_-15px_rgba(100,255,218,0.3)] rounded-3xl";

export default function StandardCard({
  title,
  description,
  href,
  isWip = false,
  techStack,
  className = "md:col-span-4 h-[350px]",
}: StandardCardProps) {
  const iconBg = isWip
    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
    : "bg-accent/10 text-accent transition-colors duration-300 md:group-hover:bg-accent md:group-hover:text-black";

  const githubHoverColor = isWip ? "md:group-hover:text-orange-400" : "";

  return (
    <div data-animate className={`${className} ${cardBaseClass}`}>
      <div className={shadowLayerClass} />
      <a
        href={href}
        target='_blank'
        className='block h-full w-full relative z-20'>
        {isWip && (
          <div
            className={`absolute top-6 right-6 text-slate/50 ${githubHoverColor} transition-colors duration-300`}>
            <FiGithub size={24} />
          </div>
        )}

        <div className='p-8 h-full flex flex-col justify-center items-center text-center space-y-4'>
          <div className='relative'>
            <div
              className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-colors duration-300 ${iconBg}`}>
              <FolderIcon size={30} />
            </div>

            {isWip && (
              <div className='absolute -top-3 -right-3 bg-orange-500 text-[#0a192f] text-[10px] font-bold px-2 py-1 rounded-full border border-[#0a192f] shadow-sm whitespace-nowrap'>
                In Progress
              </div>
            )}
          </div>

          <h4 className='text-lg md:text-xl font-bold text-white'>{title}</h4>
          <p className='text-slate text-sm'>{description}</p>

          {techStack && (
            <div className='flex gap-2 justify-center pt-2'>
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className='text-[10px] font-mono text-slate/50'>
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </a>
    </div>
  );
}
