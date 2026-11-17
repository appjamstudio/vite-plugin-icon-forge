import stylistic from '@stylistic/eslint-plugin';
import * as tsParser from '@typescript-eslint/parser';
import { defineConfig, globalIgnores } from 'eslint/config';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig([
  globalIgnores(['node_modules', 'dist']),
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser
    },
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    }
  },
  stylistic.configs.customize({
    semi: true,
    braceStyle: '1tbs',
    severity: 'warn',
    commaDangle: 'never'
  }),
  {
    rules: {
      '@stylistic/jsx-one-expression-per-line': 'off',
      '@stylistic/no-extra-parens': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/semi-style': ['warn', 'last'],
      '@stylistic/spaced-comment': 'off'
    }
  }
]);
