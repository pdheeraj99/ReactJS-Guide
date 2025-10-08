# `<Activity>` ni Ela Use Cheyali? 🛠️

Mana state-saving superhero, `<Activity>` ni use cheyadam chala simple. Idi kevalam oka prop ni aagam chesthundi: `mode`.

## The `mode` Prop

Ee `mode` prop ki rendu possible values untayi:
1.  `'visible'` (default): Component kanipisthundi.
2.  `'hidden'`: Component kanipinchadu (kani daani state safe ga untundi).

Manam oka state variable tho ee `mode` ni control chestam. Chuddam ela:

```jsx
import { useState, Activity } from 'react'; // Note: May need to import from 'react' as unstable_Activity depending on the version
import MyComponent from './MyComponent';

function App() {
  const [isComponentVisible, setIsComponentVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setIsComponentVisible(!isComponentVisible)}>
        Toggle Component
      </button>

      <Activity mode={isComponentVisible ? 'visible' : 'hidden'}>
        <MyComponent />
      </Activity>
    </div>
  );
}
```

**Emi jarugutundi ikkada?**
1.  Manam `isComponentVisible` ane oka state variable ni create chesam.
2.  `<Activity>` component ki `mode` prop ni pass chestunnam.
3.  `isComponentVisible` `true` aite, `mode` `'visible'` avuthundi, and `<MyComponent />` kanipisthundi.
4.  `isComponentVisible` `false` aite, `mode` `'hidden'` avuthundi. `<MyComponent />` visually hide avuthundi, kani daani loni state (e.g., counters, form inputs) alane untundi.
5.  User "Toggle Component" button ni malli click chesinappudu, `<MyComponent />` tana pata state tho screen meediki vastundi.

```mermaid
graph LR
    A[State: `isComponentVisible: true`] --> B(Activity mode: 'visible');
    B --> C[<MyComponent /> is visible on screen];
    C --> D{User clicks Toggle};
    D --> E[State: `isComponentVisible: false`];
    E --> F(Activity mode: 'hidden');
    F --> G[<MyComponent /> is hidden (display:none), state is preserved];
    G --> H{User clicks Toggle again};
    H --> A;

    style G fill:#d4edda
```

### Important Note on Importing `Activity`

React 19 lo, `<Activity>` inka stable avvani API avochu. So, meeru daanini import chesetappudu, documentation ni check cheyadam manchidi. Konni sarlu ila import cheyyalsi vastundi:

```jsx
import { unstable_Activity as Activity } from 'react';
```
Idi React team manaki chepthunna hint: "Hey, ee feature cool eh, kani deeni API future lo konchem marochu, so jagrattha ga vadandi."

Anthe! Chala simple kada?

Next, manam `<Activity>` ki and `<Suspense>` ki unna theda ento, and eppudu denini vadalo clear ga ardham cheskundam. This is a very important comparison! Let's clear the confusion. 🤔➡️