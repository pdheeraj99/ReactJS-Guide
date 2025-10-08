import React, { useState, useMemo } from 'react';
import RegularChild from './RegularChild';
import MemoizedChild from './MemoizedChild';
import CustomMemoizedChild from './CustomMemoizedChild';
import './styles.css';

export default function App() {
  // A state that is NOT passed to children. Changing it shows which children re-render unnecessarily.
  const [count, setCount] = useState(0);

  // A state that IS passed to children as a prop.
  const [user, setUser] = useState({ id: 1, name: 'Mawa' });

  console.log('--------------------------------');
  console.log('🚀 PARENT APP is rendering...');
  console.log('--------------------------------');

  // ✅ BEST PRACTICE: When passing an object as a prop to a memoized component,
  // you MUST memoize the object itself with `useMemo`.
  // Leka pothe, prathi render lo oka kottha object create avuthundi,
  // and `memo` shallow comparison fail avuthundi.
  const memoizedUser = useMemo(() => user, [user]);

  const changeUserNameOnly = () => {
    // Ee update valla, user object reference maruthundi, kani user.id maaradu.
    setUser((u) => ({ ...u, name: `Mawa ${Math.random().toFixed(2)}` }));
  };

  const changeUser = () => {
    // Ee update valla, user.id and user.name, rendu maruthayi.
    setUser({ id: Math.random(), name: `Not Mawa Anymore` });
  };

  return (
    <div className="app-container">
      <h1>`React.memo` Demo 🧠</h1>

      <div className="controls">
        <h3>Parent Controls</h3>
        <p>Open the console to see the render logs!</p>
        <button onClick={() => setCount((c) => c + 1)}>
          Re-render Parent (Current Count: {count})
        </button>
        <button onClick={changeUserNameOnly}>Change User Name Only</button>
        <button onClick={changeUser}>Change User (and ID)</button>
      </div>

      <div className="children-container">
        {/*
          Ee component ki `memo` ledu, so parent eppudu re-render ayina,
          idi kuda re-render avuthundi.
        */}
        <RegularChild user={memoizedUser} />

        {/*
          Ee component ki `memo` undi. Parent counter marithe idi re-render avvadu.
          Kani `user` object (name or id) marithe, re-render avuthundi.
        */}
        <MemoizedChild user={memoizedUser} />

        {/*
          Ee component ki `memo` and custom comparison function undi.
          Adi kevalam `user.id` marithe ne re-render avuthundi.
          User name marithe re-render avvadu!
        */}
        <CustomMemoizedChild user={memoizedUser} />
      </div>
    </div>
  );
}