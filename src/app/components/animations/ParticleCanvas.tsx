"use client";
import { useEffect, useRef } from "react";

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.innerWidth < 768) return;

    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const width = canvas.width;
    const height = canvas.height;

    const mouse = { x: width / 2, y: height / 2 };
    const offset = { x: 0, y: 0 };

    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      colorShift: Math.random() * 360,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    function loop() {
      ctx.clearRect(0, 0, width, height);

      offset.x += (mouse.x - width / 2 - offset.x) * 0.02;
      offset.y += (mouse.y - height / 2 - offset.y) * 0.02;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // slight attraction to mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x += dx * 0.005;
          p.y += dy * 0.005;
        }

        p.colorShift += 0.4;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.colorShift}, 70%, 60%, 0.9)`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = ctx.fillStyle;
        ctx.arc(
          p.x + offset.x * 0.05,
          p.y + offset.y * 0.05,
          p.size,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.closePath();

        // connecting lines
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
            ctx.moveTo(p.x + offset.x * 0.05, p.y + offset.y * 0.05);
            ctx.lineTo(p2.x + offset.x * 0.05, p2.y + offset.y * 0.05);
            ctx.stroke();
            ctx.closePath();
          }
        });
      });

      requestAnimationFrame(loop);
    }

    loop();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='absolute inset-0 -z-10 pointer-events-none hidden md:block'
    />
  );
}
