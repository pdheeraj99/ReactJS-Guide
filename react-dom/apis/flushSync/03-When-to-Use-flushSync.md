# When to Use `flushSync`: The Rare Exceptions 🧐

Hey mawa! Manam `flushSync` anedi "last resort" ani cheppukunnam. Mari aa "last resort" situations enti? Ekkada deenini vadali?

The simple answer is:
> **You need `flushSync` when you are integrating with a non-React system (like a browser API or a third-party library) that needs to read from the DOM *immediately* after your state update.**

React lopaala, manam eppudu DOM ni direct ga read cheyyalsina avasaram undadu. Kani bayata prapanchaniki (external systems) ee rule teliyadu.

### The Most Common Use Case: Scrolling to a New Element

Idi `flushSync` ki perfect example. Imagine oka chat app. Nuvvu kottha message pampagane, aa chat window automatic ga kindaki scroll avvali.

The logic is:
1.  Add the new message to the state (`setMessages(...)`).
2.  Find the new message element in the DOM.
3.  Call `element.scrollIntoView()`.

**The Problem:** React's batching valla, step 1 tarvata, code ventane step 2 ki velthundi. Kani appatiki, aa kottha message inka DOM lo render avvaledu! So, `document.getElementById(...)` anedi `null` return chesthundi, and mana code crash avuthundi.

**The `flushSync` Solution:**
Manam `setMessages(...)` ni `flushSync` lo wrap chesthe, React aa update ni ventane DOM ki apply chesthundi. Appudu, mana next line of code (step 2) execute ayye time ki, aa element DOM lo ready ga untundi.

```jsx
flushSync(() => {
  setMessages([...messages, newMessage]);
});
// Now, the new message is guaranteed to be in the DOM.
const lastMessage = document.getElementById(newMessage.id);
lastMessage.scrollIntoView({ behavior: 'smooth' });
```

### Other Examples:
*   **Browser `onbeforeprint` event:** User print button click chesinappudu, manam page lo konni print-specific styles or layouts apply cheyyali. Ee changes antha print dialog open ayye *mundu* jaragali. `flushSync` ee guarantee isthundi.
*   **Third-party DOM libraries:** Meeru jQuery plugin or a D3.js chart lanti non-React library tho pani chestunnappudu, adi "Hey, ee div size entha?" ani adagochu. Meeru state update chesina ventane, aa library ki correct size teliyali ante, `flushSync` avasaram avuthundi.

So, the rule is simple: **Does some *other* code need to read the DOM right now?** If yes, `flushSync` might be your answer. If not, you definitely don't need it.

Ippudu, ee scrolling example ni manam code lo chuddam. `flushSync` lekapothe emavuthundi, unte emavuthundo side-by-side chusthe, concept 100% clear aipothundi! Let's get to the code! 💻🚀