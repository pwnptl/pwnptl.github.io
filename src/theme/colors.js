const themes = {
  deep_blue: {
    background: {
      primary: '#f0f4f8',
      secondary: '#e1e8f0',
      tertiary: '#c7d4e8',
      border: '#b3c4dc',
    },
    font: {
      primary: '#1a365d',
      secondary: '#2d5a8c',
      tertiary: '#445e99',
      border: '#667eae',
    },
    navbar: {
      primary: '#0f2744',
      secondary: '#1a365d',
      text: '#ffffff',
      border: '#1a365d',
    },
    accent: {
      primary: '#3182ce',
      secondary: '#63b3ed',
      hover: '#2c5282',
    },
    scrollbar: {
      track: '#b3c4dc',
      thumb: '#3182ce',
      thumbHover: '#2c5282',
    },
    button: {
      background: '#1a365d',
      hover: '#0f2744',
      border: '#1a365d',
    },
    contact: {
      background: '#e1e8f0',
      iconBackground: '#c7d4e8',
    },
  },
  vibrant_red: {
    background: {
      primary: '#ffe5e5',
      secondary: '#ffd4d4',
      tertiary: '#ffb3b3',
      border: '#ff9999',
    },
    font: {
      primary: '#b71c1c',
      secondary: '#d32f2f',
      tertiary: '#f44336',
      border: '#ef5350',
    },
    navbar: {
      primary: '#7f0000',
      secondary: '#b71c1c',
      text: '#ffffff',
      border: '#b71c1c',
    },
    accent: {
      primary: '#e53935',
      secondary: '#ff7043',
      hover: '#c62828',
    },
    scrollbar: {
      track: '#ffb3b3',
      thumb: '#e53935',
      thumbHover: '#c62828',
    },
    button: {
      background: '#b71c1c',
      hover: '#7f0000',
      border: '#b71c1c',
    },
    contact: {
      background: '#ffd4d4',
      iconBackground: '#ffb3b3',
    },
  },
  emerald_green: {
    background: {
      primary: '#e0f7f4',
      secondary: '#b2ebf2',
      tertiary: '#80deea',
      border: '#4dd0e1',
    },
    font: {
      primary: '#00695c',
      secondary: '#00897b',
      tertiary: '#009688',
      border: '#26a69a',
    },
    navbar: {
      primary: '#004d40',
      secondary: '#00695c',
      text: '#ffffff',
      border: '#00695c',
    },
    accent: {
      primary: '#009688',
      secondary: '#4db8ac',
      hover: '#00796b',
    },
    scrollbar: {
      track: '#80deea',
      thumb: '#009688',
      thumbHover: '#00796b',
    },
    button: {
      background: '#00695c',
      hover: '#004d40',
      border: '#00695c',
    },
    contact: {
      background: '#b2ebf2',
      iconBackground: '#80deea',
    },
  },
  deep_purple: {
    background: {
      primary: '#f3e5f5',
      secondary: '#e1bee7',
      tertiary: '#ce93d8',
      border: '#ba68c8',
    },
    font: {
      primary: '#4a148c',
      secondary: '#6a1b9a',
      tertiary: '#7b1fa2',
      border: '#8e24aa',
    },
    navbar: {
      primary: '#2a0845',
      secondary: '#4a148c',
      text: '#ffffff',
      border: '#4a148c',
    },
    accent: {
      primary: '#7b1fa2',
      secondary: '#ba68c8',
      hover: '#6a1b9a',
    },
    scrollbar: {
      track: '#ce93d8',
      thumb: '#7b1fa2',
      thumbHover: '#6a1b9a',
    },
    button: {
      background: '#4a148c',
      hover: '#2a0845',
      border: '#4a148c',
    },
    contact: {
      background: '#e1bee7',
      iconBackground: '#ce93d8',
    },
  },
  warm_orange: {
    background: {
      primary: '#ffe0b2',
      secondary: '#ffcc80',
      tertiary: '#ffb74d',
      border: '#ffa726',
    },
    font: {
      primary: '#e65100',
      secondary: '#ef6c00',
      tertiary: '#f57c00',
      border: '#fb8c00',
    },
    navbar: {
      primary: '#bf360c',
      secondary: '#e65100',
      text: '#ffffff',
      border: '#e65100',
    },
    accent: {
      primary: '#f57c00',
      secondary: '#ffb74d',
      hover: '#e65100',
    },
    scrollbar: {
      track: '#ffb74d',
      thumb: '#f57c00',
      thumbHover: '#e65100',
    },
    button: {
      background: '#e65100',
      hover: '#bf360c',
      border: '#e65100',
    },
    contact: {
      background: '#ffcc80',
      iconBackground: '#ffb74d',
    },
  },
  midnight: {
    background: {
      primary: '#f3f4f6',
      secondary: '#e5e7eb',
      tertiary: '#d1d5db',
      border: '#d1d5db',
    },
    font: {
      primary: '#1f2937',
      secondary: '#374151',
      tertiary: '#4b5563',
      border: '#9ca3af',
    },
    navbar: {
      primary: '#111827',
      secondary: '#1f2937',
      text: '#ffffff',
      border: '#1f2937',
    },
    accent: {
      primary: '#6366f1',
      secondary: '#818cf8',
      hover: '#4f46e5',
    },
    scrollbar: {
      track: '#d1d5db',
      thumb: '#6366f1',
      thumbHover: '#4f46e5',
    },
    button: {
      background: '#1f2937',
      hover: '#111827',
      border: '#1f2937',
    },
    contact: {
      background: '#e5e7eb',
      iconBackground: '#d1d5db',
    },
  },
  coral: {
    background: {
      primary: '#ffe4e1',
      secondary: '#ffd4d0',
      tertiary: '#ffb8b0',
      border: '#ffb8b0',
    },
    font: {
      primary: '#7f1d1d',
      secondary: '#a16162',
      tertiary: '#c85a54',
      border: '#ff6b6b',
    },
    navbar: {
      primary: '#5a0a0a',
      secondary: '#7f1d1d',
      text: '#ffffff',
      border: '#7f1d1d',
    },
    accent: {
      primary: '#ff6b6b',
      secondary: '#ff8787',
      hover: '#fa5252',
    },
    scrollbar: {
      track: '#ffb8b0',
      thumb: '#ff6b6b',
      thumbHover: '#fa5252',
    },
    button: {
      background: '#7f1d1d',
      hover: '#5a0a0a',
      border: '#7f1d1d',
    },
    contact: {
      background: '#ffd4d0',
      iconBackground: '#ffb8b0',
    },
  },
  teal: {
    background: {
      primary: '#ccfbf1',
      secondary: '#99f6e4',
      tertiary: '#5eead4',
      border: '#45b7aa',
    },
    font: {
      primary: '#134e4a',
      secondary: '#0f766e',
      tertiary: '#115e59',
      border: '#14b8a6',
    },
    navbar: {
      primary: '#0d3b36',
      secondary: '#0f766e',
      text: '#ffffff',
      border: '#0f766e',
    },
    accent: {
      primary: '#14b8a6',
      secondary: '#2dd4bf',
      hover: '#0d9488',
    },
    scrollbar: {
      track: '#99f6e4',
      thumb: '#14b8a6',
      thumbHover: '#0d9488',
    },
    button: {
      background: '#0f766e',
      hover: '#0d3b36',
      border: '#0f766e',
    },
    contact: {
      background: '#99f6e4',
      iconBackground: '#5eead4',
    },
  },
  rose: {
    background: {
      primary: '#ffe4e6',
      secondary: '#fecdd3',
      tertiary: '#fbcfe8',
      border: '#f9a8d4',
    },
    font: {
      primary: '#831843',
      secondary: '#9d174d',
      tertiary: '#be185d',
      border: '#f472b6',
    },
    navbar: {
      primary: '#500724',
      secondary: '#831843',
      text: '#ffffff',
      border: '#831843',
    },
    accent: {
      primary: '#ec4899',
      secondary: '#f472b6',
      hover: '#db2777',
    },
    scrollbar: {
      track: '#fbcfe8',
      thumb: '#ec4899',
      thumbHover: '#db2777',
    },
    button: {
      background: '#831843',
      hover: '#500724',
      border: '#831843',
    },
    contact: {
      background: '#fecdd3',
      iconBackground: '#fbcfe8',
    },
  },
  slate: {
    background: {
      primary: '#f1f5f9',
      secondary: '#e2e8f0',
      tertiary: '#cbd5e1',
      border: '#cbd5e1',
    },
    font: {
      primary: '#1e293b',
      secondary: '#334155',
      tertiary: '#475569',
      border: '#64748b',
    },
    navbar: {
      primary: '#0f172a',
      secondary: '#1e293b',
      text: '#ffffff',
      border: '#1e293b',
    },
    accent: {
      primary: '#64748b',
      secondary: '#94a3b8',
      hover: '#475569',
    },
    scrollbar: {
      track: '#cbd5e1',
      thumb: '#64748b',
      thumbHover: '#475569',
    },
    button: {
      background: '#1e293b',
      hover: '#0f172a',
      border: '#1e293b',
    },
    contact: {
      background: '#e2e8f0',
      iconBackground: '#cbd5e1',
    },
  },
  lime: {
    background: {
      primary: '#f7fee7',
      secondary: '#ecfdf5',
      tertiary: '#dcfce7',
      border: '#bef264',
    },
    font: {
      primary: '#365314',
      secondary: '#4b5563',
      tertiary: '#6b7280',
      border: '#84cc16',
    },
    navbar: {
      primary: '#1f2937',
      secondary: '#365314',
      text: '#ffffff',
      border: '#365314',
    },
    accent: {
      primary: '#84cc16',
      secondary: '#bef264',
      hover: '#65a30d',
    },
    scrollbar: {
      track: '#bef264',
      thumb: '#84cc16',
      thumbHover: '#65a30d',
    },
    button: {
      background: '#365314',
      hover: '#1f2937',
      border: '#365314',
    },
    contact: {
      background: '#ecfdf5',
      iconBackground: '#dcfce7',
    },
  },
};

export const themeNames = ['deep_blue', 'vibrant_red', 'emerald_green', 'deep_purple', 'warm_orange', 'midnight', 'coral', 'teal', 'rose', 'slate', 'lime'];

let currentTheme = 'deep_blue';

export function setCurrentTheme(themeName) {
  if (themeNames.includes(themeName)) {
    currentTheme = themeName;
  }
}

export function getCurrentTheme() {
  return currentTheme;
}

export function getColors() {
  return themes[currentTheme];
}

export function getColor(path) {
  const keys = path.split('.');
  let value = themes[currentTheme];
  for (const key of keys) {
    value = value[key];
    if (value === undefined) return null;
  }
  return value;
}

export const colors = themes.deep_blue;
export default themes;
