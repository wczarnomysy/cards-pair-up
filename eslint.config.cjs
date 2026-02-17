module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['error', 'warn'] }],
      'no-debugger': 'error',
      'no-unused-vars': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        process: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      'no-console': ['warn', { allow: ['error', 'warn'] }],
      'no-debugger': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    },
  },
  {
    files: ['**/*.test.{js,ts}', '**/__tests__/**/*'],
    languageOptions: {
      globals: {
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    ignores: ['dist/', 'node_modules/', 'vite.config.js', 'jest.config.js'],
  },
];
