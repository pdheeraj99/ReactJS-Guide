# Advanced `useState`: Lazy Init and Updater Functions 🚀

Hey! Welcome to the final part of our `useState` chapter. Ippudu manam `useState` యొక్క rendu advanced but chala useful patterns gurinchi nerchukundam.

## 1. Lazy Initialization: Expensive Initial State

`useState` ki manam pass chese `initialState` anedi React kevalam modati render lo matrame use chesthundi.

**The Problem:** Kani, aa initial state ni calculate cheyyadaniki chala time padithe? For example, oka pedda array ni loop chesi, konni calculations cheyyali anuko.

```javascript
// WRONG 👎
// `calculateInitialState()` anedi prathi single re-render lo call avuthundi,
// even though React daani result ni ignore chesthundi. Waste of performance!
const [todos, setTodos] = useState(calculateInitialState());
```

**The Solution: Pass an Initializer Function!**
Ee anavasaramaina calculation ni aapataniki, manam `useState` ki direct ga value ivvakunda, oka **function ni pass cheyyochu.**

```javascript
// RIGHT 👍
// Ikkada manam function ni call cheyyatledu, function ne pass chesthunnam.
// React ee function ni kevalam modati render lo matrame call chesthundi.
const [todos, setTodos] = useState(createInitialTodos);
```
Ee pattern ni **"lazy initialization"** antaru. Idi initial state calculation expensive ga unnappudu chala useful.

---

## 2. Updater Functions: Getting the Previous State Reliably

Manam mundu section lo "state as a snapshot" problem chusam. Oke event handler lo `setCount(count + 1)` ni chala sarlu call cheste, adi correct ga pani cheyyadu.

**The Problem:**
```javascript
function handleClick() {
  setCount(count + 1); // Ee snapshot lo `count` is 0, so this becomes setCount(1)
  setCount(count + 1); // Ee snapshot lo kuda `count` is 0, so this also becomes setCount(1)
}
```

**The Solution: Pass an Updater Function!**
`setState` function ki direct ga next state value ivvadaniki badulu, manam daaniki **oka function ni pass cheyyochu.** Ee function ni "updater function" antaru.

React ee function ki **pending state** (previous state) ni argument ga isthundi, and manam daani nunchi next state ni calculate chesi return cheyyali.

```javascript
function handleClick() {
  // Pass an updater function
  setCount(c => c + 1); // `c` is the pending state (0), returns 1
  setCount(c => c + 1); // `c` is the pending state (1), returns 2
  setCount(c => c + 1); // `c` is the pending state (2), returns 3
}
```
React ee updater functions anni oka queue lo petti, next render lo order lo run chesthundi. So, ippudu manaki correct result (`3`) vasthundi.

**Rule of Thumb:** State ni previous state meeda base chesi update cheyyali anukunnappudu, eppudu updater function vadadam safe and best practice.

```mermaid
graph TD
    A{Do you need to update state?};
    A --> B{Is the new state based on the old state?};
    B -- No --> C[Just pass the new value<br/>`setState(newValue)`];
    B -- Yes --> D[Pass an updater function!<br/>`setState(oldState => oldState + 1)`];

    style D fill:#ccffcc
```

And that's it! You have now mastered `useState`, from the basics to the advanced patterns. You're ready to build all kinds of interactive components in React!

Next, let's build the code examples to see all these concepts, including immutability and state snapshots, in action! 💻✨➡️