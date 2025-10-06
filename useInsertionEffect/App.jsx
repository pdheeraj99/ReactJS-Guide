import React, { useState } from 'react';
import { useMyStyles } from './useMyStyles';

/*
  Hey! Idi ee example ki main App component.
  Ikkada manam mana custom `useMyStyles` hook ni use chesi,
  dynamic ga styles ni create cheddam.
*/

function MyButton({ children }) {
  // Manam `useMyStyles` hook ni call chesi, oka CSS rule isthunnam.
  // Adi manaki `my-button` aney className ni return chesthundi.
  // Background lo, `useInsertionEffect` aa style tag ni inject chesthundi.
  const className = useMyStyles('my-button', `
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  `);

  return <button className={className}>{children}</button>;
}

function MyDangerousButton({ children }) {
  const className = useMyStyles('my-dangerous-button', `
    background-color: #e74c3c;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  `);

  return <button className={className}>{children}</button>;
}

export default function App() {
  const [showDangerous, setShowDangerous] = useState(false);

  const appStyle = {
    fontFamily: 'sans-serif',
    padding: '20px',
  };

  return (
    <div style={appStyle}>
      <h1>useInsertionEffect Demo (Conceptual)</h1>
      <p>
        This example simulates how a CSS-in-JS library works.
      </p>
      <hr/>
      <h3>How to see `useInsertionEffect` in action:</h3>
      <ol style={{ textAlign: 'left', display: 'inline-block' }}>
        <li>Open your browser's developer tools (usually F12).</li>
        <li>Go to the "Elements" tab.</li>
        <li>Find the `<head>` tag and expand it.</li>
        <li>
          Initially, you'll see a `<style>` tag for `.my-button`.
        </li>
        <li>
          Click the "Show Dangerous Button" button below.
        </li>
        <li>
          Notice a **new** `<style>` tag for `.my-dangerous-button` appears
          in the `<head>` instantly.
        </li>
      </ol>
      <p>
        That style tag was injected by `useInsertionEffect` before React
        updated the DOM to show the red button, preventing any flicker.
      </p>
      <hr/>

      <MyButton>I am a normal button</MyButton>

      <br/><br/>

      <button onClick={() => setShowDangerous(s => !s)}>
        {showDangerous ? 'Hide' : 'Show'} Dangerous Button
      </button>

      <br/><br/>

      {showDangerous && <MyDangerousButton>I am a dangerous button</MyDangerousButton>}
    </div>
  );
}