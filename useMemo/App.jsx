import React, { useState } from 'react';
import TodoList from './TodoList.jsx';
import { initialTodos } from './utils.js';

/*
  Hey! Idi ee example ki main App component.
  Ikkada manam state ni manage chesi, `TodoList` component ki
  props ni pass cheddam.
*/
export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [tab, setTab] = useState('all');
  const [theme, setTheme] = useState('light');

  function handleTabChange(newTab) {
    setTab(newTab);
  }

  function handleThemeChange() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  const appStyle = {
    fontFamily: 'sans-serif',
    padding: '20px',
    backgroundColor: theme === 'light' ? '#f0f0f0' : '#121212',
    color: theme === 'light' ? '#121212' : '#f0f0f0',
    minHeight: '100vh',
  };

  return (
    <div style={appStyle}>
      <h1>useMemo Demo</h1>
      <p>
        <b>Instructions:</b> Open the console.
      </p>
      <ol>
        <li>
          Click "Toggle Theme". The UI updates instantly because `useMemo`
          prevents the slow filtering logic from running again.
        </li>
        <li>
          Click "Show Active" or "Show Completed". There will be a 500ms delay
          because the `tab` dependency has changed, forcing the expensive
          calculation to re-run. This is expected!
        </li>
      </ol>
      <hr />

      <button onClick={() => handleTabChange('all')}>All</button>
      <button onClick={() => handleTabChange('active')} style={{ margin: '0 10px' }}>Active</button>
      <button onClick={() => handleTabChange('completed')}>Completed</button>
      <button onClick={handleThemeChange} style={{ marginLeft: '20px' }}>
        Toggle Theme
      </button>

      <TodoList todos={todos} tab={tab} theme={theme} />
    </div>
  );
}