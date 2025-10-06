import React from 'react';
import FocusInputExample from './01-FocusInputExample';
import StopwatchExample from './02-StopwatchExample';

/*
  Hey! Idi ee chapter ki main App component.
  Ikkada manam create chesina rendu examples ni render cheddam
  to see both use cases of `useRef`.
*/
export default function App() {
  const appStyle = {
    fontFamily: 'sans-serif',
    padding: '20px',
  };

  return (
    <div style={appStyle}>
      <h1>useRef Demo</h1>
      <p>
        This page demonstrates the two primary use cases for the `useRef` hook.
      </p>
      <hr />
      <FocusInputExample />
      <hr />
      <StopwatchExample />
    </div>
  );
}