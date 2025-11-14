"use client";
import HoverAnimate from "../animations/HoverAnimate";

interface Link {
  href: string;
  name: string;
}

export default function Link({ href, name }: Link) {
  return (
    <HoverAnimate y={-3}>
      <li className='tracking-widest p-1'>
        <a href={href} className='flex gap-1'>
          <span className='text-accent'>#</span>
          {name}
        </a>
      </li>
    </HoverAnimate>
  );
}
