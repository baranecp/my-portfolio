"use client";

import { useState } from "react";
import Logo from "../animations/Logo";
import MorphingMenuIcon from "../animations/MorphingMenuIcon";
import Menu from "../menu/Menu";

export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  // Default origin is center (50% 50%)
  const [menuOrigin, setMenuOrigin] = useState({ x: 50, y: 50 });

  const handleToggle = (e: React.MouseEvent | React.TouchEvent) => {
    // Capture the click coordinates relative to the window
    let clientX, clientY;

    if ("touches" in e) {
      // Handle touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Handle mouse event
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    // Convert to percentage (CSS requires % for clip-path technique)
    const x = (clientX / window.innerWidth) * 100;
    const y = (clientY / window.innerHeight) * 100;

    setMenuOrigin({ x, y });
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className='topbar fixed top-8 left-8 right-8 flex justify-between items-center z-70 pointer-events-none'>
        {/* Enable pointer events specifically for the interactive elements */}
        <div className='pointer-events-auto'>
          <Logo />
        </div>

        <div className='pointer-events-auto'>
          <MorphingMenuIcon
            isOpen={isOpen}
            // Pass the event object (e) to our handler
            toggleMenu={handleToggle}
          />
        </div>
      </div>

      <Menu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        // Pass the captured coordinates to the Menu
        clickPosition={menuOrigin}
      />
    </>
  );
}
