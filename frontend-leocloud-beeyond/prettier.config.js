/** @type {import("prettier").Config} */
const config = {
    plugins: [require.resolve("prettier-plugin-tailwindcss")],
    trailingComma: "es5",
    semi: true,
    singleQuote: false,
    printWidth: 100,
};

module.exports = config;
