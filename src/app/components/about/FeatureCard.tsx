"use client";

interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
}

export default function FeatureCard({
  number,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div
      data-animate
      className='group relative p-8 rounded-2xl border border-slate/20 bg-lightNavy/50 hover:border-accent/50 transition-colors duration-300'>
      <div className='absolute top-4 right-4 text-slate/20 group-hover:text-accent/20 transition-colors duration-300 select-none'>
        <span className='text-6xl font-bold'>{number}</span>
      </div>
      <h4 className='text-white text-xl font-bold mb-2 uppercase tracking-widest'>
        {title}
      </h4>
      <p className='text-slate text-base'>{description}</p>
    </div>
  );
}
