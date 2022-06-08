module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.tsx',
          '.android.tsx',
          '.js',
          '.ts',
          '.jsx',
          '.tsx',
          '.json',
        ],
        alias: {
          /**
           * Regular expression is used to match all files inside `./src` directory and map each `.src/folder/[..]` to `~folder/[..]` path
           */
          // '^~(.+)': './src/\\1',
          tests: ['./tests/'],
          assets: ['./assets'],
          api: ['./src/api'],
          components: './src/components',
          constants: ['./src/constants'],
          hocs: ['./src/hocs'],
          hooks: ['./src/hooks'],
          models: ['./src/models'],
          navigation: ['./src/navigation'],
          screens: ['./src/screens'],
          utils: ['./src/utils'],
        },
      },
    ],
  ],
};
