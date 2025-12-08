"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Menu({ isOpen, onClose }: MenuProps) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [activeSection, setActiveSection] = useState("#home");

  const menuLinks = useMemo(
    () => [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Projects", href: "#projects" },
      { name: "Contact", href: "#contact" },
    ],
    []
  );

  // Track click origin for animation
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

  // ScrollSpy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = menuLinks.map((l) =>
        document.getElementById(l.href.slice(1))
      );
      const offset = window.innerHeight / 3;
      let current = "#home";

      sections.forEach((sec, i) => {
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        if (rect.top - offset <= 0) current = menuLinks[i].href;
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuLinks]);

  // GSAP animations for menu open/close
  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const content = contentRef.current;
      if (!overlay || !content) return;

      const links = content.querySelectorAll(".menu-link");
      const tl = gsap.timeline({ paused: true });

      if (isOpen) {
        gsap.set(overlay, {
          display: "flex",
          clipPath: `circle(0% at ${origin.x}% ${origin.y}%)`,
          opacity: 1,
        });
        gsap.set(content, { opacity: 0 });

        tl.to(overlay, {
          clipPath: `circle(150% at ${origin.x}% ${origin.y}%)`,
          duration: 0.8,
          ease: "power2.out",
        })
          .to(content, { opacity: 1, duration: 0.6 }, "-=0.6")
          .fromTo(
            links,
            { opacity: 0, y: 50, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.1,
              duration: 0.5,
              ease: "power3.out",
            },
            "-=0.4"
          );

        tl.play();
      } else {
        const closeTl = gsap.timeline({
          onComplete: () => {
            gsap.set(overlay, { display: "none" });
          },
        });
        closeTl
          .to(links, { opacity: 0, y: 30, scale: 0.95, duration: 0.3 }, 0)
          .to(
            overlay,
            {
              clipPath: `circle(0% at ${origin.x}% ${origin.y}%)`,
              duration: 0.6,
              ease: "power2.in",
            },
            "-=0.2"
          )
          .play();
      }
    },
    { scope: overlayRef, dependencies: [isOpen, origin] }
  );

  return (
    <div
      ref={overlayRef}
      className='fixed inset-0 z-60 flex justify-center items-center overflow-hidden bg-[#0f1930]'>
      <div
        ref={contentRef}
        className='relative z-10 flex flex-col gap-12 px-12 py-8 items-center text-center'>
        {menuLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`menu-link group text-[4rem] font-extrabold px-6 py-4 transition-all duration-300 transform ${
              activeSection === link.href
                ? "text-green-400"
                : "text-white hover:text-green-400"
            }`}
            onClick={(e) => {
              e.preventDefault();

              gsap.to(window, {
                duration: 1,
                scrollTo: link.href,
                ease: "power2.out",
              });

              router.replace(link.href);

              onClose();
            }}>
            <span className='relative inline-block'>
              {link.name}
              <span className='absolute left-0 -bottom-2 w-0 h-1 bg-green-400 transition-all duration-300 group-hover:w-full'></span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
