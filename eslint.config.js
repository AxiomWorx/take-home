import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,ts,tsx,vue}'],
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  // Configuration for TypeScript files
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs['recommended'].rules,
      '@typescript-eslint/no-explicit-any': 'off'
    },
  },

  // Configuration for Vue files
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: pluginVue.parser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
        ecmaVersion: 'latest',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue: pluginVue,
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs['recommended'].rules,
      'vue/script-setup-uses-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'off'
    },
    globals: {
      ...globals.browser,
      ...globals.es2021,
    },
  }
]
