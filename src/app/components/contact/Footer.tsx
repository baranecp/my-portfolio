"use client";

export default function Footer() {
  return (
    <footer className='w-full py-10 flex flex-col items-center gap-4 text-center mt-auto'>
      <p className='text-xs font-mono text-slate/60 leading-loose max-w-lg'>
        Coded in Visual Studio Code by yours truly. Built with Next.js •
        Tailwind CSS • GSAP, deployed with Vercel.
      </p>
    </footer>
  );
}
