import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js"; // Import the base ESLint configuration

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Base ESLint configuration
  js.configs.recommended,

  // Compatibility layer for eslintrc-style configs
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript",
    ],
    rules: {
      // Disable no-explicit-any rule
      "@typescript-eslint/no-explicit-any": "off",
    },
  }),
];