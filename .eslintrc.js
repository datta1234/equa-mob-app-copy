module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    // 'key-spacing': ['error', {beforeColon: true}],
    // semi: ['error', 'never'],
    'react/jsx-props-no-spreading': 0,
    'arrow-parens': [
      'error',
      'always',
      {
        requireForBlockBody: true,
      },
    ],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          minProperties: 8,
          multiline: true,
          consistent: true,
        },
        ObjectPattern: {
          minProperties: 8,
          multiline: true,
          consistent: true,
        },
      },
    ],
    'jsx-a11y/href-no-hash': 0,
    'jsx-quotes': 0,
    'no-underscore-dangle': 0,
    'react/jsx-first-prop-new-line': 0,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          {
            pattern: 'react+(|-native)',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'assets',
            group: 'internal',
          },
          {
            pattern: 'constants/**',
            group: 'internal',
          },
          {
            pattern: 'constants',
            group: 'internal',
          },
          // Use this pattern to match path aliases in project if you chose prefix aliases with ~
          {
            pattern: '~**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: [],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'import/prefer-default-export': 0,
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': 'error',
    'no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    'import/no-unresolved': 'error', // turn on errors for missing imports
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
        paths: ['/src'],
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
      },
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        // use <root>/path/to/folder/tsconfig.json
        project: './tsconfig.json',
      },
    },
  },
}
