import React from 'react';

/**
 * Ee component React lo events ni ela handle cheyalo chupisthundi.
 */
export default function EventLogger() {
  // 1. `onClick` handler for the button
  const handleButtonClick = (event) => {
    // `event` anedi React synthetic event object
    console.log('Button was clicked!', event);
    alert('Button was clicked! Check the console for the event object.');
  };

  // 2. `onChange` handler for the input field
  const handleInputChange = (event) => {
    // `event.target.value` tho manam input loni current text ni teeskogalam
    console.log(`Input value changed to: ${event.target.value}`);
  };

  // 3. `onMouseEnter` handler for the div
  const handleMouseEnter = () => {
    console.log('Mouse entered the div area!');
  };

  return (
    <div
      className="event-logger"
      // 4. Event handlers ni camelCase props ga pass chestunnam
      onMouseEnter={handleMouseEnter}
    >
      <h3>Event Logger</h3>
      <p>Interact with the elements below and check the console!</p>

      {/* Manam `handleClick` function ni `onClick` prop ki pass chestunnam */}
      <button onClick={handleButtonClick}>Click Me</button>

      <input
        onChange={handleInputChange}
        placeholder="Type something here..."
      />
    </div>
  );
}