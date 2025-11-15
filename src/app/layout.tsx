import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import FlashlightWrapper from "./components/animations/FlashlightWrapper";
import ParticleBackground from "./components/animations/ParticleBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Peter Baranec — Frontend Developer",
  description:
    "Personal portfolio website built with Next.js, Tailwind, and GSAP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased scrollbar-hide`}>
        <ParticleBackground />
        <FlashlightWrapper>{children}</FlashlightWrapper>
      </body>
    </html>
  );
}
