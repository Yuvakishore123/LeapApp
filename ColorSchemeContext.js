/* eslint-disable react-hooks/exhaustive-deps */
import React, {useMemo} from 'react';
import Styles from './src/constants/themeColors';
import Colors from './src/constants/colors';

export const ColorSchemeContext = React.createContext({
  colorScheme: 'dark',
  toggleColorScheme: () => {},
  getContainerStyle: () => ({}),
  getTextInputStyle: () => ({}),
  getTextColor: () => ({}),
  getPlaceholderTextColor: () => ({}),
  getplaceholdercolor: () => ({}),
  getButtonColor: () => ({}),
  tabColor: () => {},
  PlaceholderColor: () => {},
});

export const ColorSchemeProvider = ({children}) => {
  const [colorScheme, setColorScheme] = React.useState('dark');

  const toggleColorScheme = () => {
    setColorScheme(prevScheme => (prevScheme === 'light' ? 'dark' : 'light'));
  };

  const getContainerStyle = () => {
    if (colorScheme === 'dark') {
      return Styles.blacktheme;
    } else if (colorScheme === 'light') {
      return Styles.whiteTheme;
    }
  };

  const getTextInputStyle = () => {
    return colorScheme === 'dark' ? Styles.cardColor : Styles.main;
  };

  const getTextColor = () => {
    return colorScheme === 'dark' ? {color: 'white'} : {color: 'black'};
  };
  const tabColor = () => {
    return colorScheme === 'dark' ? {color: 'white'} : {color: 'black'};
  };
  const PlaceholderColor = () => {
    return colorScheme === 'dark' ? Colors.Inputtext : Colors.black;
  };

  const getPlaceholderTextColor = () => {
    return colorScheme === 'dark'
      ? {color: Colors.Inputtext}
      : {color: Colors.black};
  };
  const getplaceholdercolor = () => {
    return colorScheme === 'dark'
      ? {color: Colors.Inputtext}
      : {color: Colors.gray};
  };
  const getButtonColor = () => {
    return colorScheme === 'dark'
      ? {color: Colors.buttonColor}
      : {color: Colors.black};
  };

  const contextValue = useMemo(() => {
    return {
      colorScheme,
      toggleColorScheme,
      getContainerStyle,
      getTextInputStyle,
      getTextColor,
      getPlaceholderTextColor,
      tabColor,
      PlaceholderColor,
      getplaceholdercolor,
      getButtonColor,
    };
  }, [colorScheme]);

  return (
    <ColorSchemeContext.Provider value={contextValue}>
      {children}
    </ColorSchemeContext.Provider>
  );
};
