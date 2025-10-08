import React from 'react';

/**
 * Idi mana "heavy" component anukundam.
 *
 * Imagine deenilo chala logic, pedda pedda libraries (like a charting
 * library or a markdown parser), or chala child components unnayi.
 *
 * Ee component code antha initial page load tho paatu ravoddu anukuntunnam.
 * Anduke, manam deenini `React.lazy` tho load chestam.
 *
 * IMPORTANT: `React.lazy` tho pani cheyyali ante, ee component ni
 * `export default` cheyadam mandatory.
 */
function HeavyComponent() {
  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#e6f7ff',
        border: '2px solid #91d5ff',
        borderRadius: '8px',
        marginTop: '20px',
        color: '#333',
      }}
    >
      <h2>Hello from the Heavy Component! 🏋️‍♂️</h2>
      <p>
        Naa code antha separate file (chunk) lo undi. Nuvvu "Show" button
        click chesaka, naa code network nunchi download ayyi, appudu nenu
        kanipistunnanu.
      </p>
      <p>This is called <strong>code-splitting!</strong></p>
    </div>
  );
}

export default HeavyComponent;