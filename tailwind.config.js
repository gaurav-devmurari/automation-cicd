/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens:{
      mD:'640px',
      lD:'1024px'
    },
    extend: {
      textColor: {
        skin: {},
      },
      colors: {
        white: "var(--white)",
        black: "var(--black)",
        concrete: "var(--concrete)",
        slate: "var(--slate)",
        pewter: "var(--pewter)",
        spaceGray: "var(--spaceGray)",
        charcoal: "var(--charcoal)",
        onyx: "var(--onyx)",
        ebony: "var(--ebony)",
        forest: "var(--forest)",
        fir: "var(--fir)",
        tomato: "var(--tomato)",
        oxBlood: "var(--oxBlood)",
        cornFlower: "var(--cornFlower)",
        moroccan: "var(--moroccan)",
      },
    },
    fontFamily: {
      body: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      sans: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
  },
  plugins: [],
};
