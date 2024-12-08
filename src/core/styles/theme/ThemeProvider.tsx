import { createContext, useContext } from 'react';
import * as React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { defaultTheme } from './DefaultTheme';

const ThemeContext = createContext(defaultTheme);

export const useTheme = () => useContext(ThemeContext);

const ManageThemeProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[] | null
}) => {
  return (
    <ThemeContext.Provider value={defaultTheme}>
      <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ManageThemeProvider;
