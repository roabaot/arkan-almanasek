import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value*='material-symbols-outlined']",
          message:
            "Do not use Material Symbols (material-symbols-outlined). Use react-icons instead.",
        },
        {
          selector: "TemplateElement[value.raw*='material-symbols-outlined']",
          message:
            "Do not use Material Symbols (material-symbols-outlined). Use react-icons instead.",
        },
      ],
    },
  },
];

export default eslintConfig;
