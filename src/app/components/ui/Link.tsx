"use client";
interface Link {
  href: string;
  name: string;
}

export default function Link({ href, name }: Link) {
  return (
    <li className='tracking-widest'>
      <a href={href} className='flex gap-1'>
        <span className='text-accent'>#</span>
        {name}
      </a>
    </li>
  );
}
