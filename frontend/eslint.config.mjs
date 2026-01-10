import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    plugins: {
      import: importPlugin,
    },

    rules: {
      // 🔹 Enforce import order
      "import/order": [
        "error",
        {
          groups: [
            ["object"],
            ["builtin", "external"],
            ["internal"],
            ["parent", "sibling", "index"],
            ["type"],
          ],

          pathGroups: [
            {
              pattern: "**/*.css",
              group: "object",
              position: "before",
            },
            {
              pattern: "**/*.scss",
              group: "object",
              position: "before",
            },
          ],

          pathGroupsExcludedImportTypes: ["react"],

          "newlines-between": "always",

          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },

  // Override default ignores of eslint-config-next
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
