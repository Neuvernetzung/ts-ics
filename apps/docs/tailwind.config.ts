import path from "path";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      heading: "Oswald",
      body: "Inter",
    },
  },
  plugins: [],
};

export default config;
