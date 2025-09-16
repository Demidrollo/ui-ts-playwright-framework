import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends('plugin:playwright/playwright-test', 'plugin:@typescript-eslint/recommended'),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module',
    },

    rules: {
      quotes: [
        2,
        'single',
        {
          avoidEscape: true,
        },
      ],

      'import/no-unresolved': 0,
      '@typescript-eslint/no-useless-constructor': 'off',
      'no-useless-constructor': 'off',
      'no-undef': 0,
      'no-unused-vars': 0,
      'no-empty-function': 0,
      'import/prefer-default-export': 0,
      'import/extensions': 0,
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
