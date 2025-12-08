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

  const [mounted, setMounted] = useState(false);
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

  // Hydration-safe mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Scroll lock
  useEffect(() => {
    if (!mounted || !isOpen) return;

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen, mounted]);

  // Track click origin
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

  // Track if menu is open for scroll to action button
  useEffect(() => {
    if (!mounted) return;
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [isOpen, mounted]);

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

  // GSAP animations
  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const content = contentRef.current;
      if (!overlay || !content) return;

      const tl = gsap.timeline({ paused: true });

      if (isOpen) {
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

        const links = content.querySelectorAll(".menu-link");
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

        tl.play();
      } else {
        gsap.to(content, {
          opacity: 0,
          y: 30,
          duration: 0.3,
          ease: "power3.in",
        });
        gsap.to(overlay, {
          clipPath: `circle(0% at ${origin.x}% ${origin.y}%)`,
          duration: 0.6,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(overlay, { display: "none" });
          },
        });
      }
    },
    { scope: overlayRef, dependencies: [isOpen, origin, mounted] }
  );

  if (!mounted) return <div style={{ display: "none" }} />;

  return (
    <div
      ref={overlayRef}
      className='fixed inset-0 z-60 flex justify-center items-center overflow-hidden bg-[#0f1930]'>
      <div
        ref={contentRef}
        className='relative z-10 flex flex-col gap-10 px-12 py-8 items-center text-center'>
        {menuLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={
              "menu-link text-5xl font-light px-6 py-2 rounded-md transition-all duration-300 " +
              (activeSection === link.href
                ? "text-green-400"
                : "text-white hover:bg-white/10 hover:text-green-400")
            }
            onClick={(e) => {
              e.preventDefault();

              gsap.to(window, {
                duration: 1,
                scrollTo: link.href,
                ease: "power2.out",
              });

              // Update URL hash without reloading
              router.replace(link.href);

              onClose();
            }}>
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}
