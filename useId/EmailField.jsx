import React, { useId } from 'react';

/*
  Example 1: Basic Usage of useId

  Ee component lo, manam `useId` ni call chesi, oka unique ID ni
  generate chesi, daanini `<label>` and `<input>` ki istham.
*/
function EmailField() {
  // Call useId at the top level to get a unique ID.
  const id = useId();

  return (
    <div style={{ margin: '10px 0' }}>
      {/* Use the ID for the `htmlFor` attribute in the label. */}
      <label htmlFor={id}>Email: </label>

      {/* Use the same ID for the `id` attribute in the input. */}
      <input id={id} type="email" />
    </div>
  );
}

export default EmailField;