import React, { useState } from 'react';
import Greeting from './Greeting';
import MyButton from './MyButton';

/*
  Hey! Welcome to the main App component!
  Idi mana application ki root (or starting point) anamata.
  Ikkada manam create chesina anni chinna chinna components ni assemble chestham.
*/
function App() {
  /*
    useState HOOK IN ACTION! ⚡️
    -----------------------------
    Ide asalaina magic. `useState` anedi oka hook.
    1. Manam `useState(0)` ani call cheste, React manaki rendu vishayalu isthundi:
       - `count`: Oka variable, deeni initial value 0. (current state)
       - `setCount`: Oka function, ee `count` variable ni update cheyyadaniki. (setter function)

    Manam `count` ni direct ga `count = 1` ani change cheyyakudadu. Eeppudu `setCount` function ne vadali.
    Appude React ki state maarindi ani telusthundi, and adi screen ni update chesthundi.
  */
  const [count, setCount] = useState(0);

  // Ee function button click chesinappudu call avuthundi.
  function handleIncrement() {
    setCount(count + 1); // count ni 1 penchuthunnam
  }

  function handleDecrement() {
    setCount(count - 1); // count ni 1 thaggisthunnam
  }

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
      {/* 1. Greeting Component ni use chesthunnam, prop pass chesthu */}
      <Greeting name="React Learner" />

      <p>Let's see the `useState` hook in action!</p>

      {/* 2. Current count ni display chesthunnam */}
      <h2>Current Count: {count}</h2>

      <div>
        {/* 3. MyButton Component ni use chesthunnam */}
        {/*    onClick prop ki manam create chesina function ni pass chesthunnam */}
        <MyButton onClick={handleIncrement}>
          Increment Cheyyi! ➕
        </MyButton>

        <MyButton onClick={handleDecrement}>
          Decrement Cheyyi! ➖
        </MyButton>
      </div>
    </div>
  );
}

export default App;