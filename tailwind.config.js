/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryRgb: "rgb(232, 0, 151)",
        colorNeonSion: "rgba(0, 220, 238, 0.8)",
        colorNeonPink: "rgba(232, 0, 151, 0.8)",
        colorNeonLight: "rgb(242, 102, 179)",
        colorNeonSionLight: "rgb(153, 235, 242)",
        primaryText: "#ededed",
        pink: {
          500: "#E80097",
        },
        blue: {
          400: "#00DCEE",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        focusNeonPink: "0 0 10px 4px rgba(232,0,151,0.3)",
      },
      backdropBlur: {
        md: "10px",
      },
      fontFamily: {
        roboto: ["Roboto Slab", "serif"],
        openSans: ["Open Sans", "sans-serif"],
      },
      animation: {
        moveBefore: "moveBefore 10s ease-in-out infinite",
        moveAfter: "moveAfter 10s ease-in-out infinite",
      },
      keyframes: {
        moveBefore: {
          "0%": { top: "0px", left: "0px", transform: "scale(1)" },
          "25%": { top: "50px", left: "-100px", transform: "scale(1.1)" },
          "50%": { top: "150px", left: "100px", transform: "scale(0.9)" },
          "75%": { top: "-50px", left: "-150px", transform: "scale(1.2)" },
          "100%": { top: "0px", left: "0px", transform: "scale(1)" },
        },
        moveAfter: {
          "0%": { bottom: "0px", right: "0px", transform: "scale(1)" },
          "25%": { bottom: "100px", right: "150px", transform: "scale(1.2)" },
          "50%": { bottom: "-50px", right: "-100px", transform: "scale(0.9)" },
          "75%": { bottom: "150px", right: "-150px", transform: "scale(1.1)" },
          "100%": { bottom: "0px", right: "0px", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
