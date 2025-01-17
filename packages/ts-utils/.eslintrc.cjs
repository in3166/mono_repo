/**
 * Specific eslint rules for this workspace, learn how to compose
 * @link https://github.com/in3166/mono_repo/tree/main/packages/eslint-config-bases
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
    '@ijyu-3166/eslint-config-bases/sonar',
    '@ijyu-3166/eslint-config-bases/regexp',
    '@ijyu-3166/eslint-config-bases/jest',
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
