"use client";

import Magnetic from "../animations/Magnetic";

export default function ContactContent() {
  return (
    <div className='grow flex flex-col justify-center items-center w-full min-h-[60vh]'>
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
              className='inline-block border-2 border-accent text-accent px-12 py-5 rounded font-mono text-sm hover:bg-accent/10 transition-colors duration-300'>
              Say Hello
            </a>
          </Magnetic>
        </div>
      </div>
    </div>
  );
}
