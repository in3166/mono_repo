/**
 * Specific eslint rules for this workspace, learn how to compose
 * @link https://github.com/in3166/perso/tree/main/packages/eslint-config-bases
 */

// Workaround for https://github.com/eslint/eslint/issues/3458
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
  ignorePatterns: [...getDefaultIgnorePatterns(), 'src/generated'],
  extends: [
    '@ijyu-3166/eslint-config-bases/typescript',
    '@ijyu-3166/eslint-config-bases/import-x',
    '@ijyu-3166/eslint-config-bases/sonar',
    '@ijyu-3166/eslint-config-bases/regexp',
    // Apply prettier and disable incompatible rules
    '@ijyu-3166/eslint-config-bases/prettier-plugin',
  ],
  overrides: [
    // optional overrides per project file match
    {
      files: ['**/*seed.ts'],
      rules: {
        'sonarjs/no-duplicate-string': 'off',
      },
    },
  ],
};
