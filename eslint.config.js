import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    rules: {
      "rules": {
        "@typescript-eslint/no-explicit-any": "error"
      }
    },
  },
];
