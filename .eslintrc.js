const path = require('path')
module.exports = {
  // "extends": ["taro/react"],
  extends: ['@antfu'],
  // extends: ['plugin:gm-react-app/recommended'],
  settings: {
    // 'import/resolver': {
    //   // 配置 alias,和 webpack config.resolver.alias 保持一致即可
    //   // 'gmfe-alias': {
    //   //   '@': path.resolve(__dirname, 'src/'),
    //   // },
    // },
  },
  rules: {
    'react/jsx-handler-names': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'promise/always-return': 'off',
    'react/react-in-jsx-scope': 'off',
  },
}
