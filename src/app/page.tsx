"use client";
import { useRef } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import LeftSocial from "./components/ui/LeftSocial";
import RightSocial from "./components/ui/RigthSocial";
import TopBar from "./components/ui/TopBar";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className='relative'>
      <TopBar />
      <LeftSocial />
      <RightSocial />
      <div ref={containerRef} className='px-12 pt-8'>
        <main>
          <Hero />
          <About />
        </main>
      </div>
    </div>
  );
}
