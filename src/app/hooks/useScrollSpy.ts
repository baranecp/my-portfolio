"use client";
import { useState, useEffect } from "react";

export function useScrollSpy(links: { name: string; href: string }[]) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        const offset = window.innerHeight / 3;
        for (const link of links) {
          const section = document.getElementById(link.href.slice(1));
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= offset && rect.bottom >= offset) {
              setActiveSection(link.href);
              break;
            }
          }
        }
        timeoutId = undefined!;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [links]);

  return activeSection;
}
