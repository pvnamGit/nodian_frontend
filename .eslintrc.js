const prettierConfig = require('./.prettierrc.js');

module.exports = {
  eslint: {
    dirs: ['src'],
  },
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // 'react/react-in-jsx-scope': 'off',
    // 'react/jsx-uses-react': 'off',
    // 'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', 'ts', 'tsx'] }],
    // 'no-use-before-define': 'off',
    // semi: [1, 'always'],
    // 'no-unused-vars': 'off',
    // 'no-underscore-dangle': 'off',
    // 'consistent-return': 'off',
    // 'global-require': 0,
  },
  plugins: [
    'react', 'unused-imports'
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
