import { useEffect, useState } from 'react';
import { defaultTheme } from '../styles/themes/default';
import { lightTheme } from '../styles/themes/light';

export function useTheme() {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      setTheme(e.matches ? lightTheme : defaultTheme);
    };

    mediaQuery.addEventListener('change', updateTheme);
    updateTheme(mediaQuery);
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, []);

  return theme;
}
