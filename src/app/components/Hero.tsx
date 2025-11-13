export default function Hero() {
  return (
    <section className='flex items-center min-h-[calc(100vh-107px)]'>
      <div className='flex flex-col gap-4'>
        <p className='hero-intro text-[#64ffda] font-mono'>Hi, my name is</p>
        <div>
          <h2 className='hero-name text-[clamp(2.5rem,8vw,5rem)] font-sans font-bold text-lightSlate leading-tight'>
            Peter Baranec.
          </h2>
          <h3 className='hero-desc text-[clamp(2.5rem,8vw,4rem)] text-slate font-sans font-bold leading-tight'>
            I build things for the web.
          </h3>
        </div>
        <p className='max-w-lg text-muted tracking-wide'>
          I’m a software engineer specializing in building (and occasionally
          designing) exceptional digital experiences. Currently, I’m focused on
          building accessible, human-centered products.
        </p>
        <a
          href=''
          className='mt-6 border rounded px-5 py-3 border-accent text-accent font-mono text-[1rem] w-max'>
          Get in touch!
        </a>
      </div>
    </section>
  );
}
