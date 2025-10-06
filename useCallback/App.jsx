import React from 'react';
import ParentComponent from './ParentComponent';

/*
  Hey! Idi ee example ki main App component.
  Deeni pani okkate: mana ParentComponent ni render cheyyadam,
  so manam useCallback demonstration ni chudochu.
*/
function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>useCallback Demo</h1>
      <ParentComponent />
    </div>
  );
}

export default App;