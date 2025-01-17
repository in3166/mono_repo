/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/in3166/mono_repo/blob/main/docs/about-linters.md
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
    '@ijyu-3166/eslint-config-bases/import-x',
    '@ijyu-3166/eslint-config-bases/sonar',
    '@ijyu-3166/eslint-config-bases/regexp',
    '@ijyu-3166/eslint-config-bases/jest',
    '@ijyu-3166/eslint-config-bases/rtl',
    '@ijyu-3166/eslint-config-bases/react',
    // Apply prettier and disable incompatible rules
    '@ijyu-3166/eslint-config-bases/prettier-plugin',
  ],
  rules: {
    // optional overrides per project
  },
  overrides: [
    // optional overrides per project file match
  ],
};
