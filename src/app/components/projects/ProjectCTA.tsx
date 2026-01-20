"use client";
import { FiGithub } from "react-icons/fi";
import Magnetic from "../animations/Magnetic";

export default function ProjectCTA() {
  return (
    <div className='flex flex-col items-center justify-center mt-24 space-y-6'>
      <h4 data-animate className='text-white font-bold text-xl'>
        Want to see more?
      </h4>
      <Magnetic>
        <a
          data-animate
          href='https://github.com/baranecp?tab=repositories'
          target='_blank'
          className='group flex items-center gap-3 border-2 border-accent text-accent px-12 py-5 rounded-full font-mono text-sm hover:bg-accent/10 transition-colors duration-300'>
          Check All Repositories{" "}
          <FiGithub
            className='group-hover:rotate-12 transition-transform'
            size={18}
          />
        </a>
      </Magnetic>
    </div>
  );
}
