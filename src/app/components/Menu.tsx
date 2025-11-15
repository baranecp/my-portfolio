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

  const menuLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // Only render menu on client to prevent SSR flash
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Lock scroll while menu is open
  useEffect(() => {
    if (!mounted || !overlayRef.current || !contentRef.current) return;
    const overlay = overlayRef.current;
    const content = contentRef.current;

    const isDesktop = window.innerWidth >= 1024;

    if (isOpen) {
      gsap.set(overlay, { display: "flex", opacity: 0 });
      gsap.set(content, { opacity: 0, y: 50 });

      const tl = gsap.timeline();
      tl.to(overlay, {
        opacity: 1,
        duration: isDesktop ? 0.4 : 0.2,
        ease: "power1.out",
      }).to(
        content,
        {
          opacity: 1,
          y: 0,
          duration: isDesktop ? 0.6 : 0.2,
          ease: "power3.out",
        },
        "-=0.3"
      );

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
        // Mobile: fade in all links at once
        tl.to(
          content.querySelectorAll(".menu-link"),
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power3.out",
          },
          "-=0.2"
        );
      }
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
        },
      });
      tl.to(content, {
        opacity: 0,
        y: 30,
        duration: isDesktop ? 0.4 : 0.2,
        ease: "power3.in",
      }).to(
        overlay,
        { opacity: 0, duration: isDesktop ? 0.4 : 0.2, ease: "power1.in" },
        "-=0.3"
      );
    }
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!mounted || !overlayRef.current || !contentRef.current) return;
    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (isOpen) {
      gsap.set(overlay, { display: "flex", opacity: 0 });
      gsap.set(content, { opacity: 0, y: 50 });

      const tl = gsap.timeline();
      tl.to(overlay, { opacity: 1, duration: 0.4, ease: "power1.out" })
        .to(
          content,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
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
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
        },
      });
      tl.to(content, {
        opacity: 0,
        y: 30,
        duration: 0.4,
        ease: "power3.in",
      }).to(overlay, { opacity: 0, duration: 0.4, ease: "power1.in" }, "-=0.3");
    }
  }, [isOpen, mounted]);

  if (!mounted) return null; // Don't render on server

  return (
    <div
      ref={overlayRef}
      className='fixed inset-0 z-30 flex flex-col justify-center items-center overflow-hidden bg-[#0f1930]'>
      <ParticleBackground />
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
