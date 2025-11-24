"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const pbRef = useRef<SVGTextElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const page = pageRef.current;
    if (!ring || !page) return;

    // Lock scroll
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    gsap.set(page, { autoAlpha: 0 });

    // Ring color change animation
    const colors = ["#64ffda", "#00f7ff", "#ff64da", "#ffda64"];
    const colorTL = gsap.timeline({ repeat: -1 });
    colors.forEach((color, i) => {
      colorTL.to(
        ring,
        { stroke: color, duration: 0.5, ease: "power1.inOut" },
        i * 0.5
      );
    });

    // Loader duration 2s
    const loaderTimeout = gsap.delayedCall(2, () => {
      colorTL.kill();

      // Fade in page
      gsap.to(page, { autoAlpha: 1, duration: 0.6 });
      setLoading(false);

      // Unlock scroll
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);

      setTimeout(() => ScrollTrigger.refresh(), 50);
      pageReveal();
    });

    return () => {
      colorTL.kill();
      loaderTimeout.kill();
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {loading && (
        <div className='fixed inset-0 bg-[#111b38] flex items-center justify-center z-9999'>
          <svg className='w-[150px] h-[150px]' viewBox='0 0 120 120'>
            {/* Ring outline */}
            <circle
              ref={ringRef}
              cx='60'
              cy='60'
              r='55'
              fill='transparent'
              stroke='#64ffda'
              strokeWidth='4'
            />
            {/* PB text */}
            <text
              ref={pbRef}
              x='50%'
              y='50%'
              textAnchor='middle'
              dominantBaseline='middle'
              fontSize='48'
              fontWeight='bold'
              fontFamily='monospace'
              fill='#64ffda'>
              PB
            </text>
          </svg>
        </div>
      )}
      <div ref={pageRef}>{children}</div>
    </>
  );
}

// ---------------------
// PAGE REVEAL ANIMATIONS
// ---------------------
function pageReveal() {
  const tl = gsap.timeline();

  tl.from(".topbar", {
    y: -40,
    autoAlpha: 0,
    duration: 0.6,
    ease: "power2.out",
  });

  tl.from(
    ".hero [data-animate]",
    {
      y: 30,
      autoAlpha: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.08,
    },
    "-=0.3"
  );

  tl.from(
    [".left-social", ".right-social"],
    {
      y: 30,
      autoAlpha: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1,
    },
    "-=0.4"
  );
}
