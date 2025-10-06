import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext.js';
import Button from './Button.jsx';

/*
  Hey! Idi Panel component. Idi kuda context ni consume chesthundi
  daani style kosam.

  Idi `Button` component ni render chesthundi, kani daaniki `theme`
  prop em pass cheyyadu. `Button` daaniki ade context nunchi theeskuntundi.
*/
function Panel({ title }) {
  const theme = useContext(ThemeContext);

  const styles = {
    padding: '20px',
    border: `1px solid ${theme === 'light' ? '#ccc' : '#888'}`,
    borderRadius: '8px',
    backgroundColor: theme === 'light' ? '#fff' : '#333',
    color: theme === 'light' ? '#333' : '#fff',
    margin: '10px 0',
  };

  return (
    <section style={styles}>
      <h3>{title}</h3>
      <Button>Sign Up</Button>
      <Button>Log In</Button>
    </section>
  );
}

export default Panel;