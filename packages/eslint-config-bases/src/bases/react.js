/**
 * Opinionated config base for projects using react.
 * @see https://github.com/in3166/shared-dx/tree/main/packages/eslint-config-bases
 */

const reactPatterns = {
  files: ['*.{jsx,tsx}'],
};

const stylesPatterns = {
  files: ['*.styles.{js,ts}', 'styles.{js,ts}'],
};

/**
 * Fine-tune naming convention react typescript jsx (function components)
 * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/naming-convention.md
 */

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  overrides: [
    {
      extends: [
        // @see https://github.com/jsx-eslint/eslint-plugin-react
        'plugin:react/recommended',
        // @see https://www.npmjs.com/package/eslint-plugin-react-hooks
        'plugin:react-hooks/recommended',
        // @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
        'plugin:jsx-a11y/recommended',
      ],
      files: [...reactPatterns.files, ...stylesPatterns.files],
      rules: {
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
        'react/no-unescaped-entities': ['error', { forbid: ['>'] }],
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
        'react/no-unknown-property': ['error', { ignore: ['css'] }],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
