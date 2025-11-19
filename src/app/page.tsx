"use client";
import { useRef } from "react";

import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import TopBar from "./components/ui/TopBar";
import LeftSocial from "./components/ui/LeftSocial";
import RightSocial from "./components/ui/RightSocial";
import Contact from "./components/Contact";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  return (
    <div className='relative'>
      <TopBar />
      <LeftSocial />
      <RightSocial />

      <Hero ref={heroRef} />
      <About ref={aboutRef} />
      <Projects ref={projectsRef} />
      <Contact ref={contactRef} />
    </div>
  );
}
