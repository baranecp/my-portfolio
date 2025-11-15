"use client";
import { useEffect, useRef, useState } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const mouse = { x: width / 2, y: height / 2 };

    const particleCount = window.innerWidth < 1024 ? 30 : 90;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      colorShift: Math.random() * 360,
    }));

    const handleMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouse);

    let frame = 0;
    let animationId: number;

    function loop() {
      frame++;
      if (window.innerWidth < 1024 && frame % 2 !== 0) {
        animationId = requestAnimationFrame(loop);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
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
        ctx.closePath();
      }

      // draw lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
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
            ctx.closePath();
          }
        }
      }

      animationId = requestAnimationFrame(loop);
    }

    loop();

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animationId);
    };
  }, [isDesktop]);

  return (
    <canvas
      ref={canvasRef}
      className='fixed inset-0 -z-10 pointer-events-none hidden md:block'
    />
  );
}
