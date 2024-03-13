/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "login-background": "url(src/assets/bg_blue.png), linear-gradient(to right, rgb(1, 75, 228), rgb(2, 182, 227))",
      },
      // fontFamily: {
      //   "epilo": "Epilogue, sans-serif",
      // }
    },
    screens: {
      'mobile': '360px',
      // => @media (min-width: 360px) { ... }
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }
      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }
      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
}

