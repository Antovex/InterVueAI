import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import nextPlugin from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Base configurations using compat
  ...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ),
  
  // Add Next.js plugin directly
  {
    plugins: {
      '@next/next': nextPlugin
    }
  },
  
  // Global configuration for all files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // React rules
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/prop-types": "off", // Use TypeScript types instead
      "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
      
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      
      // Import rules - fix import ordering to match your stylistic preferences
      "import/order": ["error", {
        "groups": [
          ["builtin", "external"],
          "internal",
          ["parent", "sibling", "index"]
        ],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "builtin",
            "position": "before"
          },
          {
            "pattern": "@/components/**",
            "group": "internal",
            "position": "after"
          }
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "newlines-between": "always",
        "alphabetize": { "order": "asc", "caseInsensitive": true }
      }],
      
      // General rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      
      // Accessibility rules
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      
      // Next.js specific rules
      "@next/next/no-img-element": "error", // Use next/image instead
      "@next/next/no-html-link-for-pages": "error"
    }
  },
  
  // Specific rules for component files
  {
    files: ["**/components/**/*.{js,jsx,ts,tsx}"],
    rules: {
      // Component-specific rules
      "react/display-name": "error",
    }
  },
  
  // Ignore rules for certain files
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "public/**",
      "**/*.config.{js,ts,mjs}",
      "components/ui/**",
    ]
  }
];

export default eslintConfig;
