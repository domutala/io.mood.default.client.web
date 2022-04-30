module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "camelcase": "off",
    "node/no-callback-literal": "off"
  },
};
