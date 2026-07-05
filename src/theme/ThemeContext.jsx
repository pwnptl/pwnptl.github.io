import { createContext, useContext, useState, useEffect } from 'react';
import { setCurrentTheme, themeNames } from './colors';
import themes from './colors';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('ocean');

  useEffect(() => {
    const getRandomTheme = () => {
      const randomIndex = Math.floor(Math.random() * themeNames.length);
      return themeNames[randomIndex];
    };

    const themeToUse = getRandomTheme();

    setCurrentTheme(themeToUse);
    setTheme(themeToUse);

    const themeObj = themes[themeToUse];
    const root = document.documentElement;

    Object.entries(themeObj).forEach(([key, values]) => {
      if (typeof values === 'object') {
        Object.entries(values).forEach(([subKey, color]) => {
          const varName = `--${key}-${subKey}`;
          root.style.setProperty(varName, color);
        });
      }
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
