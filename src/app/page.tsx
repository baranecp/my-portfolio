"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "./components/Hero";
import About from "./components/About";
import LeftSocial from "./components/ui/LeftSocial";
import RightSocial from "./components/ui/RigthSocial";
import TopBar from "./components/ui/TopBar";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !aboutRef.current) return;

    const hero = heroRef.current;
    const about = aboutRef.current;

    // HERO ANIMATION (stagger text + button)
    const heroElements = hero.querySelectorAll("p, h1, h2, a");

    gsap.fromTo(
      heroElements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: hero,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Hero fades out as scrolling into About
    gsap.to(hero, {
      opacity: 0,
      y: -50,
      ease: "power1.out",
      scrollTrigger: {
        trigger: about,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    // ABOUT ANIMATION (fade in + stagger)
    const aboutElements = about.querySelectorAll("h2, p, div > p, div > div");

    gsap.fromTo(
      about,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: about,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      aboutElements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: about,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className='relative'>
      <TopBar />
      <LeftSocial />
      <RightSocial />
      <div ref={containerRef} className='px-12 pt-8'>
        <main>
          <Hero ref={heroRef} />
          <About ref={aboutRef} />
        </main>
      </div>
    </div>
  );
}
