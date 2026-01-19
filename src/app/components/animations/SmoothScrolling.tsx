"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrolling({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 0.8,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    // Sync ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Optimized Animation Loop: Use GSAP's internal ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000); // Syncs Lenis with GSAP's delta time
    };
    gsap.ticker.add(updateTicker);

    // High performance: ignore lag smoothing during scroll
    gsap.ticker.lagSmoothing(0);

    return () => {
      // 1. Kill the ticker loop
      gsap.ticker.remove(updateTicker);
      // 2. Kill all ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ScrollTrigger.clearMatchMedia();
      // 3. Destroy Lenis
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
