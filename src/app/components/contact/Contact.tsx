"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { useSectionAnimation } from "@/app/hooks/useSectionAnimation";
import ContactContent from "./ContactContent";
import Footer from "./Footer";

const Contact = forwardRef<HTMLDivElement>((_props, externalRef) => {
  // 1. Create internal ref
  const internalRef = useRef<HTMLDivElement>(null);

  // 2. Sync with parent
  useImperativeHandle(externalRef, () => internalRef.current as HTMLDivElement);

  // 3. Trigger Animation Hook
  useSectionAnimation(internalRef);

  return (
    <section
      ref={internalRef}
      id='contact'
      aria-labelledby='contact-heading'
      className='min-h-screen flex flex-col items-center px-6 pt-32 relative'>
      <ContactContent />
      <Footer />
    </section>
  );
});

Contact.displayName = "Contact";
export default Contact;
