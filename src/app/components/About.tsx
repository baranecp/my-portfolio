import Image from "next/image";

export default function About() {
  return (
    <section className='flex items-center justify-center'>
      <div className='flex flex-col gap-8'>
        <div className='flex items-center gap-4 text-3xl'>
          <h2 className='font-sans'>
            <span className='text-accent'>#</span> About Me
          </h2>
          <div className='h-px w-70 bg-[#8892b0]'></div>
        </div>

        <div className='flex flex-col gap-4 max-w-2xl font-sans text-muted tracking-wide'>
          <p>
            Hi! I’m Peter, a self-taught frontend developer passionate about
            crafting clean, responsive, and visually engaging web experiences. I
            work mainly with <span className='text-accent'>React</span>,{" "}
            <span className='text-accent'>Next</span>, and{" "}
            <span className='text-accent'>Tailwind</span> CSS, and I’m currently
            diving deep into animations with{" "}
            <span className='text-accent'>GSAP</span> to make interfaces feel
            alive.
          </p>
          <p>
            My path to coding wasn’t typical — I studied electrical engineering,
            worked as an electronics technician and later served in the army as
            a radio operator/signaller. After leaving the army for health
            reasons, I decided to give programming a real chance — and it
            quickly became my passion.
          </p>
          <p>
            I’m a dynamic and curious person who loves learning new things and
            improving every day. I might seem quiet at first, but I adapt
            quickly and take every challenge head-on.
          </p>
          <p>
            When I’m not coding, you’ll find me training at the gym, playing
            games, or watching anime — things that keep me inspired and
            balanced.
          </p>
        </div>
      </div>
      <Image
        src='retro-computer.svg'
        width={400}
        height={400}
        alt='about me'
        className='hidden lg:block'
      />
    </section>
  );
}
