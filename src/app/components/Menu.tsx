"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const MENU_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

gsap.registerPlugin(ScrollToPlugin);

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
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("#home");

  // Optimized ScrollSpy (Throttled)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      // Throttle: only run if we haven't run recently
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        const offset = window.innerHeight / 3;

        // Find the section closest to the top offset
        for (const link of MENU_LINKS) {
          const section = document.getElementById(link.href.slice(1));
          if (section) {
            const rect = section.getBoundingClientRect();
            // If the top of the section is near the top of viewport
            if (rect.top <= offset && rect.bottom >= offset) {
              setActiveSection(link.href);
              break; // Stop looking once found
            }
          }
        }
        timeoutId = undefined!;
      }, 100); // Check every 100ms
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // GSAP Animations
  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const content = contentRef.current;

      // We create a timeline to manage the sequence easier
      const tl = gsap.timeline();

      if (isOpen) {
        // OPEN ANIMATION
        gsap.set(overlay, {
          display: "flex",
          // Use the prop passed from parent for precise start point
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
        // CLOSE ANIMATION
        // overwrite: 'auto' prevents conflicts if user toggles fast
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
        // 'invisible' helps prevent flashes before GSAP kicks in
        className='fixed inset-0 z-50 hidden justify-center items-center overflow-hidden bg-[#0f1930]'>
        <div
          ref={contentRef}
          className='relative z-10 flex flex-col gap-8 px-12 py-8 items-center text-center'>
          {MENU_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`menu-link group text-[3rem] md:text-[4rem] font-extrabold px-6 py-2 transition-colors duration-300 ${
                activeSection === link.href
                  ? "text-green-400"
                  : "text-white hover:text-green-400"
              }`}
              onClick={(e) => {
                e.preventDefault();
                onClose(); // Close menu first

                // Allow the close animation to start, then scroll
                // Or we can use a slight delay if we want the menu to close fully first
                gsap.to(window, {
                  duration: 1,
                  scrollTo: { y: link.href, offsetY: 50 }, // Added offsetY for header space
                  ease: "power2.out",
                });
                router.replace(link.href);
              }}>
              <span className='relative inline-block'>
                {link.name}
                <span className='absolute left-0 -bottom-2 w-0 h-1 bg-green-400 transition-all duration-300 group-hover:w-full'></span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
