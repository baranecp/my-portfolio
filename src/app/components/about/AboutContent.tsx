"use client";

export default function AboutContent() {
  return (
    <div className='space-y-8 text-[#8892b0] text-lg md:text-xl leading-relaxed'>
      <p data-animate>
        Hi! I’m <span className='text-white font-semibold'>Peter</span>, a
        developer who enjoys bridging the gap between engineering and design. My
        journey into tech started with
        <span className='text-accent'> Electrical Engineering</span> and a
        background as a communications specialist in the army.
      </p>

      <p data-animate>
        Transitioning into software development allowed me to channel my
        technical discipline into a creative outlet. Today, I focus on building
        <span className='text-accent'> high-performance interfaces</span> that
        feel fluid and alive.
      </p>

      <div
        data-animate
        className='p-6 rounded-xl border border-accent/10 bg-accent/5'>
        <p className='italic text-accent/90'>
          I’m a dynamic and curious person who loves learning new things and
          improving every day. I adapt quickly and take every challenge head-on.
        </p>
      </div>

      <div data-animate className='space-y-4 pt-4'>
        <h3 className='text-white font-bold text-2xl'>Technical Toolkit</h3>
        <ul className='grid grid-cols-2 gap-2 font-mono text-sm text-accent'>
          {[
            "React (Next.js)",
            "TypeScript",
            "GSAP & Framer",
            "Tailwind CSS",
            "PostgreSQL",
            "Drizzle",
          ].map((tech) => (
            <li key={tech} className='flex items-center gap-2'>
              <span className='text-accent/60'>▹</span> {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
