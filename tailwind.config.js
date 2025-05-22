// /** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      // colors
      colors: {
        primary: "#D3DCE5",
        // secondary: "#212121",
      },
      screens: {
        "sm-Mob": "390px",
      },

      //font family
      // fontFamily: {
      //   primary: ['"SFPro", sans-serif'],
      //   primaryMedium: ['"SFProMedium", sans-serif'],
      //   secondary: ['"SFProSemiBold",sans-serif'],
      //   accent: ['"SFRounded", sans-serif'],
      // },

      // font sizes
      fontSize: {
        h1: "40px",
        h2: "35px",
        h3: "28px",
        h4: "14px",
        text1: "12px",
        text2: "10px",
      },

      // font weight
      fontWeight: {
        b5: "500",
        b6: "600",
        b7: "700",
      },
    },
    plugins: [],
  },
};
