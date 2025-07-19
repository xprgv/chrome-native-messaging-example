// @ts-check

// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
    singleQuote: false,
    semi: true,
    bracketSpacing: true,
    tabWidth: 4,
    trailingComma: "all",
    printWidth: 130,
    overrides: [
        {
            files: ["*.md"],
            options: {
                tabWidth: 4,
                printWidth: 150,
                semi: false,
            },
        },
        {
            files: ["*.yml", "*.yaml"],
            options: {
                tabWidth: 2,
                printWidth: 100,
            },
        },
        {
            files: ["*.jsonc", "*.json"],
            options: {
                trailingComma: "none",
            },
        },
    ],
};

export default config;
