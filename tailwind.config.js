/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    borderRadius: {
      small: "8px",
      med: "10px",
      large: "13px",
    },
    fontWeight: {
      thin: "100",
      extralight: "200",
      light: "300",
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
    colors: {
      accent: "#702CFF",
      danger: "#FF0000",
      background: "#FFFFFF",
      primary: "#000000",
      secondary: "#B9B9B9",
      tertiary: "#A3A3A3",
      link: "#FFF500",
    },
    extend: {},
  },
  plugins: [],
};
