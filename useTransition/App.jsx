import React, { useState, useTransition } from 'react';
import SlowTab from './SlowTab.jsx';

/*
  Hey! Idi ee example ki main App component.
  Ikkada manam `useTransition` ni use chesi, slow tab switching ni
  smooth ga ela cheyyalo chuddam.
*/

function TabButton({ children, isActive, onClick, disabled }) {
  const buttonStyle = {
    padding: '10px 20px',
    marginRight: '10px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: isActive ? '#007bff' : '#eee',
    color: isActive ? 'white' : 'black',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };
  return (
    <button style={buttonStyle} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function AboutTab() {
  return <p>This is the About tab. It is fast!</p>;
}

function ContactTab() {
  return <p>This is the Contact tab. It is also fast!</p>;
}

export default function App() {
  // 1. Call useTransition
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('about');

  function selectTab(nextTab) {
    // 2. Wrap the state update in `startTransition`
    //    Idi React ki chepthundi: "Ee state update valla vache
    //    re-render slow ga undochu, so UI ni block cheyyaku."
    startTransition(() => {
      setTab(nextTab);
    });
  }

  const appStyle = {
    fontFamily: 'sans-serif',
    padding: '20px',
  };

  return (
    <div style={appStyle}>
      <h1>useTransition Demo</h1>
      <p>
        Click "Posts (Slow)". Notice the UI does not freeze. The tab button
        updates immediately, and a "Loading..." message appears while the
        slow content loads in the background.
      </p>
      <hr />

      <TabButton
        isActive={tab === 'about'}
        onClick={() => selectTab('about')}
        disabled={isPending}
      >
        About
      </TabButton>
      <TabButton
        isActive={tab === 'posts'}
        onClick={() => selectTab('posts')}
        disabled={isPending}
      >
        Posts (Slow)
      </TabButton>
      <TabButton
        isActive={tab === 'contact'}
        onClick={() => selectTab('contact')}
        disabled={isPending}
      >
        Contact
      </TabButton>

      <hr />

      {/* 3. Use `isPending` to show a loading indicator */}
      <div style={{ opacity: isPending ? 0.7 : 1 }}>
        {isPending && <p>🌀 Loading slow content...</p>}
        {tab === 'about' && <AboutTab />}
        {tab === 'posts' && <SlowTab />}
        {tab === 'contact' && <ContactTab />}
      </div>
    </div>
  );
}