// eslint-disable-next-line @typescript-eslint/no-var-requires, import/extensions
const prettierConfig = require('./.prettierrc.js');

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended', // TypeScript rules
    'airbnb', // Airbnb rules
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'react', // Uses the recommended rules from @eslint-plugin-react
    '@typescript-eslint', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'prettier',
  ],
  rules: {
    // Include your custom rules here
    'react/react-in-jsx-scope': 'off', // No need to import React with JSX Transform introduced in React 17
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }], // Allow JSX syntax in .js, .jsx, .ts, .tsx files
    'no-use-before-define': 'off',
    semi: [1, 'always'],

    // Possible errors
    'no-console': 'warn',

    // Best practices
    'dot-notation': 'error',
    'no-else-return': 'error',
    'no-floating-decimal': 'error',
    'no-sequences': 'error',

    // Stylistic
    'array-bracket-spacing': 'error',
    'computed-property-spacing': ['error', 'never'],
    'unused-imports/no-unused-imports-ts': 'off',
    curly: 'error',
    'no-lonely-if': 'error',
    'no-unneeded-ternary': 'error',
    'one-var-declaration-per-line': 'error',
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: false,
        avoidEscape: true,
      },
    ],

    // ES6
    'array-callback-return': 'off',
    'prefer-const': 'error',

    // Imports
    'import/prefer-default-export': 'off',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'no-unused-expressions': 'off',
    'no-prototype-builtins': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    // REACT
    'react/jsx-uses-react': 'off',
    'jsx-a11y/href-no-hash': [0],
    'react/display-name': 0,
    'react/no-deprecated': 'error',
    'react/no-unsafe': [
      'error',
      {
        checkAliases: true,
      },
    ],
    'react-hooks/exhaustive-deps': 0,

    // Prettier
    // eslint looks for the prettier config at the top level of the package/app
    // but the config lives in the `config/` directory. Passing the config here
    // to get around this.
    'prettier/prettier': ['error', prettierConfig],
    'no-unused-vars': 'off',
    'no-underscore-dangle': 'off',

    // TYPESCRIPT
    // '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
