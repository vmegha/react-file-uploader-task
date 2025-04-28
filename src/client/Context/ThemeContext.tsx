// import React, { createContext, useState } from 'react';

import { createContext, useEffect, useState } from "react";

// const ThemeContext = createContext({darkTheme: boolean, });
const ThemeContext = createContext<{
  darkTheme: boolean;
  toggleTheme: () => void;
}>({
  darkTheme: false,
  toggleTheme: () => { },
});

const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkTheme ? "dark" : "light"
    );
  }, [darkTheme]);

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
