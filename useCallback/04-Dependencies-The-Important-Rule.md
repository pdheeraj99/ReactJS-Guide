# Dependencies: The Most Important Rule! 📜

Welcome back! Manam `useCallback` tho re-renders ela aappalo chusam. Super! Kani aa magic antha correct ga pani cheyyalante, manam oka rule ni aachire follow avvali. Adi **The Dependency Array** rule.

`useCallback` lo second argument ga oka array istham kadha, `[]`... ade dependency array. Idi atni kante important part.

## The Golden Rule ✨

Simple rule, friend: **`useCallback` function lopaala nuvvu use chese prathi reactive value (props, state, or component lopaala define chesina functions/variables) ni dependency array lo pettali.**

"Reactive value" ante component re-render ainappudu maaragali-ge value anamata.

```jsx
function MyComponent({ prop1 }) {
  const [count, setCount] = useState(0);

  const myCallback = useCallback(() => {
    // Ikkada `count` (state) and `prop1` (prop) ni use chesthunnam
    console.log(`Count is ${count} and prop is ${prop1}`);
  }, [count, prop1]); // Anduke వాటిని ikkada pettali!
}
```

### Enduku ee rule intha important?

`useCallback` ee array ni use chese, function ni kothaga create cheyyala, leka pata cached version ni ivvala ani decide chesthundi.

*   Nuvvu `[count, prop1]` ani isthe, React ki nuvvu chepthunnav: "`count` or `prop1` lo edaina maarithe thappa, naaku pata function eh ivvu."
*   `count` maarindi anuko, React chusthundi, "Oh, dependency maarindi. I need to create a new version of this function with the new `count` value."

## What if you break the rule? (The "Stale Closure" Problem) 😨

Dependency array lo pettadam marchipothe emavuthundi? Oka pedda bug vasthundi, daani peru **Stale Closure**.

"Stale" ante "pasi poyina" ani ardham. Ante, mana function "pasi poyina" (pata) state or prop values ni use chesthundi.

Let's see an example:

```jsx
function ProblemComponent({ userId }) {
  const [count, setCount] = useState(0);

  // BUG! 🐛 `count` ni use chesthunnam, kani dependency ga ivvaledu.
  const handleLog = useCallback(() => {
    console.log(`Button clicked! Current count is: ${count}. User is ${userId}`);
  }, [userId]); // `count` is missing!

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <button onClick={handleLog}>Log Count</button>
    </div>
  );
}
```

**Ikkada em jarugutundi:**
1.  **First Render:** `count` is 0. `userId` is, say, '123'. `handleLog` function create avuthundi, and adi `count` value `0` ni "capture" cheskuntundi.
2.  **Increment Button Click:** Nuvvu count ni 5 ki penchav. Component re-render avuthundi.
3.  **`useCallback` checks:** `userId` dependency maaraledu. So, `useCallback` kotha function create cheyyakunda, **pata function ne** return chesthundi.
4.  **Log Count Button Click:** Nuvvu `handleLog` ni call chesthav. Adi inka first render lo create aina function eh! Adi capture cheskunna pata `count` value `0` ne print chesthundi, even though the real `count` is 5!

**Console Output:** `Button clicked! Current count is: 0. User is 123` (Even if count is 5!)

Chusava? Mana function "stale" `count` value ni use chesthundi. This is a very common bug.

```mermaid
graph TD
    subgraph Render 1 (count=0)
        A(useCallback creates function) --> B(Function captures `count = 0`);
    end

    subgraph Render 2 (count=5)
        C(Component re-renders) --> D{useCallback checks deps};
        D -- No change in `[userId]` --> E(Returns OLD function from Render 1);
    end

    subgraph "User Action"
        F(User clicks Log button) --> G{Calls the OLD function};
    end

    G --> H(Prints `count = 0`... Oops! 🐞);

    style H fill:#ffb3b3,stroke:#333,stroke-width:2px
```

## The Fix is Simple: Follow the Rule!

Ee bug ni fix cheyyadaniki, manam `count` ni dependency array lo pettali.

```jsx
const handleLog = useCallback(() => {
  console.log(`Button clicked! Current count is: ${count}. User is ${userId}`);
}, [userId, count]); // ✅ Correct!
```

Ippudu `count` maarina prathi sari, `useCallback` kotha function ni create chesthundi with the latest `count` value. Problem solved!

Luckily, manaki ee rule ni gurthu cheyyadaniki ESLint ane tool undi. `eslint-plugin-react-hooks` anedi install cheskunte, nuvvu edaina dependency marchipothe, adi neeku warning isthundi. Chala helpful!

Okay, ippudu neeku `useCallback` lo atni kante important rule telusu. Next, manam inko pedda question ki answer thelusukundam: "Asalu `useCallback` ni eppudu, ekkada vadali? Prathi function ki vadala?" Let's find out! 🤔➡️