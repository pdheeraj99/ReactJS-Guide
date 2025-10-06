# The Dependency Array: Effect ni Eeppudu Run Cheyyalo Cheppadam! 🤔

Welcome back! `useEffect` anedi external systems tho sync cheyyadaniki ani telusukunnam. Kani, aa synchronization *eppudu* jaragali? Prathi render ki na? Leka component create ainappudu okkasari matrame na?

Ee control antha `useEffect` యొక్క second argument, **the dependency array**, chethilo untundi.

`useEffect(setup, dependencies?)`

Ee `dependencies` array ni manam three ways lo ivvochu. Prathi way ki oka specific meaning undi. Let's master this!

---

### Pattern 1: No Dependency Array (The Wild West 🤠)

Nuvvu second argument ga array ni assalu ivvakapothe:

```javascript
useEffect(() => {
  // This runs after EVERY single render!
  console.log('Component re-rendered');
});
```

**Meaning:** Ee Effect **prathi render tarvata** run avuthundi. Component mount ainappudu, and state or props maarina prathi sari.

**Eppudu vadali?** Almost eppudu vadakudadu. 99% of the time, idi anavasaramaina runs ki and performance problems ki dari theesthundi. Idi infinite loops ki kuda cause cheyyochu. So, be very careful!

---

### Pattern 2: Empty Dependency Array `[]` (The One-Time Setup 🚀)

Nuvvu second argument ga oka empty array `[]` isthe:

```javascript
useEffect(() => {
  // This runs only ONCE, after the initial render.
  console.log('Component mounted!');
}, []);
```

**Meaning:** Ee Effect kevalam **component modati sari render ayyaka (mounts) okkasari matrame** run avuthundi. Tarvata component enni sarlu re-render aina, ee Effect malli run avvadu.

**Eppudu vadali?** Component create ainappudu okkasari matrame cheyyalsina setup logic kosam.
*   Initial data fetching.
*   `window` or `document` ki event listeners add cheyyadam.
*   Timers (`setInterval`) start cheyyadam.

---

### Pattern 3: Array with Dependencies `[a, b]` (The Smart Watcher 👀)

Nuvvu second argument ga props or state values unna array isthe:

```javascript
useEffect(() => {
  // This runs when `a` or `b` changes.
  console.log(`Value of a or b changed!`);
}, [a, b]);
```

**Meaning:** Ee Effect modati sari render ayyaka okasari run avuthundi. Tarvata, **dependency array (`[a, b]`) lo unna edaina value maarina prathi sari** malli run avuthundi.

**Eppudu vadali?** This is the most common and powerful pattern.
*   Oka specific prop or state maarinappudu, external system ni update cheyyadaniki.
*   Example: `userId` prop maarinappudu, kotha user data ni fetch cheyyadaniki.
*   Example: `roomId` state maarinappudu, kotha chat room ki connect avvadaniki.

```mermaid
graph TD
    A{useEffect(fn, deps)} --> B{What are the `deps`?};
    B --> C(Not provided);
    B --> D(Empty Array `[]`);
    B --> E(Has Values `[a, b]`);

    C --> C1[Runs on EVERY render 👎];
    D --> D1[Runs ONCE on mount 👍];
    E --> E1[Runs on mount AND <br> when `a` or `b` change ✨];

    style C1 fill:#ffcccc
    style D1 fill:#ccffcc
    style E1 fill:#cceeff
```

**The Golden Rule:** `useEffect` lopaala use chese prathi reactive value (props, state) ni dependency array lo pettali. Linter ee vishayam lo manaki help chesthundi.

Ippudu neeku Effect ni eppudu run cheyyalo control cheyyadam vachindi. Kani, manam oka event listener ni add cheste, or oka timer ni set cheste, component destroy ainappudu వాటిని remove cheyyali kadha? Lekapothe memory leaks avuthayi.

Ee "cleanup" process gurinchi manam next chuddam. It's super important! Ready? Let's go! 🧹➡️