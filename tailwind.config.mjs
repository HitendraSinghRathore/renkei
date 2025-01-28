// tailwind.config.mjs

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-dark": "var(--primary-dark)",
        accent: "var(--accent)",
        white: "var(--white)",
        "dark-gray": "var(--dark-gray)",
      },
      fontFamily: {
        serif: ["var(--font-source-serif-pro)", "serif"],
        sans: ['sans-serif']
      },
    },
  },
  plugins: [],
};