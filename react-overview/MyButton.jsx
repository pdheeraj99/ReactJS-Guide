import React from 'react';

/*
  Hey friend! Idi mana modati component.
  Deeni peru MyButton. Chusava, 'M' and 'B' capital unnai. Important rule!

  Ee component chala simple. Just oka button ni return chesthundi.
  Kani deeniki konni props (properties) pass chestham, so we can reuse it everywhere.
  - `onClick`: Button click cheste em cheyyali aney function.
  - `children`: Button madyalo em text chupinchali anedi.
*/
function MyButton({ onClick, children }) {
  return (
    <button onClick={onClick} style={{ margin: '10px' }}>
      {children}
    </button>
  );
}

export default MyButton;