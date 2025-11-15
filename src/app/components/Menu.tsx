"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import ParticleBackground from "./animations/ParticleBackground";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Menu({ isOpen, onClose }: MenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [origin, setOrigin] = useState({ x: 50, y: 50 }); // percent of screen

  const menuLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // Hydration-safe mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Track desktop vs mobile
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll lock
  useEffect(() => {
    if (!mounted) return;
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, mounted]);

  // Track last click position to use as origin
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setOrigin({ x, y });
    };

    if (isOpen) {
      window.addEventListener("click", handleClick, { once: true });
    }

    return () => window.removeEventListener("click", handleClick);
  }, [isOpen]);

  // GSAP portal animation
  useEffect(() => {
    if (!mounted || !overlayRef.current || !contentRef.current) return;

    const overlay = overlayRef.current;
    const content = contentRef.current;

    const tl = gsap.timeline({ paused: true });

    if (isOpen) {
      // Portal circle open from click origin
      gsap.set(overlay, {
        display: "flex",
        clipPath: `circle(0% at ${origin.x}% ${origin.y}%)`,
        opacity: 1,
      });
      gsap.set(content, { opacity: 0, y: 50 });

      tl.to(overlay, {
        clipPath: `circle(150% at ${origin.x}% ${origin.y}%)`,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        content,
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.6"
      );

      // Menu links stagger
      if (isDesktop) {
        tl.fromTo(
          content.querySelectorAll(".menu-link"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.4"
        );
      } else {
        tl.to(
          content.querySelectorAll(".menu-link"),
          { opacity: 1, y: 0, duration: 0.2 },
          "-=0.2"
        );
      }

      tl.play();
    } else {
      // Portal circle close
      const closeTl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
        },
      });
      closeTl
        .to(content, { opacity: 0, y: 30, duration: 0.3, ease: "power3.in" })
        .to(
          overlay,
          {
            clipPath: `circle(0% at ${origin.x}% ${origin.y}%)`,
            duration: 0.6,
            ease: "power2.in",
          },
          "-=0.2"
        );
      closeTl.play();
    }
  }, [isOpen, mounted, isDesktop, origin]);

  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      className='fixed inset-0 z-30 flex justify-center items-center overflow-hidden bg-[#0f1930]'>
      {/* Particles only on desktop */}
      {isDesktop && <ParticleBackground />}

      {/* Menu content */}
      <div
        ref={contentRef}
        className='relative z-10 flex flex-col gap-10 px-12 py-8 items-center text-center'>
        {menuLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className='menu-link text-white text-5xl font-light px-6 py-2 rounded-md hover:bg-white/10 hover:text-green-400 transition-all duration-300'
            onClick={onClose}>
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
