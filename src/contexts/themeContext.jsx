import { createContext, useContext, useEffect, useState } from "react";
import Storage from "../functions/localStorage";
import { THEME_LOCAL_STORAGE_KEY } from "../constants";

const ThemeContext = createContext(null);

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("light"); //light, dark, lightsout, custom

  const toggleTheme = (newTheme) => {
    Storage.setItem(THEME_LOCAL_STORAGE_KEY, newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    async function loadTheme() {
      const savedTheme = await Storage.getItem(THEME_LOCAL_STORAGE_KEY);

      if (!savedTheme) return;
      setTheme(savedTheme);
    }
    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext)
    throw new Error("ThemeContext must be used within a ThemeContextProvider");

  return themeContext;
}
