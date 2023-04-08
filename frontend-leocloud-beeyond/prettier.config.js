/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  trailingComma: "es5",
  semi: true,
  singleQuote: false,
  printWidth: 100,
  endOfLine: "lf",
  embeddedLanguageFormatting: "auto",
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

module.exports = config;
