import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext.js';

/*
  Hey! Idi mana Button component.
  Idi component tree lo chala deep ga undi.
  Kani deeniki `theme` value kavali.

  Step 3: Context ni Consume Cheyyadam (`useContext`)
  --------------------------------------------------
  Manam `useContext` hook ki `ThemeContext` object ni pass chesthe,
  adi manaకోసం tree antha vethiki, daggara lo unna Provider
  యొక్క `value` ni theeskuni manaki isthundi.

  No props needed!
*/
function Button({ children }) {
  const theme = useContext(ThemeContext);

  const styles = {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    margin: '5px',
    backgroundColor: theme === 'light' ? '#eee' : '#555',
    color: theme === 'light' ? '#000' : '#fff',
  };

  return <button style={styles}>{children}</button>;
}

export default Button;