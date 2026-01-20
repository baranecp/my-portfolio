"use client";

import { useRef, forwardRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RiScrollToBottomLine } from "react-icons/ri";

const ScrollIndicator = forwardRef<HTMLDivElement>((_props, ref) => {
  const arrowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        y: 10,
        duration: 1.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  return (
    <div
      ref={ref}
      data-animate
      aria-hidden='true'
      className='absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden lg:flex pointer-events-none'>
      <div className='text-accent font-mono text-xs uppercase tracking-widest select-none'>
        Scroll
      </div>
      <div ref={arrowRef}>
        <RiScrollToBottomLine className='text-accent w-7 h-7' />
      </div>
    </div>
  );
});

ScrollIndicator.displayName = "ScrollIndicator";
export default ScrollIndicator;
