import globals from "globals";
import pluginJs from "@eslint/js";
import playwright from "eslint-plugin-playwright";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node,
    },
  },

  // Вимикає конфліктні правила форматування
  eslintConfigPrettier,

  // Базові ESLint правила
  pluginJs.configs.recommended,

  // Playwright recommended (flat)
  playwright.configs["flat/recommended"],

  {
    rules: {
      "no-unused-vars": "error",
      "max-len": [
        "error",
        {
          code: 200,
          comments: 200,
        },
      ],
      "playwright/expect-expect": "off",
    },
    ignores: [
      "**/node_modules/*",
      "playwright.config.js",
      "**/playwright-report/**",
    ],
  },
];
