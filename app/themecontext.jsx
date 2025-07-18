import { createContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme(); // system theme (light/dark)
  const [theme, setTheme] = useState(colorScheme || 'light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => listener.remove();
  }, []);

  const themeStyles = {
    light: {
      background: '#FFFFFF',
      text: '#000000',
    },
    dark: {
      background: '#000000',
      text: '#FFFFFF',
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles: themeStyles[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};
