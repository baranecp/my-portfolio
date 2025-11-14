"use client";

import { useRef, useState } from "react";
import gsap from "gsap";

const firstPart = "Peter";
const secondPart = "Baranec";
const typingSpeed = 0.08;
const pauseTime = 0.3;

export default function Logo() {
  const logoRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleHover = () => {
    if (!logoRef.current || isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    // Animate P -> Peter
    tl.to(
      {},
      {
        duration: firstPart.length * typingSpeed,
        onUpdate: function () {
          const progress = Math.floor(this.progress() * firstPart.length);
          logoRef.current!.textContent = `{${firstPart.slice(
            0,
            progress + 1
          )}B}`;
        },
        ease: "none",
      }
    );

    // Animate B -> Baranec
    tl.to(
      {},
      {
        duration: secondPart.length * typingSpeed,
        onUpdate: function () {
          const progress = Math.floor(this.progress() * secondPart.length);
          logoRef.current!.textContent = `{${firstPart}${secondPart.slice(
            0,
            progress + 1
          )}}`;
        },
        ease: "none",
      }
    );

    // Pause at full text
    tl.to({}, { duration: pauseTime });

    // Animate backward B -> B
    tl.to(
      {},
      {
        duration: secondPart.length * typingSpeed,
        onUpdate: function () {
          const progress = Math.floor(this.progress() * secondPart.length);
          logoRef.current!.textContent = `{${firstPart}${secondPart.slice(
            0,
            secondPart.length - progress
          )}}`;
        },
        ease: "none",
      }
    );

    // Animate backward P -> P (keep B intact)
    tl.to(
      {},
      {
        duration: firstPart.length * typingSpeed,
        onUpdate: function () {
          const progress = Math.floor(this.progress() * firstPart.length);
          logoRef.current!.textContent = `{${firstPart.slice(
            0,
            firstPart.length - progress
          )}B}`;
        },
        ease: "none",
      }
    );
  };

  return (
    <div
      ref={logoRef}
      className='text-white text-2xl font-bold font-mono cursor-default select-none'
      onMouseEnter={handleHover}>
      {`{PB}`}
    </div>
  );
}
