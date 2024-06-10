/** @type {import('eslint').Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
  ],
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['.eslintrc.cjs', 'example', 'dist', 'scripts', 'coverage'],
  parserOptions: {
    project: "tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
}

module.exports = config
