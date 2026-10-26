import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",
        ink: "#0B1E36",
        accent: "#E85D3B",
        navy: {
          DEFAULT: "#0B1E36",
          dark: "#071322",
          light: "#132E50",
          surface: "#0E2442",
        },
        brandOrange: {
          DEFAULT: "#E85D3B",
          hover: "#D44E2D",
          light: "#FFF1ED",
          pill: "#EE603D",
        },
        brandSlate: {
          DEFAULT: "#8CA3C7",
          light: "#A8BEDA",
          subtle: "#E2E8F0",
        },
        mist: "#E8EDF5",
        mint: "#BFEBD9",
        peach: "#FFD6C2",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
        signature: ["var(--font-signature)", "cursive", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
