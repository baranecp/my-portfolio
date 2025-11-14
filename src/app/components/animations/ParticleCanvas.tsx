"use client";

import { useEffect, useRef } from "react";

export default function ParticleCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return; // only run when menu is open

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      colorShift: Math.random() * 360,
    }));

    const mouse = { x: -9999, y: -9999 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          p.x -= dx * 0.03;
          p.y -= dy * 0.03;
        }

        p.colorShift += 0.6;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.colorShift}, 70%, 60%, 0.9)`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = ctx.fillStyle;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        particles.forEach((p2) => {
          const dx2 = p2.x - p.x;
          const dy2 = p2.y - p.y;
          const d = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (d < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${
              (p.colorShift + p2.colorShift) / 2
            }, 75%, 60%, ${1 - d / 90})`;
            ctx.lineWidth = 0.4;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className='absolute inset-0 pointer-events-none z-0'
    />
  );
}
