"use client";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface MenuLinkProps {
  name: string;
  href: string;
  isActive: boolean;
  onClose: () => void;
}

export default function MenuLink({
  name,
  href,
  isActive,
  onClose,
}: MenuLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();

    // 1. Unlock Body Immediately
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";

    const targetId = href.slice(1);
    const targetSection = document.getElementById(targetId);

    // 2. THE FIX: Only hide elements if we are on Desktop
    // We check window.innerWidth against your animation breakpoint (1024px or 1300px)
    const isDesktop = window.innerWidth >= 1024;

    if (targetSection && isDesktop) {
      const elementsToAnimate =
        targetSection.querySelectorAll("[data-animate]");
      if (elementsToAnimate.length > 0) {
        // Only reset to invisible if the scroll animation is actually active
        gsap.set(elementsToAnimate, { autoAlpha: 0, y: 50 });
      }
    }

    // 3. Smooth Scroll
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: href, offsetY: 50 },
      ease: "power3.inOut",
      onComplete: () => {
        ScrollTrigger.refresh();
        ScrollTrigger.update();
      },
    });

    router.replace(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`menu-link group text-[3rem] md:text-[4rem] font-extrabold px-6 py-2 transition-colors duration-300 ${
        isActive ? "text-green-400" : "text-white hover:text-green-400"
      }`}>
      <span className='relative inline-block'>
        {name}
        <span className='absolute left-0 -bottom-2 w-0 h-1 bg-green-400 transition-all duration-300 group-hover:w-full'></span>
      </span>
    </a>
  );
}
