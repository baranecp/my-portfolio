"use client";

import Magnetic from "./Magnetic";

export default function Logo() {
  return (
    <Magnetic>
      <a
        href='#home'
        className='block text-2xl font-bold font-mono text-white hover:text-accent transition-colors duration-300 select-none z-50 relative'
        aria-label='Scroll to top'>
        {"{PB}"}
      </a>
    </Magnetic>
  );
}
