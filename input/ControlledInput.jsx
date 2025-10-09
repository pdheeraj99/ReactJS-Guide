import React, { useState } from 'react';

/**
 * Idi "Controlled" Input pattern ki example.
 *
 * 1. Manam `useState` tho `value` ni oka state variable lo store chestunnam.
 *    Ee state eh "single source of truth".
 * 2. `<input>` yokka `value` prop eppudu ee state ki sync ayi untundi.
 * 3. User type chesinappudalla, `onChange` handler trigger ayyi,
 *    `event.target.value` tho mana state ni update chesthundi.
 *
 * Data flow: User types -> `onChange` -> `useState` -> Re-render -> `value` prop updates input.
 */
export default function ControlledInput() {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="input-box controlled">
      <h3>Controlled Input (The React Way)</h3>
      <p>
        Ee input value anedi React state lo store avuthundi. Prathi keystroke ki
        state update avuthundi.
      </p>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Type here..."
      />
      <p className="current-value">Current State Value: <strong>{value}</strong></p>
    </div>
  );
}