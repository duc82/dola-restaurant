import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dancing_script: ["Dancing Script", "cursive"],
      },
      colors: {
        "emerald-primary": "rgb(20 59 54)",
        "emerald-blur": "rgba(20,59,54,0.63)",
        "emerald-secondary": "rgb(14 40 37)",
        "yellow-primary": "rgb(214 156 82)",
        "yellow-secondary": "rgb(177 118 42)",
        "black-primary": "rgb(7 21 19)",
        warning: "rgb(133 100 4)",
      },
      boxShadow: {
        card: "4px 4px rgb(172 172 172)",
        card2: "0 3px rgb(163 123 68)",
        dropdown: "0px 6px 12px 0px rgba(0,0,0,0.18)",
        dropdown2: "0px 1px 2px 2px rgba(0,0,0,0.04)",
      },
      screens: {
        sm: "576px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1366px",
        "3xl": "1440px",
      },
      transitionTimingFunction: {
        ease: "ease",
      },
      backgroundImage: {
        rating: "url('/src/assets/images/danhgia.webp')",
        select: "url('/src/assets/images/ico-select_1.png')",
        select2: "url('/src/assets/images/ico-select_2.png')",
        filter: "url('/src/assets/images/icon-filter-bg.webp')",
        filterClose: "url('/src/assets/images/icon-filter-close-bg.webp')",
        booking: "url('/src/assets/images/datban.webp')",
      },
      animation: {
        "prod-x": "prod-x 2s linear infinite",
        "prod-y": "prod-y 2s linear infinite",
        pulseSmall: "pulseSmall 1.25s linear infinite",
        progressBarFill: "progressBarFill 2s linear infinite",
      },

      keyframes: {
        "prod-x": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
        "prod-y": {
          "0%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(100%)",
          },
        },
        pulseSmall: {
          "0%": {
            "box-shadow": "0 0 0 0 rgba(214,156,82,0.7)",
          },
          "70%": {
            "box-shadow": "0 0 0 10px rgba(214,156,82,0.7)",
          },
          "100%": {
            "box-shadow": "0 0 0 0 rgba(214,156,82,0.7)",
          },
        },
        progressBarFill: {
          "0%": {
            "background-position": "0 0",
          },
          "100%": {
            "background-position": "40px 0",
          },
        },
      },
    },
  },
  plugins: [forms],
} satisfies Config;
