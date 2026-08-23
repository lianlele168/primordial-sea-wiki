import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmos: {
          950: "#050713",
          900: "#090c19",
          800: "#101525",
          700: "#1c2438",
          600: "#303b55",
        },
        tide: {
          500: "#36c7c2",
          400: "#62ded8",
          300: "#9af0e9",
        },
        solar: {
          500: "#efbd4e",
          400: "#f6cf72",
        },
        flare: {
          500: "#f45f70",
          400: "#ff8190",
        },
      },
      fontFamily: {
        sans: ["var(--font-space)", "sans-serif"],
        display: ["var(--font-cormorant)", "serif"],
      },
      boxShadow: {
        tide: "0 18px 55px rgba(54, 199, 194, 0.14)",
        solar: "0 18px 55px rgba(239, 189, 78, 0.13)",
      },
    },
  },
  plugins: [],
};
export default config;
