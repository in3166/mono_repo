/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/belgattitude/nextjs-monorepo-example/blob/main/docs/about-linters.md
 */

// Workaround for https://github.com/eslint/eslint/issues/3458 (re-export of @rushstack/eslint-patch)
require('@ijyu-3166/eslint-config-bases/patch/modern-module-resolution');

const {
  getDefaultIgnorePatterns,
} = require('@ijyu-3166/eslint-config-bases/helpers');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  ignorePatterns: [...getDefaultIgnorePatterns()],
  extends: [
    '@ijyu-3166/eslint-config-bases/typescript',
    '@ijyu-3166/eslint-config-bases/sonar',
    '@ijyu-3166/eslint-config-bases/regexp',
    '@ijyu-3166/eslint-config-bases/jest',
    '@ijyu-3166/eslint-config-bases/react',
    '@ijyu-3166/eslint-config-bases/rtl',
    // Apply prettier and disable incompatible rules
    '@ijyu-3166/eslint-config-bases/prettier-plugin',
  ],
  rules: {
    'jsx-a11y/anchor-is-valid': 'off',
  },
  overrides: [],
};
