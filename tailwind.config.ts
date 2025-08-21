import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        cloud: "#f7f7f8",
        gold: "#c9a64b"
      },
      backgroundImage: {
        sanctuary:
          "radial-gradient(1200px 600px at 50% -10%, rgba(255,255,255,0.6), rgba(255,255,255,0) 40%), radial-gradient(800px 400px at 30% 110%, rgba(201,166,75,0.10), rgba(0,0,0,0) 60%), linear-gradient(180deg, #fbfbfc 0%, #f0f2f6 60%, #ebeff5 100%)"
      },
      boxShadow: {
        halo: "0 0 80px rgba(201,166,75,0.25)"
      }
    }
  },
  plugins: []
};

export default config;
