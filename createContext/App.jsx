import { useState } from 'react';
import { ThemeContext } from './ThemeContext';
import Toolbar from './Toolbar';
import './styles.css';

export default function App() {
  // Manam ikkada 'theme' ni oka state lo manage chestunnam.
  // Ee state ni update cheste, context value kuda update avuthundi.
  const [theme, setTheme] = useState('dark');

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    // 1. PROVIDER in ACTION:
    // Manam `ThemeContext.Provider` tho mana component tree ni wrap chestunnam.
    <ThemeContext.Provider value={theme}>
      <div className={`app-container ${theme}`}>
        <h1>`createContext` Demo 🏭</h1>
        <p>
          The `Provider` component is wrapping everything below. It's providing
          the current theme (`{theme}`) to all its children.
        </p>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <hr />
        {/*
          Toolbar component ki manam `theme` ni prop la pass cheyyatledu.
          Kani daani loni buttons ki context valla theme value telustundi.
        */}
        <Toolbar />
      </div>
    </ThemeContext.Provider>
  );
}