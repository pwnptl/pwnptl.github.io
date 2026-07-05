import { useState, useEffect } from 'react';
import { MdPalette } from 'react-icons/md';
import { setCurrentTheme, themeNames } from '@theme/colors';
import themes from '@theme/colors';
import { useTheme } from '@theme/ThemeContext';
import { Toast } from '../Toast/Toast';
import './ThemeSwitcher.css';

export function ThemeSwitcher({ isToastEnabled = true }) {
  const { theme, setTheme } = useTheme();
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastThemeName, setToastThemeName] = useState('');

  const applyThemeToDOM = (themeName) => {
    const themeObj = themes[themeName];
    const root = document.documentElement;

    Object.entries(themeObj).forEach(([key, values]) => {
      if (typeof values === 'object') {
        Object.entries(values).forEach(([subKey, color]) => {
          const varName = `--${key}-${subKey}`;
          root.style.setProperty(varName, color);
        });
      }
    });
  };

  useEffect(() => {
    const themeIndex = themeNames.indexOf(theme);
    setCurrentThemeIndex(themeIndex >= 0 ? themeIndex : 0);
  }, [theme]);

  const switchTheme = () => {
    const nextIndex = (currentThemeIndex + 1) % themeNames.length;
    const nextThemeName = themeNames[nextIndex];

    setCurrentThemeIndex(nextIndex);
    setCurrentTheme(nextThemeName);
    setTheme(nextThemeName);
    applyThemeToDOM(nextThemeName);

    // Show toast if enabled
    if (isToastEnabled) {
      setToastThemeName(nextThemeName.replace(/_/g, ' '));
      setShowToast(true);
    }
  };

  return (
    <>
      <button
        id="theme-switcher-btn"
        className="theme-switcher"
        onClick={switchTheme}
        title={`Switch theme (Current: ${themeNames[currentThemeIndex]})`}
        aria-label="Switch color theme"
      >
        <MdPalette size={24} />
      </button>

      {/* Toast Notification using reusable Toast component */}
      <Toast
        message={toastThemeName}
        type="info"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}

export default ThemeSwitcher;
