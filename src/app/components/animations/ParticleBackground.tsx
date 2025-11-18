"use client";
import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDesktop = useRef<boolean>(false);

  // Detect desktop using matchMedia (faster + cleaner)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => (isDesktop.current = mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: width / 2, y: height / 2 };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let particles: any[] = [];
    let animationId: number;

    const setupParticles = () => {
      const count = window.innerWidth < 1024 ? 30 : 90;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        colorShift: Math.random() * 360,
      }));
    };

    setupParticles();

    const handleMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      setupParticles();
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("resize", handleResize);

    let frame = 0;

    const loop = () => {
      animationId = requestAnimationFrame(loop);

      if (!isDesktop.current) return;

      frame++;
      if (window.innerWidth < 1024 && frame % 2 !== 0) return; // throttle on mobile

      ctx.clearRect(0, 0, width, height);

      // particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          p.x -= dx * 0.015;
          p.y -= dy * 0.015;
        }

        p.colorShift += 0.4;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.colorShift}, 70%, 60%, 0.9)`;
        ctx.shadowBlur = window.innerWidth >= 1024 ? 12 : 0;
        ctx.shadowColor = ctx.fillStyle;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p = particles[i];
          const p2 = particles[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${
              (p.colorShift + p2.colorShift) / 2
            }, 75%, 60%, ${1 - d / 90})`;
            ctx.lineWidth = window.innerWidth >= 1024 ? 0.4 : 0.2;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    loop();

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='fixed inset-0 -z-10 pointer-events-none hidden md:block'
    />
  );
}
