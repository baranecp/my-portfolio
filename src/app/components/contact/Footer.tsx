"use client";

export default function Footer() {
  return (
    <footer className='w-full py-10 flex flex-col items-center gap-4 text-center border-t border-slate/10 mt-auto'>
      <p className='text-xs font-mono text-slate/60 leading-loose max-w-lg'>
        Designed & Built by <span className='text-accent'>Peter Baranec</span>
        <br />
        Built with Next.js • Tailwind CSS • GSAP 3D
      </p>
    </footer>
  );
}
