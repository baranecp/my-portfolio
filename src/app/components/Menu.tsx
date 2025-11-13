"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";

interface MenuProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function Menu({ containerRef }: MenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoverImg, setHoverImg] = useState<string>("/img-1.jpg");
  const [prevImg, setPrevImg] = useState<string>("/img-1.jpg");

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const menuLinks = [
    { name: "Home", img: "/img-1.jpg" },
    { name: "About", img: "/img-2.jpg" },
    { name: "Projects", img: "/img-3.jpg" },
    { name: "Contact", img: "/img-4.jpg" },
  ];

  const socialLinks = [
    { name: "Github", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Discord", href: "#" },
    { name: "Twitter", href: "#" },
  ];

  const toggleMenu = () => {
    if (isAnimating) return;
    if (!isOpen) openMenu();
    else closeMenu();
  };

  // ---------------- OPEN MENU ----------------
  const openMenu = () => {
    if (!containerRef.current || !overlayRef.current || !contentRef.current)
      return;
    setIsAnimating(true);

    gsap.set(containerRef.current, { rotation: 0, x: 0, y: 0, scale: 1 });
    gsap.set(contentRef.current, { opacity: 0 });
    gsap.set(overlayRef.current, {
      display: "flex",
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    });
    gsap.set(imageRef.current, { opacity: 0, scale: 1.2, y: 80 });

    requestAnimationFrame(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        onComplete: () => {
          setIsOpen(true);
          setIsAnimating(false);
        },
      });

      tl.to(containerRef.current, {
        rotation: 10,
        x: 300,
        y: 450,
        scale: 1.5,
        duration: 1.25,
      })
        .to(
          overlayRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)",
            duration: 1.25,
          },
          0
        )
        .to(contentRef.current, { opacity: 1, duration: 1.25 }, 0)
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.2, y: 80 },
          { opacity: 1, scale: 1, y: 0, duration: 1 },
          0.5
        )
        .fromTo(
          contentRef.current!.querySelectorAll(".menu-link"),
          { y: "120%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.9, stagger: 0.1 },
          0.7
        )
        .fromTo(
          contentRef.current!.querySelectorAll(".menu-socials a"),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.05 },
          1.2
        );

      gsap.fromTo(
        "#menu-open",
        { x: 0, y: 0, opacity: 1 },
        { x: -5, y: -10, opacity: 0, duration: 0.5 }
      );
      gsap.to("#menu-close", {
        x: 0,
        y: 0,
        opacity: 1,
        delay: 0.5,
        duration: 0.5,
      });
    });
  };

  // ---------------- LEAVE MENU ----------------
  const leaveMenu = (onComplete?: () => void) => {
    if (!contentRef.current || !imageRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut", duration: 0.5 },
      onComplete,
    });

    tl.to(contentRef.current.querySelectorAll(".menu-link"), {
      y: -50,
      opacity: 0,
      stagger: 0.05,
    })
      .to(
        contentRef.current.querySelectorAll(".menu-socials a"),
        { y: -30, opacity: 0, stagger: 0.05 },
        0
      )
      .to(imageRef.current, { opacity: 0, scale: 1.1, y: -50 }, 0);
  };

  // ---------------- CLOSE MENU ----------------
  const closeMenu = (skipLeave = false) => {
    if (!containerRef.current || !overlayRef.current || !contentRef.current)
      return;

    const finalizeClose = () => {
      gsap.to(containerRef.current, {
        rotation: 0,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.25,
      });
      gsap.to(overlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.25,
        onComplete: () => {
          setIsOpen(false);
          setHoverImg("/img-1.jpg");
          gsap.set(overlayRef.current, {
            display: "none",
            pointerEvents: "none",
          });
          setIsAnimating(false);
        },
      });

      gsap.fromTo(
        "#menu-close",
        { x: 0, y: 0, opacity: 1 },
        { x: 5, y: 10, opacity: 0, duration: 0.5 }
      );
      gsap.to("#menu-open", {
        x: 0,
        y: 0,
        opacity: 1,
        delay: 0.5,
        duration: 0.5,
      });
    };

    setIsAnimating(true);
    if (!skipLeave) {
      leaveMenu();
      finalizeClose();
    } else {
      finalizeClose();
    }
  };

  // ---------------- IMAGE CROSSFADE ----------------
  const handleMouseEnter = (img: string) => {
    if (!isOpen || isAnimating || hoverImg === img) return;

    setPrevImg(hoverImg);
    setHoverImg(img);

    if (!imageRef.current) return;

    const newImg = imageRef.current.querySelector(".hover-img");
    if (newImg)
      gsap.fromTo(
        newImg,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
  };

  // ---------------- SCROLL TO ----------------
  const handleScrollTo = (targetId: string) => {
    const section = document.getElementById(targetId);
    const lenis = lenisRef.current;
    if (!section || !lenis) return;

    leaveMenu(() => {
      lenis.scrollTo(section, { offset: 0, duration: 1.2 });
      closeMenu(true);
    });
  };

  return (
    <>
      {/* Menu Toggle */}
      <div className='fixed top-8 right-12 z-30 flex gap-4 text-white font-bold text-lg cursor-pointer'>
        <span
          id='menu-open'
          className={`${isOpen ? "hidden" : ""}`}
          onClick={toggleMenu}>
          Menu
        </span>
        <span
          id='menu-close'
          className={`${!isOpen ? "hidden" : ""}`}
          onClick={toggleMenu}>
          Close
        </span>
      </div>

      {/* Menu Overlay */}
      <div
        ref={overlayRef}
        className='fixed inset-0 bg-lightNavy z-20 hidden flex-col xl:flex-row justify-center items-center overflow-hidden'>
        <div
          ref={contentRef}
          className='relative w-full h-full flex flex-col xl:flex-row justify-center items-center opacity-0 pointer-events-auto'>
          {/* IMAGE CROSSFADE */}
          <div
            ref={imageRef}
            className='hidden xl:flex relative w-[25%] h-[80%] overflow-hidden'>
            <Image
              key={prevImg}
              src={prevImg}
              alt=''
              fill
              className='absolute inset-0 object-cover'
            />
            <Image
              key={hoverImg}
              src={hoverImg}
              alt=''
              fill
              className='absolute inset-0 object-cover opacity-0 hover-img'
            />
          </div>

          {/* Menu Links */}
          <div className='flex flex-col gap-10 px-56 py-8 text-right'>
            <div className='menu-links flex flex-col gap-8'>
              {menuLinks.map((link) => (
                <Link
                  key={link.name}
                  href={`#${link.name.toLowerCase()}`}
                  scroll={false}
                  className='menu-link text-white text-7xl font-light relative overflow-hidden
                     after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5
                     after:bg-white after:scale-x-0 after:origin-right after:transition-transform
                     after:duration-300 after:ease-in-out hover:after:origin-left hover:after:scale-x-100'
                  onMouseEnter={() => handleMouseEnter(link.img)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(link.name.toLowerCase());
                  }}>
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Socials */}
            <div className='menu-socials flex flex-col gap-2 text-right z-30'>
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className='text-muted hover:text-white'>
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
