/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    borderRadius: {
      small: "5px",
      med: "6px",
      large: "8px",
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
    fontSize: {
      "sm-1": "18.75px",
      "sm-2": "21.875px",
      "sm-3": "23.125px",
      "md-1": "25px",
      "md-2": "28.125px",
      "md-3": "30px",
      "lg-1": "37.5px",
      "lg-2": "43.75px",
      "lg-3": "56.25px",
    },
    extend: {},
  },
  plugins: [],
};
