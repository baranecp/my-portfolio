"use client";

import { forwardRef } from "react";
import { useSectionAnimation } from "../hooks/useSectionAnimation";

const Contact = forwardRef<HTMLDivElement>((_props, ref) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSectionAnimation(ref as any);

  return (
    <section
      ref={ref}
      id='contact'
      className='min-h-screen flex flex-col justify-center items-center px-8 text-center gap-6 relative'>
      <div className='flex items-center gap-4 text-4xl mb-10'>
        <h2 data-animate className='font-sans'>
          <span className='text-accent'>#</span> What&apos;s Next
        </h2>
        <div data-animate className='h-px w-70 bg-[#8892b0]'></div>
      </div>

      {/* Intro text */}
      <p data-animate className='max-w-xl text-muted text-lg mb-6'>
        I’m currently looking for opportunities as a frontend developer —
        whether it’s a full-time role, a part-time gig, or an internship. If you
        have an interesting project or position, I’d love to hear from you! My
        inbox is always open and I usually respond within 24 hours. Let’s build
        something amazing together!
      </p>

      {/* Contact button */}
      <a
        data-animate
        href='mailto:youremail@example.com'
        className='inline-block max-w-xs w-full border border-accent text-accent px-8 py-3 rounded font-mono hover:bg-accent/10 transition-all duration-300'>
        Get in Touch
      </a>

      {/* Footer */}
      <footer className='absolute bottom-4 w-full text-center lg:text-left px-8 lg:px-24  py-4 rounded-t-lg'>
        <p className='text-sm text-muted opacity-80'>
          Coded in{" "}
          <span className='text-accent font-semibold'>Visual Studio Code</span>{" "}
          by yours truly. Built with{" "}
          <span className='text-accent font-semibold'>Next.js</span> and{" "}
          <span className='text-accent font-semibold'>Tailwind CSS</span>,
          animated with <span className='text-accent font-semibold'>GSAP</span>,
          deployed with{" "}
          <span className='text-accent font-semibold'>Vercel</span>.
        </p>
      </footer>
    </section>
  );
});

Contact.displayName = "Contact";
export default Contact;
