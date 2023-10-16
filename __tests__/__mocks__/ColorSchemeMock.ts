import React from 'react';

export const ColorSchemeContext = React.createContext({
  colorScheme: 'dark',
  toggleColorScheme: () => {},
});
