"use client";
import Link from "./ui/Link";

export default function Navbar() {
  return (
    <nav className='flex justify-between py-4'>
      <h1 className='text-4xl font-mono text-accent cursor-pointer'>{`{PB}`}</h1>
      <ul className='flex justify-around gap-5 text-[0.9rem] font-sans items-center'>
        <Link name='About' href='about' />
        <Link name='Projects' href='projects' />
        <Link name='Contact' href='contact' />
        <a
          href=''
          className='border rounded px-4 py-2.5 border-accent text-accent font-sans text-[0.8rem]'>
          Resume
        </a>
      </ul>
    </nav>
  );
}
