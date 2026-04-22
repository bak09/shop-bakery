import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('appTheme') || 'light';
    setTheme(savedTheme);
    document.body.dataset.theme = savedTheme;
    setIsLoaded(true);
  }, []);

  // Save theme to localStorage and update DOM
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('appTheme', theme);
    document.body.dataset.theme = theme;
  }, [theme, isLoaded]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
