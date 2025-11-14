"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

interface MorphingMenuIconProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function MorphingMenuIcon({
  isOpen,
  toggleMenu,
}: MorphingMenuIconProps) {
  const topRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.3, ease: "power2.inOut" },
    });
    if (isOpen) {
      tl.to(topRef.current, { y: 8, rotate: 45 })
        .to(middleRef.current, { opacity: 0 }, 0)
        .to(bottomRef.current, { y: -8, rotate: -45 }, 0);
    } else {
      tl.to(topRef.current, { y: 0, rotate: 0 })
        .to(middleRef.current, { opacity: 1 }, 0)
        .to(bottomRef.current, { y: 0, rotate: 0 }, 0);
    }
  }, [isOpen]);

  return (
    <div
      onClick={toggleMenu}
      className='w-10 h-10 flex flex-col justify-center items-center cursor-pointer gap-1 group'>
      <div
        ref={topRef}
        className='w-8 h-1 bg-white rounded transition-colors duration-200 group-hover:bg-green-500'
      />
      <div
        ref={middleRef}
        className='w-8 h-1 bg-white rounded transition-colors duration-200 group-hover:bg-green-500'
      />
      <div
        ref={bottomRef}
        className='w-8 h-1 bg-white rounded transition-colors duration-200 group-hover:bg-green-500'
      />
    </div>
  );
}
