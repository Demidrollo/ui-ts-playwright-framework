module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:playwright/playwright-test',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
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
};
