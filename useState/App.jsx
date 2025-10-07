import React from 'react';
import CounterExample from './01-CounterExample';
import ContactListExample from './02-ContactListExample';
import SnapshotExample from './03-SnapshotExample';

/*
  Hey! Idi ee chapter ki main App component.
  Ikkada manam create chesina anni examples ni render cheddam
  to see all the core concepts of `useState`.
*/
export default function App() {
  const appStyle = {
    fontFamily: 'sans-serif',
    padding: '20px',
  };

  return (
    <div style={appStyle}>
      <h1>useState Demo</h1>
      <p>
        This page demonstrates the core concepts of the `useState` hook.
      </p>
      <hr />
      <CounterExample />
      <hr />
      <ContactListExample />
      <hr />
      <SnapshotExample />
    </div>
  );
}