"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SlClose } from "react-icons/sl";
import ParticleCanvas from "./animations/ParticleCanvas";

type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Menu({ isOpen, onClose }: MenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key='menu'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-50 flex items-center justify-center'>
          {/* BACKGROUND MASK */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            className='absolute inset-0 bg-black backdrop-blur-xl z-0'
          />

          {/* PARTICLES */}
          <ParticleCanvas active={isOpen} />

          {/* MENU CONTENT */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className='relative z-10 flex flex-col items-center gap-8 text-white'>
            {/* Close button */}
            <button
              onClick={onClose}
              className='absolute top-8 right-8 text-3xl hover:text-accent transition'>
              <SlClose />
            </button>

            {/* Menu links */}
            <ul className='flex flex-col text-4xl gap-6'>
              <MenuItem label='Home' onClick={onClose} />
              <MenuItem label='About' onClick={onClose} />
              <MenuItem label='Projects' onClick={onClose} />
              <MenuItem label='Contact' onClick={onClose} />
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MenuItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <li
      onClick={onClick}
      className='
        px-6 py-2 rounded-xl
        text-center
        transition-all duration-300
        hover:bg-white/10 hover:text-accent
        cursor-pointer
        select-none
      '>
      {label}
    </li>
  );
}
