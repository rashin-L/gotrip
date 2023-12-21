/** @type {import('tailwindcss').Config} */



module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    clipPath: {
      mypolygon: "polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 1rem))",
    },
    plugins: [
      require('tailwind-clip-path'),
      
    ],

    extend: {
      backgroundImage: theme => ({
        'food-pattern': "url('/public/media/images/bg1.jpg')",
        'red_paint': "url('/public/media/images/paint.png')",
        'red_paint_n': "url('/public/media/images/paint_n.png')",
        'black-wood': "url('/public/media/images/black-wood.jpg')",
        'brown-wood': "url('/public/media/images/brown-wood.jpg')",
        'order': "url('/public/media/images/order.png')",
      }),
      fontFamily: {
        "Barlow-Regular": "Barlow Regular",
        "Chalk": "Chalk",
        "Right-Chalk": "Right Chalk",
        "Marker": "Marker",
        "Kalam-Bold": "Kalam-Bold",
        "Kalam-Light": "Kalam-Light",
        "Kalam-Regular": "Kalam-Regular",



      },

      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
    },
  },
  plugins: [
    
    function ({ addVariant }) {
      addVariant('child', '&>*');
      addVariant('child-hover', '&>*:hover');
    },
    require("tw-elements-react/dist/plugin.cjs")
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/line-clamp'),
    // require('@tailwindcss/aspect-ratio'),
  ],
}