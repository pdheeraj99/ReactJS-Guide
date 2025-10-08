import { useState } from 'react';

/**
 * Idi oka simple component, deenilo oka state variable (`text`) undi.
 * Ee component ni `<Activity>` tho hide chesinappudu, `text` state
 * reset avvadu. User type chesina message alane untundi.
 *
 * Traditional conditional rendering lo aite, ee component unmount
 * aipoyi, state antha poyedi.
 */
export default function UserProfile() {
  const [text, setText] = useState('');

  return (
    <div className="tab-content">
      <h3>Profile Tab</h3>
      <p>
        Ee text area lo edaina type cheyyandi, tarvata "Prerendered" tab ki
        velli, malli ikkadiki randi. Mee text alane untundi!
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something here..."
        rows="4"
        style={{ width: '95%', padding: '10px' }}
      />
      <p>Your draft: {text}</p>
    </div>
  );
}