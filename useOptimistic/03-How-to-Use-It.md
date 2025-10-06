# `useOptimistic` ni Ela Vadali? (The Syntax) 🤓

Okay, "optimistic update" aney concept ardham ayyindi. Ippudu daanini code lo ela implement cheyyalo chuddam.

## The Basic Syntax

`useOptimistic` hook ni call chesetappudu, manam daaniki rendu arguments pass cheyyali:

1.  **`state`:** Idi mana "real" state. Ante, server tho sync ayyi, confirm aina data (e.g., `messages` array).
2.  **`updateFn`:** Idi oka function. Manam optimistic update add chesinappudu, ee function run avuthundi. Idi kotha optimistic state ni ela create cheyyalo define chesthundi.

`useOptimistic` manaki oka array lo rendu values ni return chesthundi:

`const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);`

Let's break down each part.

### The Return Values

1.  **`optimisticState`:**
    *   Idi manam UI lo render cheyyalsina value.
    *   Normal ga, background action em run avvanappudu, `optimisticState` anedi `state` (mana real state) ki equal ga untundi.
    *   Kani, manam oka optimistic update add cheyagane, `optimisticState` anedi mana `updateFn` return chesina temporary value ki maruthundi.

2.  **`addOptimistic(optimisticValue)`:**
    *   Idi oka special function. Manam oka action start cheyyadaniki mundu, ee function ni call cheyyali.
    *   Manam deeniki pass chese `optimisticValue` (e.g., kotha message text) anedi mana `updateFn` ki second argument ga velthundi.

### The `updateFn` Function

Idi ee hook lo atni kante important part. Ee function, "Real state ki, kotha optimistic value kalipi, temporary ga chupinchalsina kotha state ni ela create cheyyali?" ani chepthundi.

` (currentState, optimisticValue) => { ... return newState; } `

*   **`currentState`:** Idi `state` (mana real state) యొక్క current value.
*   **`optimisticValue`:** Idi manam `addOptimistic` function ki pass chesina value.
*   **Return value:** Ee function return chese value ne kotha `optimisticState` avuthundi.

**Example:** Mana chat app lo, `updateFn` ila untundi:

```javascript
// updateFn
(currentMessages, newMessageText) => {
  // Create a temporary new message object
  const newMessage = {
    text: newMessageText,
    sending: true // Temporary ga "sending" state chupinchadaniki
  };

  // Return a new array with the new message at the top
  return [newMessage, ...currentMessages];
}
```

## The Full Flow in Code

```jsx
function MessageThread({ realMessages, sendMessageToServer }) {
  // 1. Call useOptimistic
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    realMessages,
    (currentMessages, newMessageText) => {
      // updateFn: Defines how to create the temporary state
      const newMessage = { text: newMessageText, sending: true };
      return [newMessage, ...currentMessages];
    }
  );

  async function formAction(formData) {
    const messageText = formData.get("message");

    // 2. Call addOptimistic immediately
    addOptimisticMessage(messageText);

    // 3. Start the real async action in the background
    await sendMessageToServer(messageText);
  }

  return (
    <form action={formAction}>
      <input type="text" name="message" />
      <button type="submit">Send</button>
      {/* 4. Render the optimisticState, not the real state */}
      {optimisticMessages.map((msg, i) => (
        <div key={i}>
          {msg.text} {msg.sending && <small>(Sending...)</small>}
        </div>
      ))}
    </form>
  );
}
```

Anthe! Ee setup tho, user "Send" click cheyagane, `addOptimisticMessage` call avuthundi, `updateFn` run avuthundi, and `optimisticMessages` ventane update ayyi, UI lo kotha message kanipisthundi.

Kani... asalu network request fail aithe? Appudu React aa temporary message ni ela theesesthundi? That's the final piece of the magic. Let's see that next! 🤔➡️