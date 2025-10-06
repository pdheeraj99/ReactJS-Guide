import React, { useOptimistic, useState, useRef } from 'react';
import { sendMessage } from './api.js';

/*
  Hey! Idi ee example ki main file. Ikkada manam `useOptimistic`
  magic ni chuddam.
*/

// --- The Message Component ---
// Idi oka simple message ni and daani sending status ni chupisthundi.
function Message({ text, isSending }) {
  const messageStyle = {
    padding: '8px 12px',
    borderRadius: '18px',
    backgroundColor: isSending ? '#ccc' : '#007bff',
    color: isSending ? '#555' : 'white',
    alignSelf: 'flex-start',
    maxWidth: '70%',
    marginBottom: '10px',
  };

  return (
    <div style={messageStyle}>
      {text}
      {isSending && <small> (Sending...)</small>}
    </div>
  );
}


// --- The Main Thread Component ---
function MessageThread() {
  // 1. `messages` anedi mana "real" state. Idi server tho sync ayyi untundi.
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey, how are you?' },
  ]);

  // 2. `useOptimistic` ni call cheddam.
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    // updateFn: Real state ki, kotha optimistic value ni kalipi,
    // temporary ga chupinchalsina kotha state ni ela create cheyyalo chepthundi.
    (currentState, newMessageText) => [
      ...currentState,
      {
        id: Math.random(), // Temporary ID
        text: newMessageText,
        isSending: true, // Optimistic state lo "sending" untundi
      },
    ]
  );

  const formRef = useRef(null);

  async function formAction(formData) {
    const messageText = formData.get('message');
    if (!messageText) return;

    formRef.current.reset(); // Reset the form input field

    // 3. Ventane optimistic update ni add cheyyi.
    //    UI ventane update avuthundi.
    addOptimisticMessage(messageText);

    try {
      // 4. Background lo asalu network request ni pampu.
      const sentMessage = await sendMessage(messageText);

      // 5. Success aithe, "real" state ni update cheyyi.
      //    React optimistic update ni a real update tho replace chesthundi.
      setMessages(currentMessages => [...currentMessages, sentMessage]);

    } catch (error) {
      // 6. Fail aithe, manam em cheyyakkarledu!
      //    `setMessages` call avvaledu kabatti, React automatic ga
      //    optimistic update ni revert chesesthundi. Magic! ✨
      console.error(error);
      alert(error.message); // Show error to the user
    }
  }

  return (
    <div className="app-container">
      <h1>useOptimistic Demo</h1>
      <p>
        Type a message and click "Send". The message will appear in the list
        instantly with a "(Sending...)" label. The background action has a 30%
        chance to fail.
      </p>
      <hr />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Manam eppudu `optimisticMessages` ni render cheyyali */}
        {optimisticMessages.map(msg => (
          <Message key={msg.id} text={msg.text} isSending={msg.isSending} />
        ))}
      </div>
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default MessageThread;