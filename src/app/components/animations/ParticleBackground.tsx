"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  colorShift: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // --- RESTRICTION UPDATE ---
    // 1. min-width: 1024px -> Target Laptops & Desktops (ignores Tablets)
    // 2. pointer: fine     -> Target Mouse/Trackpad (ignores Touchscreens)
    const mediaQuery = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine)",
    );

    // If it's a tablet or phone, stop immediately.
    if (!mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true })!;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let animationId: number;
    let particles: Particle[] = [];
    let isRunning = true;

    const mouse = { x: -1000, y: -1000 };

    // --- CONFIG ---
    const CONNECTION_DIST_SQ = 90 * 90;
    const MOUSE_DIST = 160;
    const MOUSE_DIST_SQ = MOUSE_DIST * MOUSE_DIST;

    const initParticles = () => {
      // 90 particles looks good on large screens
      const count = 90;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          colorShift: Math.random() * 360,
        });
      }
    };

    const loop = () => {
      if (!isRunning) return;

      animationId = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < MOUSE_DIST_SQ) {
          const dist = Math.sqrt(distSq);
          if (dist > 0) {
            const force = (MOUSE_DIST - dist) / MOUSE_DIST;
            p.x -= (dx / dist) * force * 2;
            p.y -= (dy / dist) * force * 2;
          }
        }

        p.colorShift += 0.4;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.colorShift}, 70%, 60%, 0.9)`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p2.x - p.x;
          const dy2 = p2.y - p.y;
          const distSq2 = dx2 * dx2 + dy2 * dy2;

          if (distSq2 < CONNECTION_DIST_SQ) {
            ctx.beginPath();
            const opacity = 1 - Math.sqrt(distSq2) / 90;
            ctx.strokeStyle = `hsla(${
              (p.colorShift + p2.colorShift) / 2
            }, 75%, 60%, ${opacity})`;
            ctx.lineWidth = 0.4;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    const handleResize = () => {
      // If user resizes below 1024, the canvas will just hide via CSS
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    initParticles();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);
    loop();

    return () => {
      isRunning = false;
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // UPDATE: Changed 'md:block' (768px) to 'lg:block' (1024px)
      className='fixed inset-0 -z-10 pointer-events-none hidden lg:block'
    />
  );
}
