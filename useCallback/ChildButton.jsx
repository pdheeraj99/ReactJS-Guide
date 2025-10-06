import React from 'react';

/*
  Hey! Idi mana Child Button component.
  Deenilo rendu important vishayalu unnayi:

  1. `React.memo()`: Ee component ni manam `React.memo` tho wrap chesam.
     Ante, ee component ki pass ayye props (e.g., `onClick` function)
     maarithe thappa, idi re-render avvadu.

  2. `console.log()`: Ee line manaki ee component eppudu re-render
     avuthundo chepthundi. Manam ee message ni console lo chusi,
     mana optimization pani chesthundo ledo telusukuntam.
*/
const ChildButton = React.memo(({ onClick, children }) => {
  console.log(`!!! ChildButton (${children}) is re-rendering !!!`);

  return (
    <button onClick={onClick} style={{ margin: '5px' }}>
      {children}
    </button>
  );
});

export default ChildButton;