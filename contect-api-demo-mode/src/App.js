// App.js
import React, { createContext, useState, useContext } from "react";
import "./App.css";

// 1. Create Context
const ThemeContext = createContext();

// 2. Create a Provider Component
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Create a custom hook (optional but clean)
const useTheme = () => useContext(ThemeContext);

// 4. Component that consumes context
const ThemedBox = () => {
  const { theme } = useTheme();

  const style = {
    padding: "20px",
    marginTop: "20px",
    textAlign: "center",
    backgroundColor: theme === "light" ? "#f0f0f0" : "#333",
    color: theme === "light" ? "#333" : "#f0f0f0",
    borderRadius: "8px",
  };

  return <div style={style}>Current Theme: {theme.toUpperCase()}</div>;
};

// 5. Toggle Button Component
const ThemeToggleButton = () => {
  const { toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Toggle Theme</button>;
};

// 6. App Component
export default function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <h1>React Context API Example</h1>
        <ThemeToggleButton />
        <ThemedBox />
      </div>
    </ThemeProvider>
  );
}
