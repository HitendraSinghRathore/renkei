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
      sidebar: {
        DEFAULT: 'hsl(var(--sidebar-background))',
        foreground: 'hsl(var(--sidebar-foreground))',
        primary: 'hsl(var(--sidebar-primary))',
        'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
        accent: 'hsl(var(--sidebar-primary))',
        'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
         border: 'var(--sidebar-border)',
        ring: 'hsl(var(--sidebar-ring))',
      },
    },
  },
  plugins: [],
};