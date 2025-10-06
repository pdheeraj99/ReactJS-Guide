import React from 'react';
import EmailField from './EmailField';
import ContactForm from './ContactForm';

/*
  Hey! Idi ee example ki main App component.
  Deeni pani okkate: mana components ni render cheyyadam.

  Manam `EmailField` and `ContactForm` ni rendu sarlu render chesthunnam.
  Browser's DevTools lo inspect cheste, nuvvu chudochu prathi
  input ki oka unique ID undi ani, even though they come from the
  same component.

  This is the power of `useId`! It guarantees unique IDs that don't clash.
*/
function App() {
  const appStyle = {
    fontFamily: 'sans-serif',
    padding: '20px',
  };

  return (
    <div style={appStyle}>
      <h1>useId Demo</h1>
      <p>
        This page renders the same components multiple times. Inspect the
        elements to see that `useId` generates a unique ID for each one,
        preventing clashes.
      </p>
      <hr />
      <EmailField />
      <ContactForm />
      <hr />
      <h2>Another Section</h2>
      <EmailField />
      <ContactForm />
    </div>
  );
}

export default App;