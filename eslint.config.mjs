import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    // 自動生成コードのみ無視
    files: ["app/generated/**"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
  {
    // 通常コードには警告ルールを適用
    files: ["**/*.ts", "**/*.tsx"],
    excludedFiles: ["app/generated/**"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-unused-expressions": "warn",
    },
  },

  ...compat.extends("next/core-web-vitals", "next/typescript"),
];


export default eslintConfig;
