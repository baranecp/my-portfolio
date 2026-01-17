"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import MenuLink from "./MenuLink";

// Register plugins once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
}

const MENU_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  clickPosition?: { x: number; y: number };
}

export default function Menu({
  isOpen,
  onClose,
  clickPosition = { x: 50, y: 50 },
}: MenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Use our custom hook for active state
  const activeSection = useScrollSpy(MENU_LINKS);

  // Scroll Lock Logic
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      // Use a slightly longer delay to ensure animation finishes
      const timer = setTimeout(() => {
        document.body.style.paddingRight = "";
        document.body.style.overflow = "";
      }, 800);
      return () => clearTimeout(timer);
    }

    // Safety cleanup
    return () => {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // GSAP Animation (Open/Close)
  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const content = contentRef.current;
      const tl = gsap.timeline();

      if (isOpen) {
        // --- OPEN ---
        gsap.set(overlay, {
          display: "flex",
          clipPath: `circle(0% at ${clickPosition.x}% ${clickPosition.y}%)`,
          opacity: 1,
        });

        tl.to(overlay, {
          clipPath: `circle(150% at ${clickPosition.x}% ${clickPosition.y}%)`,
          duration: 0.8,
          ease: "power2.out",
        })
          .fromTo(
            content,
            { opacity: 0 },
            { opacity: 1, duration: 0.4 },
            "-=0.4",
          )
          .fromTo(
            ".menu-link",
            { opacity: 0, y: 50, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.1,
              duration: 0.5,
              ease: "power3.out",
            },
            "-=0.3",
          );
      } else {
        // --- CLOSE ---
        tl.to(".menu-link", {
          opacity: 0,
          y: 20,
          duration: 0.3,
          stagger: 0.05,
          overwrite: "auto",
        })
          .to(content, { opacity: 0, duration: 0.2 })
          .to(overlay, {
            clipPath: `circle(0% at ${clickPosition.x}% ${clickPosition.y}%)`,
            duration: 0.6,
            ease: "power2.in",
            onComplete: () => {
              gsap.set(overlay, { display: "none" });
              // Force unlock just in case
              document.body.style.overflow = "";
              document.body.style.paddingRight = "";
            },
          });
      }
    },
    { scope: containerRef, dependencies: [isOpen, clickPosition] },
  );

  return (
    <div
      ref={containerRef}
      role='dialog'
      aria-modal='true'
      aria-hidden={!isOpen}>
      <div
        ref={overlayRef}
        className='fixed inset-0 z-50 hidden justify-center items-center overflow-hidden bg-[#0f1930] touch-none'>
        <div
          ref={contentRef}
          className='relative z-10 flex flex-col gap-8 px-12 py-8 items-center text-center'>
          {MENU_LINKS.map((link) => (
            <MenuLink
              key={link.name}
              name={link.name}
              href={link.href}
              isActive={activeSection === link.href}
              onClose={onClose}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
