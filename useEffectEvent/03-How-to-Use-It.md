# `useEffectEvent` ni Ela Vadali? (The Rules) 📜

Manaki `useEffectEvent` aney kotha superpower vachindi. Ippudu daanini ela vadalo, and daani rules ento chuddam.

> **Reminder:** `useEffectEvent` anedi inka **experimental API**. The syntax and rules shown here are based on its current proposal.

## The Basic Syntax

`useEffectEvent` hook ni use cheyyadam chala simple. Adi oka function ni theeskuni, inko function ni return chesthundi.

`const onSomething = useEffectEvent(callback);`

*   **`callback`:** Idi nee non-reactive logic unna function. Ikkada nuvvu latest props and state ni safe ga access cheyyochu.
*   **`onSomething`:** Idi `useEffectEvent` manaki return chese kotha function (the "Effect Event"). Ee function eppudu stable ga untundi, prathi render lo maaradu.

```javascript
function MyComponent({ prop1, prop2 }) {
  const [state1, setState1] = useState();

  // 1. Define the Effect Event
  const onMyEvent = useEffectEvent(() => {
    // Ikkada nuvvu `prop1`, `prop2`, and `state1` ni
    // safe ga use cheyyochu.
    console.log(prop1, prop2, state1);
  });

  // 2. Use it inside an Effect
  useEffect(() => {
    // ... some logic ...

    // Call the Effect Event
    onMyEvent();

  }, [/* ... reactive dependencies here, but not onMyEvent ... */]);
}
```

## The Golden Rule: Only Call from an Effect! ✨

Idi atni kante important rule. **Effect Events ni kevalam `useEffect` (or `useLayoutEffect`, `useInsertionEffect`) lopaala nunchi matrame call cheyyali.**

Nuvvu daanini normal event handler (`onClick`) lo or rendering logic lo call cheyyakudadu.

### ✅ The RIGHT Way

```javascript
const onMyEvent = useEffectEvent(() => { ... });

useEffect(() => {
  // Correct! Calling from inside an Effect.
  onMyEvent();
}, [deps]);
```

### ❌ The WRONG Way

```javascript
const onMyEvent = useEffectEvent(() => { ... });

// WRONG!
return <button onClick={onMyEvent}>Click Me</button>
```

**Enduku ee rule?**
`useEffectEvent` anedi `useEffect` యొక్క behaviour ni predictable ga unchadaniki design chesaru. Adi Effect lifecycle tho tight ga couple ayyi untundi. Bayata call cheste, daani purpose debba thintundi and unexpected behaviour ki dari tiyyochu.

Luckily, `eslint-plugin-react-hooks` (latest version) ee rule ni enforce chesthundi. Nuvvu tappu ga vadithe, adi neeku warning isthundi.

## Other Important Points

*   **No dependency array:** `useEffectEvent` ki dependency array undadu. Daani lopaala unna code eppudu latest values ne chusthundi.
*   **Define it just before the Effect:** Readability kosam, Effect Event ni adi use chese `useEffect` ki തൊട്ടുമുമ്പ് define cheyyadam best practice.

Anthe! Ee simple rules follow aithe, nuvvu `useEffectEvent` ni safe ga and effectively use cheyyochu.

### Note on Examples

`useEffectEvent` anedi inka experimental kabatti, manam deeniki full, runnable code example create cheyyatledu. The code snippets in these markdown files are for **conceptual understanding** of how the hook is intended to be used in the future.

I hope this chapter gives you a clear idea of what `useEffectEvent` is and what problems it aims to solve. Let's move on to the next hook! 🚀