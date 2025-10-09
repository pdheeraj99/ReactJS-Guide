import React, { useState, useRef } from 'react';
import { flushSync } from 'react-dom';

let nextId = 0;

// Example 1: Demonstrating the problem WITHOUT flushSync
function ChatWithoutFlushSync() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const listRef = useRef(null);

  const handleSend = () => {
    if (text.trim() === '') return;
    const newId = `message-${nextId++}`;
    const newMessage = { id: newId, text: text };

    // 1. Update the state
    setMessages([...messages, newMessage]);
    setText('');

    // 2. Try to scroll to the new message
    // 🔴 PROBLEM: React has not updated the DOM yet!
    // The `setMessages` call is batched. This code runs *before* the new
    // message is rendered. So, `getElementById` will return null.
    const newMessageNode = document.getElementById(newId);
    if (newMessageNode) {
      newMessageNode.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error(`[Without flushSync]: Could not find element with id ${newId} to scroll to.`);
    }
  };

  return (
    <div style={{ border: '2px solid #ffcccc', padding: '10px', borderRadius: '5px', backgroundColor: '#fff0f0' }}>
      <h3>Troubleshooting: Scrolling without `flushSync` ❌</h3>
      <p>When you send a message, we try to scroll to it immediately. Check the console to see the error. The scroll fails because the DOM has not updated yet.</p>
      <div ref={listRef} style={{ height: '150px', overflowY: 'scroll', border: '1px solid #ccc', marginBottom: '10px', padding: '5px' }}>
        {messages.map(msg => <p key={msg.id} id={msg.id}>{msg.text}</p>)}
      </div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleSend} style={{ marginLeft: '5px' }}>Send</button>
    </div>
  );
}

// Example 2: Solving the problem WITH flushSync
function ChatWithFlushSync() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const listRef = useRef(null);

  const handleSend = () => {
    if (text.trim() === '') return;
    const newId = `message-${nextId++}`;
    const newMessage = { id: newId, text: text };

    // 1. Wrap the state update in flushSync
    // ✅ SOLUTION: `flushSync` forces React to update the DOM immediately.
    flushSync(() => {
      setMessages([...messages, newMessage]);
    });
    setText('');

    // 2. Now, scroll to the new message
    // By the time this line runs, the new message is guaranteed to be in the DOM.
    const newMessageNode = document.getElementById(newId);
    if (newMessageNode) {
      newMessageNode.scrollIntoView({ behavior: 'smooth' });
      console.log(`[With flushSync]: Successfully found element ${newId} and scrolled to it.`);
    }
  };

  return (
    <div style={{ border: '2px solid #d4edda', padding: '10px', borderRadius: '5px', backgroundColor: '#f0fff0' }}>
      <h3>Usage: Scrolling with `flushSync` ✅</h3>
      <p>When you send a message, we wrap the state update in `flushSync`. The scroll now works perfectly because the DOM is updated synchronously.</p>
      <div ref={listRef} style={{ height: '150px', overflowY: 'scroll', border: '1px solid #ccc', marginBottom: '10px', padding: '5px' }}>
        {messages.map(msg => <p key={msg.id} id={msg.id}>{msg.text}</p>)}
      </div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleSend} style={{ marginLeft: '5px' }}>Send</button>
    </div>
  );
}


export default function FlushSyncExamples() {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    fontFamily: 'sans-serif',
  };

  return (
    <div style={containerStyles}>
      <h1>`flushSync` Examples</h1>
      <p>This example clearly shows a situation where `flushSync` is necessary.</p>
      <ChatWithoutFlushSync />
      <ChatWithFlushSync />
    </div>
  );
}