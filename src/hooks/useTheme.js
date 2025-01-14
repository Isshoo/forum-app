import { useState, useEffect, useCallback, useMemo } from 'react';

function useTheme(initialTheme = 'dark') {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || initialTheme);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, []);

  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme, toggleTheme]);

  return [theme, themeContextValue];
}

export default useTheme;
