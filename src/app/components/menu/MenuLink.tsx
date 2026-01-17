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

    // Unlock Body Immediately
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";

    // THE "RE-ANIMATE" LOGIC
    const targetId = href.slice(1);
    const targetSection = document.getElementById(targetId);

    // If target exists, Reset its elements to hidden (y: 50, opacity: 0)
    // allowing them to "animate in" again upon arrival.
    if (targetSection) {
      const elementsToAnimate =
        targetSection.querySelectorAll("[data-animate]");
      if (elementsToAnimate.length > 0) {
        gsap.set(elementsToAnimate, { autoAlpha: 0, y: 50 });
      }
    }

    // Smooth Scroll
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: href, offsetY: 50 },
      ease: "power3.inOut",
      onComplete: () => {
        // Refresh ScrollTrigger to ensure other triggers are correct
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
