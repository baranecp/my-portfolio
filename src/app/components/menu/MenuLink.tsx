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

    // Unlock Body
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";

    const targetId = href.slice(1);
    const targetSection = document.getElementById(targetId);

    // Section Re-entry Logic (Skip Home)
    if (targetSection && targetId !== "home" && window.innerWidth >= 1024) {
      const elementsToAnimate =
        targetSection.querySelectorAll("[data-animate]");
      if (elementsToAnimate.length > 0) {
        gsap.set(elementsToAnimate, { autoAlpha: 0, y: 50 });
      }
    }

    // Smooth Scroll with FORCED WAKE UP
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: href, offsetY: 0 },
      ease: "power3.inOut",
      onComplete: () => {
        ScrollTrigger.refresh();

        // If we landed on Home, forcefully reset the opacity to 1.
        if (targetId === "home") {
          const homeSection = document.getElementById("home");
          const hiddenElements =
            homeSection?.querySelectorAll("[data-animate]");

          if (hiddenElements) {
            gsap.to(hiddenElements, {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              overwrite: "auto",
            });
          }
        }
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
