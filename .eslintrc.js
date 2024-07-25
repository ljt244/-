module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    "no-restricted-syntax": "off",
    "object-curly-newline": "off",
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "comma-spacing": "off",
    "object-curly-spacing": "off",
    "no-trailing-spaces": "off",
    "indent": "off",
    "eol-last": "off",
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-multiple-empty-lines": "off",  // 取消 "More than 1 blank line not allowed" 规则
    "key-spacing": "off",  // 取消 "M
    "semi": "off",  // 取
  }
}
