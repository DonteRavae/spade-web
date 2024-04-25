import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        page: "calc(100dvh - 56px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
