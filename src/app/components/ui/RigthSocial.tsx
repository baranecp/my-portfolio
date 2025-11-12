export default function RightSocial() {
  return (
    <div className='hidden xl:flex fixed bottom-0 right-12 flex-col items-center'>
      <div className='flex flex-col items-center gap-4'>
        <a
          href='mailto:youremail@example.com'
          className='text-mute hover:text-[#a1ffe4] font-mono text-[13px] [writing-mode:vertical-rl] tracking-widest'>
          baranec.dev@gmail.com
        </a>
        <div className='w-px h-24 bg-[#8892b0]'></div>
      </div>
    </div>
  );
}
