"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

interface HoverFancyProps {
  children: ReactNode;
  y?: number;
  scale?: number;
  rotate?: number;
  hoverColor?: string;
  shadow?: boolean;
  duration?: number;
}

export default function HoverFancy({
  children,
  y = -4,
  scale = 1.05,
  rotate = 0,
  hoverColor,
  shadow = true,
  duration = 0.35,
}: HoverFancyProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const el = ref.current;

      // Create one timeline for hover and reverse for leave
      const tl = gsap.timeline({ paused: true });

      tl.to(el, {
        y,
        scale,
        rotate,
        color: hoverColor || undefined,
        duration,
        ease: "power3.out",
      });
      if (shadow) {
        tl.to(
          el,
          {
            boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
            duration,
            ease: "power3.out",
          },
          "<" // sync with previous animation
        );
      }
      tl.to(
        el,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.25,
          ease: "power2.out",
        },
        "<0.05"
      );

      const onHover = () => tl.play();
      const onLeave = () => tl.reverse();

      el.addEventListener("mouseenter", onHover);
      el.addEventListener("mouseleave", onLeave);

      // Remove listeners manually
      return () => {
        el.removeEventListener("mouseenter", onHover);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      style={{
        display: "inline-block",
        clipPath: "inset(0% 0% 0% 0%)",
        transition: "clip-path 0.3s ease-out",
      }}>
      {children}
    </div>
  );
}
