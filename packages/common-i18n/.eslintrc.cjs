/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/in3166/mono_repo/blob/main/docs/about-linters.md
 */

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
    // Apply prettier and disable incompatible rules
    '@ijyu-3166/eslint-config-bases/prettier-plugin',
  ],
  rules: {
    // optional overrides per project
    '@typescript-eslint/no-require-imports': 'off',
  },
  overrides: [
    // optional overrides per project file match
  ],
};
