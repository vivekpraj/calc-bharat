import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Rich deep indigo — trustworthy, premium, not generic Tailwind blue
        brand: {
          50:  "#EEEFFE",
          100: "#DBDEfd",
          200: "#BABCFB",
          300: "#9295F8",
          400: "#6B6FF5",
          500: "#5054EF",
          600: "#3D40DC",   // main buttons, links
          700: "#3032BB",
          800: "#252799",
          900: "#1A1C78",
        },
        // Accent: Saffron-orange — for CTAs, badges, highlights
        accent: {
          50:  "#FFF4EE",
          100: "#FFE5D0",
          200: "#FFC9A0",
          300: "#FFAC70",
          400: "#FF8F40",
          500: "#FF7420",   // main accent
          600: "#E85C00",   // hover
          700: "#C24D00",
          800: "#9C3E00",
          900: "#762F00",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0,0,0,0.06), 0 4px 16px -2px rgba(61,64,220,0.08)",
        "card-hover": "0 4px 8px 0 rgba(0,0,0,0.08), 0 12px 32px -4px rgba(61,64,220,0.14)",
        nav: "0 1px 0 0 #E5E7EB, 0 2px 12px -2px rgba(0,0,0,0.06)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #1A1C78 0%, #3D40DC 50%, #6B6FF5 100%)",
        "card-shimmer": "linear-gradient(135deg, #EEEFFE 0%, #fff 50%, #EEEFFE 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
