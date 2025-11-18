"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ParticleBackground from "./animations/ParticleBackground";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Menu({ isOpen, onClose }: MenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

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
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, mounted]);

  // Track last click position
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      setOrigin({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    if (isOpen) window.addEventListener("click", handleClick, { once: true });
    return () => window.removeEventListener("click", handleClick);
  }, [isOpen]);

  // GSAP animations
  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const content = contentRef.current;
      const particles = particlesRef.current;
      if (!overlay || !content) return;

      const tl = gsap.timeline({ paused: true });

      if (isOpen) {
        // Open menu
        gsap.set(overlay, {
          display: "flex",
          clipPath: `circle(0% at ${origin.x}% ${origin.y}%)`,
          opacity: 1,
        });
        gsap.set(content, { opacity: 0, y: 50 });
        if (particles) gsap.set(particles, { opacity: 0 });

        tl.to(overlay, {
          clipPath: `circle(150% at ${origin.x}% ${origin.y}%)`,
          duration: 0.8,
          ease: "power2.out",
        }).to(
          content,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.6"
        );

        if (particles) {
          tl.to(
            particles,
            { opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.8"
          );
        }

        const links = content.querySelectorAll(".menu-link");
        if (isDesktop) {
          tl.fromTo(
            links,
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
          tl.to(links, { opacity: 1, y: 0, duration: 0.2 }, "-=0.2");
        }

        tl.play();
      } else {
        // Close menu
        const closeTl = gsap.timeline({
          onComplete: () => {
            // Hide overlay only after animation finishes
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
        if (particles) {
          closeTl.to(particles, { opacity: 0, duration: 0.4 }, "-=0.6");
        }
        closeTl.play();
      }
    },
    { scope: overlayRef, dependencies: [isOpen, origin, isDesktop, mounted] }
  );

  // Hide overlay initially to prevent flash
  if (!mounted) return <div style={{ display: "none" }} />;

  return (
    <div
      ref={overlayRef}
      className='fixed inset-0 z-30 flex justify-center items-center overflow-hidden bg-[#0f1930]'>
      {isDesktop && (
        <div ref={particlesRef}>
          <ParticleBackground />
        </div>
      )}

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
