import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  "#eff6ff",
          100: "#dbeafe",
          600: "#1e40af",
          700: "#1d4ed8",
          800: "#1e3a8a",
          900: "#172554",
        },
      },
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        serif:   ["Merriweather", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
