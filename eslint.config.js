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
      '@stylistic/operator-linebreak': ['warn', 'after'],
      '@stylistic/no-extra-parens': 'off',
      '@stylistic/spaced-comment': 'off',
      '@stylistic/semi-style': ['warn', 'last'],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ]
    }
  }
]);
