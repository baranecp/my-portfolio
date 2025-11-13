"use client";

import { ReactNode, useRef, useEffect } from "react";
import gsap from "gsap";

interface HoverAnimateProps {
  children: ReactNode;
  y?: number;
  scale?: number;
  hoverColor?: string;
  originalColor?: string;
  duration?: number;
}

export default function HoverAnimate({
  children,
  y,
  scale,
  hoverColor,
  originalColor,
  duration = 0.3,
}: HoverAnimateProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const onHover = () => {
      gsap.to(el, {
        y,
        scale,
        color: hoverColor || undefined,
        duration,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        y: 0,
        scale: 1,
        color: originalColor || undefined,
        duration,
        ease: "power2.out",
      });
    };

    el.addEventListener("mouseenter", onHover);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onHover);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [y, scale, hoverColor, originalColor, duration]);

  return <div ref={ref}>{children}</div>;
}
