"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

export default function LoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    // 1. Lock Scroll immediately
    document.body.style.overflow = "hidden";

    // 2. PRE-HIDE ANIMATION ELEMENTS
    // We explicitly set the starting state here.
    // This ensures they are invisible BEFORE the loader disappears.
    gsap.set(".topbar", { y: -40, autoAlpha: 0 });
    gsap.set(".hero [data-animate]", { y: 30, autoAlpha: 0 });
    gsap.set([".left-social", ".right-social"], { y: 30, autoAlpha: 0 });

    // 3. Loader Ring Animation
    const ring = ringRef.current;
    const colors = ["#64ffda", "#00f7ff", "#ff64da", "#ffda64"];
    const colorTL = gsap.timeline({ repeat: -1 });

    if (ring) {
      colors.forEach((color, i) => {
        colorTL.to(
          ring,
          { stroke: color, duration: 0.5, ease: "power1.inOut" },
          i * 0.5,
        );
      });
    }

    // 4. Exit Sequence
    const timer = setTimeout(() => {
      // Stop the ring cycle
      colorTL.kill();

      // Fade out the loader screen overlay
      gsap.to("#loader-overlay", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          // A. Unmount the loader from React tree
          setLoading(false);

          // B. Unlock Scroll
          document.body.style.overflow = "";

          // C. Trigger the Page Entrance Animation
          pageReveal();
        },
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
      colorTL.kill();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {loading && (
        <div
          id='loader-overlay'
          className='fixed inset-0 bg-[#0f1930] flex items-center justify-center z-9999'>
          <svg className='w-[150px] h-[150px]' viewBox='0 0 120 120'>
            <circle
              ref={ringRef}
              cx='60'
              cy='60'
              r='55'
              fill='transparent'
              stroke='#64ffda'
              strokeWidth='4'
            />
            <text
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

      {/* Content */}
      <div className='relative z-0'>{children}</div>
    </>
  );
}

// PAGE REVEAL ANIMATIONS
function pageReveal() {
  const tl = gsap.timeline();

  // we  set them to hidden/offset in the useEffect,
  // we need to animate them TO their natural position (y: 0, alpha: 1).

  tl.to(".topbar", {
    y: 0,
    autoAlpha: 1,
    duration: 0.8,
    ease: "power3.out",
  });

  const heroElements = document.querySelectorAll(".hero [data-animate]");
  if (heroElements.length > 0) {
    tl.to(
      heroElements,
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      },
      "-=0.6",
    );
  }

  tl.to(
    [".left-social", ".right-social"],
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
    },
    "-=0.6",
  );
}
