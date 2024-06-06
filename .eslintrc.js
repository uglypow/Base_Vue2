/**
 * @typedef { import('eslint').Linter.Config } Options
 */

/**
 * @type { Options }
 */
module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  env: {
    node: true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/typescript'
  ],

  parserOptions: {
    parser: '@typescript-eslint/parser'
  },

  rules: {
    // eslint
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-mixed-operators': 'off',
    'no-unused-expressions': 'off',
    'no-self-assign': 'off',
    'no-unused-vars': 'off',
    'camelcase': 'off',
    'quotes': ['error', 'single'],
    'comma-dangle': ['error', 'never'],
    // vue
    'vue/no-side-effects-in-computed-properties': 'off',
    'vue/no-unused-components': 'off',
    'vue/require-prop-types': 'off',
    'vue/return-in-computed-property': 'off',
    'vue/no-async-in-computed-properties': 'off',
    'vue/no-v-html': 'off',
    'vue/prop-name-casing': 'off',
    'vue/attributes-order': 1,
    'vue/attribute-hyphenation': 1,
    'vue/multi-word-component-names': 'off',
    'vue/no-useless-template-attributes': 'off',
    'vue/valid-v-show': 'off',
    'vue/no-mutating-props': 'off',
    'vue/no-lone-template': 'off',
    'vue/no-v-text-v-html-on-component': 'off',
    'vue/attribute-hyphenation': 'off',
    // typescript
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': 'error',
    'semi': 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/array-type': 'error',
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': ['error'],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/quotes': ['error', 'single'],
    'no-unneeded-ternary': 'error'
    // '@typescript-eslint/comma-dangle': ['error', 'never'],
  },

  overrides: [
    {
      files: [
        'src/**/*/__tests__/**/*.{js,ts}',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
