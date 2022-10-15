/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        knight:
          "url('https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/cburnett/bB.svg')",
      },
    },
    container: {
      center: true,
      screens: {
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "600px",
        "2xl": "700px",
      },
    },
  },
  plugins: [],
};
