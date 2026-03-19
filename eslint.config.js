import globals from 'globals';

export default [
  // Global ignores
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      '.git/**',
      '*.log',
      'package-lock.json',
      'migrations/**',
      'swagger/**'
    ]
  },

  // Base configuration for all files
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      },
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true
        }
      }
    },
    rules: {
      // Best practices - errors
      'no-var': 'error',
      'prefer-const': 'error',
      'semi': ['error', 'always'],
      'no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0, maxEOF: 0 }],

      // Code style consistency
      'indent': ['error', 2, { SwitchCase: 1 }],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'comma-dangle': ['error', 'never'],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always'
        }
      ],
      'keyword-spacing': 'error',
      'space-infix-ops': 'error',
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'comma-spacing': 'error',

      // Security & best practices
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'eqeqeq': ['error', 'always'],
      'no-else-return': 'error',
      'no-empty-function': 'error',
      'no-invalid-this': 'error',
      'no-param-reassign': 'error',
      'no-use-before-define': ['error', { functions: false, classes: true }],
      'prefer-template': 'error',
      'prefer-arrow-callback': 'error',
      'no-var': 'error',

      // Performance
      'no-unmodified-loop-condition': 'error',
      'no-unreachable-loop': 'error'
    }
  },

  // Override for test files - more lenient
  {
    files: ['tests/**/*.js', '**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    },
    rules: {
      'no-console': 'off',
      'no-invalid-this': 'off'
    }
  }
];
