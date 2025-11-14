"use client";
import { useState } from "react";
import Logo from "../animations/Logo";
import MorphingMenuIcon from "../animations/MorphingMenuIcon";
import Menu from "../Menu";

export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className='fixed top-8 left-12 right-12 flex justify-between items-center z-30'>
        <Logo />
        <MorphingMenuIcon
          isOpen={isOpen}
          toggleMenu={() => setIsOpen((prev) => !prev)}
        />
      </div>
      <Menu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
