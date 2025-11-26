"use client";
import HoverAnimate from "../animations/HoverAnimate";

export default function RightSocial() {
  return (
    <div className='right-social hidden xl:flex fixed bottom-0 right-12 flex-col items-center z-50'>
      <div className='flex flex-col items-center gap-4'>
        <HoverAnimate y={-10}>
          <a
            href='mailto:baranec.dev@gmail.com'
            className='text-mute hover:text-[#a1ffe4] font-mono text-[0.85rem] [writing-mode:vertical-rl] tracking-widest'>
            baranec.dev@gmail.com
          </a>
        </HoverAnimate>
        <div className='w-px h-24 bg-[#8892b0]'></div>
      </div>
    </div>
  );
}
