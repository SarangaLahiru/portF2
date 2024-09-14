
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  plugins: [
    function addVariablesForColors({ addBase, theme }) {
      const colorPalette = theme('colors');
      const flattenColors = (colors, prefix = '') => {
        return Object.keys(colors).reduce((acc, key) => {
          const value = colors[key];
          const newPrefix = prefix ? `${prefix}-${key}` : key;
          if (typeof value === 'object' && !Array.isArray(value)) {
            Object.assign(acc, flattenColors(value, newPrefix));
          } else {
            acc[`--${newPrefix}`] = value;
          }
          return acc;
        }, {});
      };

      const colorVariables = flattenColors(colorPalette);

      addBase({
        ':root': colorVariables,
      });
    },
  ],
};
