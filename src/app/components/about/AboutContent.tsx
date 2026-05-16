"use client";

export default function AboutContent() {
  return (
    <div className='space-y-8 text-[#8892b0] text-lg md:text-xl leading-relaxed'>
      <p data-animate>
        Hi! I’m <span className='text-white font-semibold'>Peter</span>, an
        aspiring IT professional currently transitioning from frontend development
        toward
        <span className='text-accent'>
          {' '}
          System Administration and Cloud Engineering
        </span>
        . I enjoy learning how systems work behind the scenes and building strong
        technical foundations in Linux, automation, and infrastructure.
      </p>

      <p data-animate>
        My journey into tech started with hands-on technical field experience
        installing satellite and internet equipment, along with experience in
        hotline/L1 support, warehouse operations, operator roles, and military
        service. Working across different environments helped me develop
        discipline, adaptability, communication skills, and the ability to learn
        quickly under pressure.
      </p>

      <p data-animate>
        Exploring different types of work helped me realize that I enjoy
        troubleshooting, working with systems, and continuously learning new
        technologies. Today, I’m focused on building practical IT skills in
        <span className='text-accent'>
          {' '}
          Linux, scripting, automation, and infrastructure.
        </span>
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
            "Python",
            "Linux"
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
