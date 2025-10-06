import React, { useState, useDeferredValue } from 'react';
import SlowList from './SlowList.jsx';

/*
  Hey! Idi mana main App component.
  Ikkada manam useDeferredValue యొక్క magic ni chustham.
*/
function App() {
  // 1. Input field kosam oka state. Idi eppudu fast ga undali.
  const [text, setText] = useState('');

  // 2. `useDeferredValue` ni call chesthunnam.
  //    `deferredText` anedi `text` యొక్క "low-priority" version.
  //    Idi konchem "lag" avuthundi.
  const deferredText = useDeferredValue(text);

  // 3. `isStale` flag ni create cheddam.
  //    Input text and deferred text veru veru ga unte, ante list
  //    pata data ni chupisthundi ani ardham.
  const isStale = text !== deferredText;

  const appStyle = {
    fontFamily: 'sans-serif',
    padding: '20px',
  };

  return (
    <div style={appStyle}>
      <h1>useDeferredValue Demo</h1>
      <p>
        Type into the input. Even though the list below is very slow to
        render, the input field will feel fast and responsive.
      </p>
      <p>
        Notice how the list dims slightly while it's updating in the
        background.
      </p>

      {/* The input field is controlled by the high-priority `text` state */}
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Search for an item..."
        style={{ fontSize: '1.2em', width: '100%', boxSizing: 'border-box' }}
      />

      <hr />

      {/* The SlowList is controlled by the low-priority `deferredText` */}
      {/* `isStale` flag tho manam opacity ni set chesthunnam */}
      <div style={{ opacity: isStale ? 0.6 : 1 }}>
        <SlowList text={deferredText} />
      </div>
    </div>
  );
}

export default App;