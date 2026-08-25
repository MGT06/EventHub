import { useState } from "react";

import ThemeContext from "./themeContext";

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(false);
  const toggleTheme = () => setTheme((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
