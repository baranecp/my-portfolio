import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a192f",
        accent: "#64ffda",
        lightNavy: "#112240",
        lightSlate: "#ccd6f6",
        slate: "#8892b0",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      boxShadow: {
        glow: "0 0 10px rgba(100, 255, 218, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
