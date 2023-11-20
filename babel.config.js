module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          screens: './src/screens',
          components: './src/components',
          constants: './src/constants',
          network: './src/network',
          helpers: './src/helpers',
          actions: './src/redux/actions',
          redux: './src/redux',
        },
      },
    ],
  ],
};
