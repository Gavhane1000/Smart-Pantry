import { createContext, useContext, useState } from 'react';
 
export const ThemeContext = createContext();
 
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleTheme = () => setDarkMode(prev => !prev);
 
  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div className={darkMode ? 'dark' : 'light'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
 
export const useTheme = () => useContext(ThemeContext);