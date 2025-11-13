"use client";
import { VscGithubAlt } from "react-icons/vsc";
import HoverAnimate from "./HoverAnimate";

export default function LeftSocial() {
  return (
    <div className='hidden xl:flex fixed bottom-0 left-12 flex-col items-center gap-4'>
      <HoverAnimate y={-10}>
        <a
          href='https://github.com/baranecp'
          target='_blank'
          className='text-muted hover:text-accent'>
          <VscGithubAlt size={30} className='-translate-x-px' />
        </a>
      </HoverAnimate>
      <div className='w-px h-34 bg-[#8892b0]'></div>
    </div>
  );
}
