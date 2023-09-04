module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          screens: './src/screens',
          components: './src/components',
          constants: './src/constants',
          network: './src/network',
        },
      },
    ],
  ],
};
