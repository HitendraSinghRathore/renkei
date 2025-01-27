import pkg from '@eslint/js';
const { configs: eslintConfigs } = pkg;
import nextPlugin from '@next/eslint-plugin-next';
import importPlugin from 'eslint-plugin-import';
import a11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['**/node_modules/**', '**/.next/**', '**/out/**'],

    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      react: reactPlugin,
      'jsx-a11y': a11yPlugin,
      import: importPlugin,
      '@next/next': nextPlugin,
    },

    rules: {
      ...eslintConfigs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...a11yPlugin.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'warn',
      'import/no-unresolved': 'error',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/alt-text': 'error',

      '@next/next/no-img-element': 'warn',
      '@next/next/no-html-link-for-pages': 'error',
    },
  },
];
