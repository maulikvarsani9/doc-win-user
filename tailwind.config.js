/** @type {import('tailwindcss').Config} */
module.exports = {
  blocklist: ["overline"],
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        paper: { DEFAULT: "#F7F6F2", deep: "#EFEDE6" },
        brand: {
          50: "#F0F7FC", 100: "#DDEEF8", 200: "#B5DAF0", 300: "#7FBEE3", 400: "#3D97CC",
          500: "#0A7BBE", 600: "#006AA8", 700: "#00578A", 800: "#004570", 900: "#00314F",
        },
        signal: {
          50: "#FFF8EB", 100: "#FEEFCF", 200: "#FCDB9A", 300: "#F8C35F", 400: "#F4AD31",
          500: "#F09A0C", 600: "#D47F06", 700: "#A96009",
        },
        ink: {
          50: "#F5F7FA", 100: "#EDF1F5", 200: "#DCE3EB", 300: "#B8C4D3", 400: "#8A9BB2",
          500: "#5B7190", 600: "#3A5677", 700: "#1E3E66", 800: "#132A47", 900: "#0B192C", 950: "#06111E",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        float: "0 18px 50px -18px rgba(11, 25, 44, 0.35)",
        panel: "0 1px 0 rgba(255,255,255,0.6) inset, 0 30px 60px -30px rgba(11, 25, 44, 0.25)",
      },
      keyframes: {
        rise: { from: { transform: "translateY(10px)" }, to: { transform: "none" } },
      },
      animation: { rise: "rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
