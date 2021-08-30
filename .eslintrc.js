module.exports = {
  settings: {
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    }
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    "MAIN_WINDOW_WEBPACK_ENTRY": "readonly",
  },
  parser: '@babel/eslint-parser',
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": ['warn'],
    "import/no-extraneous-dependencies": ["warn", {"devDependencies": false, "optionalDependencies": false, "peerDependencies": false}],
    "no-param-reassign": "warn",
    "no-console": "warn",
    "no-restricted-syntax": "warn",
    "global-require": "warn",
    "react/prop-types": "warn",
    "react/jsx-filename-extension": "off",
    "import/no-cycle": ["warn", {maxDepth: 2}],
    "react/jsx-props-no-spreading": "warn",
    "jsx-a11y/alt-text": "off",
    "max-len": ["error", {code: 120}],
    "react/no-unescaped-entities": "off",
    "no-plusplus": "off",
  },
};
