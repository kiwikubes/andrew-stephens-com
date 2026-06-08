import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#020204",
        cyanGlow: "#00e5ff",
        magentaGlow: "#ff2bd6",
        purpleGlow: "#8b5cf6",
        limeGlow: "#b8ff3c",
        goldGlow: "#ffd166"
      },
      boxShadow: {
        neonCyan: "0 0 34px rgba(0, 229, 255, 0.35)",
        neonMagenta: "0 0 34px rgba(255, 43, 214, 0.3)",
        neonLime: "0 0 30px rgba(184, 255, 60, 0.25)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Arial",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;
