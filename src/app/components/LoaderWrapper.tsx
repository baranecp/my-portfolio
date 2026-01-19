"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function LoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const counterRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Lock Scroll
    document.body.style.overflow = "hidden";

    // Prepare Page Elements (Hide them)
    gsap.set("#home [data-animate]", { y: 40, autoAlpha: 0 });
    gsap.set(".topbar", { y: -30, autoAlpha: 0 });
    gsap.set([".left-social", ".right-social"], { y: 30, autoAlpha: 0 });

    const counter = { value: 0 };
    const el = counterRef.current;

    if (el) {
      const tl = gsap.timeline({
        onComplete: () => {
          // Exit Sequence
          gsap.to("#loader-overlay", {
            yPercent: -100, // Slide up like a curtain
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              setLoading(false);
              document.body.style.overflow = "";
              pageReveal();
            },
          });
        },
      });

      // Animate the Counter from 0 to 100
      tl.to(counter, {
        value: 100,
        duration: 1.8, // Adjusts how long the loader stays
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = Math.round(counter.value) + "%";
        },
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {loading && (
        <div
          id='loader-overlay'
          className='fixed inset-0 bg-[#0f1930] flex items-center justify-center z-9999'>
          <div className='relative'>
            <div
              ref={counterRef}
              className='font-mono font-bold text-6xl md:text-8xl text-slate opacity-80 select-none'>
              0%
            </div>
          </div>
        </div>
      )}

      <div className='relative z-0'>{children}</div>
    </>
  );
}

// ENTRANCE ANIMATION
function pageReveal() {
  const tl = gsap.timeline();

  tl.to(".topbar", {
    y: 0,
    autoAlpha: 1,
    duration: 0.8,
    ease: "power3.out",
  });

  const heroElements = document.querySelectorAll("#home [data-animate]");
  if (heroElements.length > 0) {
    tl.to(
      heroElements,
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
      },
      "-=0.6",
    );
  }

  tl.to(
    [".left-social", ".right-social"],
    { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
    "-=0.8",
  );
}
