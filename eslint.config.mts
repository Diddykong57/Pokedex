import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        ignores: ["dist/**", "node_modules/**", ".aws-sam/**", "docs/**", "template-output.yml", "scripts/**/*.cjs"],
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        languageOptions: {
            globals: globals.node,
        },
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
]);
