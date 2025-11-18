"use client";

import { useRef } from "react";
import gsap from "gsap";

const firstPart = "Peter";
const secondPart = "Baranec";
const typingSpeed = 0.08;
const pauseTime = 0.3;

export default function Logo() {
  const logoRef = useRef<HTMLDivElement | null>(null);
  const isAnimatingRef = useRef(false);

  const animateLogo = () => {
    const el = logoRef.current;
    if (!el || isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        el.textContent = "{PB}";
        gsap.set(el, { scale: 1, opacity: 1 });
      },
    });

    // Typing first part: smooth increment
    tl.to(
      {},
      {
        duration: firstPart.length * typingSpeed,
        onUpdate() {
          const progress = this.progress() * firstPart.length;
          const i = Math.floor(progress);
          el.textContent = `{${firstPart.slice(0, i + 1)}B}`;
          // subtle scaling based on progress
          gsap.to(el, {
            scale: 1 + progress * 0.01,
            duration: 0.1,
            ease: "power1.out",
          });
        },
        ease: "power1.out",
      }
    );

    // Typing second part
    tl.to(
      {},
      {
        duration: secondPart.length * typingSpeed,
        onUpdate() {
          const progress = this.progress() * secondPart.length;
          const i = Math.floor(progress);
          el.textContent = `{${firstPart}${secondPart.slice(0, i + 1)}}`;
          gsap.to(el, {
            scale: 1.05 + progress * 0.002,
            duration: 0.1,
            ease: "power1.out",
          });
        },
        ease: "power1.out",
      }
    );

    // Pause
    tl.to({}, { duration: pauseTime });

    // Backward typing
    tl.to(
      {},
      {
        duration: (secondPart.length + firstPart.length) * typingSpeed,
        onUpdate() {
          const total = secondPart.length + firstPart.length;
          const progress = this.progress() * total;

          if (progress <= secondPart.length) {
            el.textContent = `{${firstPart}${secondPart.slice(
              0,
              secondPart.length - Math.floor(progress)
            )}}`;
          } else {
            const p = Math.floor(progress - secondPart.length);
            el.textContent = `{${firstPart.slice(0, firstPart.length - p)}B}`;
          }

          gsap.to(el, {
            scale: 1 + 0.05 * Math.sin(progress * Math.PI),
            duration: 0.1,
            ease: "power1.out",
          });
        },
        ease: "power1.inOut",
      }
    );
  };

  return (
    <div
      ref={logoRef}
      onMouseEnter={animateLogo}
      className='text-white text-2xl font-bold font-mono cursor-default select-none'>
      {"{PB}"}
    </div>
  );
}
