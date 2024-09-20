/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Pretendard", "Nanum Gothic", "Apple SD Gothic Neo", "Helvetica", "Arial", "sans-serif"]
    },
    extend: {}
  },
  plugins: [require("tailwind-scrollbar")]
};
