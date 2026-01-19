"use client";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useSectionAnimation } from "../hooks/useSectionAnimation";
import Magnetic from "./animations/Magnetic";

const Contact = forwardRef<HTMLDivElement>((_props, externalRef) => {
  // 1. Create an internal ref we control
  const internalRef = useRef<HTMLDivElement>(null);

  // 2. Sync it with the external ref safely
  useImperativeHandle(externalRef, () => internalRef.current as HTMLDivElement);

  // 3. Pass our strictly typed internal ref to the hook
  useSectionAnimation(internalRef);

  return (
    <section
      ref={internalRef}
      id='contact'
      aria-labelledby='contact-heading'
      className='min-h-screen flex flex-col items-center px-6 pt-32 relative'>
      <div className='grow flex flex-col justify-center items-center w-full'>
        <div className='flex flex-col items-center mb-10'>
          <p data-animate className='text-accent font-mono text-base mb-4'>
            03. What’s Next?
          </p>
          <h2
            id='contact-heading'
            data-animate
            className='text-5xl md:text-6xl font-bold text-white text-center'>
            Get In Touch
          </h2>
        </div>

        <div className='max-w-2xl text-center space-y-8'>
          <p
            data-animate
            className='text-[#8892b0] text-lg md:text-xl leading-relaxed'>
            I’m currently looking for new opportunities as a frontend developer.
            Whether you have a question, a project idea, or just want to say hi,
            my inbox is always open.
          </p>

          <div data-animate className='pt-6'>
            <Magnetic>
              <a
                href='mailto:baranec.dev@gmail.com'
                className='inline-block border-2 border-accent text-accent px-12 py-5 rounded font-mono text-sm hover:bg-accent/10 transition-all duration-300'>
                Say Hello
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
      <footer className='w-full py-10 flex flex-col items-center gap-4 text-center border-t border-slate/10 mt-20'>
        <p className='text-xs font-mono text-slate/60 leading-loose max-w-lg'>
          Designed & Built by <span className='text-accent'>Peter Baranec</span>
          <br />
          Built with Next.js • Tailwind CSS • GSAP 3D
        </p>
      </footer>
    </section>
  );
});

Contact.displayName = "Contact";
export default Contact;
