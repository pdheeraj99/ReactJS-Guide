import React, { useRef } from 'react';

/**
 * Idi "Uncontrolled" Input pattern ki example.
 *
 * 1. Manam `useState` vadatledu. Instead, `useRef` tho input DOM element ki
 *    oka direct reference create chestunnam.
 * 2. Input ki `value` prop ivvatledu. Initial value kosam `defaultValue` vadutunnam.
 *    The DOM is now in control of the input's state.
 * 3. Manaki value kavali anukunnappudu (e.g., button click), manam
 *    `inputRef.current.value` tho DOM nunchi direct ga read chestam.
 *
 * Data flow: User types -> DOM updates itself. React doesn't know or care until we ask.
 */
export default function UncontrolledInput() {
  const inputRef = useRef(null);

  const showValue = () => {
    // Read the value directly from the DOM node via the ref
    alert(`Reading from DOM: ${inputRef.current.value}`);
  };

  return (
    <div className="input-box uncontrolled">
      <h3>Uncontrolled Input (The DOM Way)</h3>
      <p>
        Ee input value ni DOM eh manage chesthundi. React ki madyalo em
        jarugutundo teliyadu. Manam button click chesinappudu matrame value ni
        read chestam.
      </p>
      <input
        type="text"
        ref={inputRef}
        defaultValue="Initial value"
        placeholder="Type here..."
      />
      <button onClick={showValue}>Get Current Value</button>
    </div>
  );
}