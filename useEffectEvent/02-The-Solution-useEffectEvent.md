# The Solution: `useEffectEvent` tho Logic ni Separate Cheyyadam!  แยก

Manam `useEffect` tho vache dilemma gurinchi chusam. Ippudu daani elegant solution ento chuddam: `useEffectEvent`.

> **Reminder:** `useEffectEvent` anedi inka **experimental API**. Ikkada manam daani concept and future usage gurinchi nerchukuntunnam.

## Asalu `useEffectEvent` ante enti?

`useEffectEvent` anedi oka kotha React Hook. Idi manaki **Effect Events** create cheyyadaniki help chesthundi.

An "Effect Event" is a function with a superpower:
1.  Adi eppudu **latest props and state ni read** cheyyagaladu. (No stale data!)
2.  Adi **"non-reactive"**. Ante, daanini manam `useEffect` యొక్క dependency array lo pettalsina avasaram ledu. (No unnecessary re-runs!)

Simple ga cheppalante, `useEffectEvent` manaki `useEffect` lopaala unna logic ni rendu parts ga divide cheyyadaniki help chesthundi:

*   **Reactive Logic (in `useEffect`):** Ee code dependencies meeda aadharapaduthundi. Dependencies maarithe, idi malli run avuthundi. (e.g., chat server ki connect avvadam `roomId` maarinappudu).
*   **Non-Reactive Logic (in `useEffectEvent`):** Ee code ki dependencies undavu. Idi eppudu latest data ni chusthundi, kani `useEffect` ni re-run cheyyadu. (e.g., notification chupinchadam latest `theme` tho).

```mermaid
graph TD
    subgraph "Reactive Code"
        A[useEffect]
        A -- depends on --> A1("[roomId]");
    end

    subgraph "Non-Reactive Code"
        B[useEffectEvent]
        B -- reads --> B1("{ theme }");
        B1 -- "but is NOT a dependency!";
    end

    A -- calls --> B;

    A1 -- triggers --> A;
    B1 -- "does NOT trigger Effect" --> A;
```

Ee separation valla, manam mana dilemma ni solve cheyyochu.

## How Does it Solve Our Problem?

Mana chat app example ki vacheddam.

1.  **Reactive Part:** Chat server ki connect avvadam. Idi `roomId` meeda depend avuthundi. So, ee logic ni manam `useEffect` lopaala unchutham, with `[roomId]` as a dependency.
2.  **Non-Reactive Part:** Notification chupinchadam. Idi `theme` ni use cheskovali, kani `theme` maarithe re-connection avvakudadu. So, ee logic ni manam `useEffectEvent` tho create chesina function lopaala pedatham.

```javascript
function ChatRoom({ roomId, theme }) {
  // Step 1: Create the Effect Event for non-reactive logic
  const onConnected = useEffectEvent(() => {
    // This function can read the latest `theme`
    // but it won't trigger the Effect below.
    showNotification(`Welcome to ${roomId}!`, theme);
  });

  useEffect(() => {
    // Step 2: Use the Effect for reactive logic
    const connection = createConnection(roomId);

    connection.on('connected', () => {
      // Step 3: Call the Effect Event from inside the Effect
      onConnected();
    });

    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ The dependency array is now simple and correct!
}
```

**What happens now?**
*   `roomId` maarithe, `useEffect` re-run avuthundi, and manam kotha room ki connect avutham. Correct!
*   `theme` maarithe, `useEffect` re-run **avvadu**. Kani, `onConnected` function eppudu latest `theme` ni chusthundi kabatti, next time connection establish ainappudu, adi correct theme tho notification chupisthundi. Correct!

Dilemma solved! Manaki ippudu stale data ledu, and anavasaramaina re-runs levu. We got the best of both worlds. 🎉

Ippudu neeku `useEffectEvent` యొక్క core purpose ardham ayyindi anukuntunna. Idi `useEffect` ni inka predictable ga and powerful ga chesthundi.

Next, manam deeni syntax and rules gurinchi inka detail ga chuddam. Ready? Let's go! ➡️