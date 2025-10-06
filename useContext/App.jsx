import React, { useState } from 'react';
import { ThemeContext } from './ThemeContext.js';
import Panel from './Panel.jsx';

/*
  Hey! Idi mana main App component. Idi mana Context Provider ga
  pani chesthundi.
*/
function App() {
  // Ee component lo manam theme state ni maintain chesthunnam.
  const [theme, setTheme] = useState('light');

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  const appStyle = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: theme === 'light' ? '#fff' : '#121212',
    color: theme === 'light' ? '#000' : '#fff',
    minHeight: '100vh',
  };

  return (
    // Step 2: Context ni Provide Cheyyadam
    // ------------------------------------
    // Manam `ThemeContext.Provider` tho mana component tree ni wrap chesthunnam.
    // `value` prop ki manam `theme` state ni pass chesthunnam.
    // Ippudu, ee Provider lopaala unna ఏ component అయినా, entha deep ga
    // unna, `useContext` tho ee `theme` value ni access cheyyagaladu.
    <ThemeContext.Provider value={theme}>
      <div style={appStyle}>
        <h1>useContext Demo</h1>
        <p>Click the button below to toggle the theme.</p>
        <button onClick={toggleTheme}>Toggle Theme</button>

        <Panel title="User Login" />
        <Panel title="Settings" />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;