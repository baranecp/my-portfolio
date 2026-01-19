"use client";
import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function FlashlightWrapper({
  children,
  radius = 600,
}: {
  children: ReactNode;
  radius?: number;
}) {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1300px)", () => {
      const el = spotlightRef.current;
      if (!el) return;

      const setX = gsap.quickSetter(el, "x", "px");
      const setY = gsap.quickSetter(el, "y", "px");

      let rafId: number;
      const onMouseMove = (e: MouseEvent) => {
        // Prevent event flooding
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          setX(e.clientX);
          setY(e.clientY);
        });
      };

      window.addEventListener("mousemove", onMouseMove, { passive: true });
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(rafId);
      };
    });

    return () => mm.revert();
  }, [radius]);

  return (
    <div className='relative'>
      <div
        ref={spotlightRef}
        className='spotlight fixed top-0 left-0 z-50 pointer-events-none rounded-full hidden lg:block will-change-transform'
        style={{
          width: radius,
          height: radius,
          background:
            "radial-gradient(circle, rgba(29, 78, 216, 0.15) 0%, rgba(0,0,0,0) 70%)",
        }}
      />
      {children}
    </div>
  );
}
