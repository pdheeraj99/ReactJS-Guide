# The React Way: Textarea Value is a Prop, Not a Child! 🎁

Hey friend! Last chapter lo manam oka mystery tho aagam: "React lo `<textarea>` lopaala text enduku pettakudadu?" ani. The reason is simple but powerful: React wants to **control** the textarea's value using state.

### The Problem with HTML's Approach

HTML lo, `<textarea>Hello</textarea>` ante, aa "Hello" anedi aa component ki "uncontrolled" initial value. React ee "uncontrolled" nature ni ishtapadadu because it breaks the "UI is a function of state" model.

### The React Solution: Controlled `<textarea>`

React lo, `<textarea>` anedi self-closing tag laaga untundi (`<textarea />`). Daani content ni manam daani lopaala rayyam. Instead, manam daanini **`value` prop** dwara pass chestham.

This makes it a **controlled component**, just like `<input>` and `<select>`.

The process is identical:
1.  **`useState`:** Oka state variable create chesi, daanilo textarea యొక్క text content ni store cheyyali.
2.  **Pass to `<textarea>`:**
    *   Aa state variable ni `<textarea>` యొక్క `value` prop ki pass cheyyali.
    *   User type chesinappudu, aa state ni update cheyyadaniki `onChange` handler ni kuda ivvali.

```jsx
import { useState } from 'react';

function CommentForm() {
  // 1. State lo text ni store cheyyi
  const [comment, setComment] = useState('This is my first comment!');

  return (
    <textarea
      // 2. State nunchi value ni <textarea> ki ivvu
      value={comment}
      // 3. User type chesthe, state ni update cheyyi
      onChange={e => setComment(e.target.value)}
    />
  );
}
```

Ee pattern valla, mana `comment` state variable eh eppudu aa textarea ki **single source of truth** ga untundi. The UI will always show what's in the state.

```mermaid
graph TD
    A[React State: `useState("Initial Text")`] --> B["<textarea value={state}>"];
    B -- Renders textarea with "Initial Text" --> C(User sees the textarea);
    C -- User types "Hello" --> D["onChange event fires"];
    D -- `e.target.value` is "Hello" --> E["`setState('Hello')`"];
    E -- Triggers re-render --> A;

    style A fill:#d4edda
    style B fill:#e6f7ff
```

Chusara, entha clean ga undo! Manam direct ga DOM ni manipulate cheyyatledu. Manam state ni update chestunnam, and React is taking care of the rest. This is the fundamental concept of controlled inputs in React, and it applies perfectly to `<textarea>` as well.

Ippudu, ee "correct way" ni and "wrong way" (text as a child) ni side-by-side chusthu, code examples tho inka clear ga ardham cheskundam. Let's get to the code! 💻🚀