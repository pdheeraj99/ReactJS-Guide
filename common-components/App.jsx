import React, { useState } from 'react';
import StyledDiv from './StyledDiv';
import EventLogger from './EventLogger';
import './styles.css';

export default function App() {
  // Dynamic style object kosam oka state
  const [boxSize, setBoxSize] = useState(200);

  const dynamicStyles = {
    width: `${boxSize}px`,
    height: `${boxSize}px`,
    border: '2px solid #61dafb',
    backgroundColor: '#20232a',
    color: '#fff',
    transition: 'width 0.3s, height 0.3s',
  };

  return (
    <div className="app-container">
      <h1>Common Components Demo 🧱</h1>
      <p>
        React lo common HTML elements, props, styles, and events ela pani
        chesthayo ee example chupisthundi.
      </p>
      <hr />

      {/* --- Example 1: `className` and `style` props --- */}
      <div className="demo-box">
        <h3>1. `className` and `style` Props</h3>
        <p>
          Ikkada manam `StyledDiv` component ki `className` and oka dynamic `style`
          object ni pass chestunnam.
        </p>
        <button onClick={() => setBoxSize(boxSize + 20)}>Make Box Bigger</button>
        <StyledDiv className="custom-class" style={dynamicStyles}>
          <p>I am a styled div!</p>
          <p>My size is {boxSize}px.</p>
        </StyledDiv>
      </div>

      <hr />

      {/* --- Example 2: Event Handling --- */}
      <div className="demo-box">
        <h3>2. Handling Events</h3>
        <p>
          Ee kindi component lo, `onClick`, `onChange`, and `onMouseEnter` lanti
          events ni handle chestunnam.
        </p>
        <EventLogger />
      </div>
    </div>
  );
}