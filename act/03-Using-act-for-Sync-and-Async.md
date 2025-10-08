# Using `act`: The Right Way for Sync & Async Updates ✅

Okay, `act` lekapothe vache problems chusam. Ippudu aa `act` "director" ni set loki teeskochhi, mana test ni ela correct ga direct cheyalo nerchukundam.

The golden rule is: **Any code that causes React state to be updated should be wrapped in `act()`**.

### Fixing Our Synchronous Test

Mana previous `Counter` test ni ippudu `act` tho fix cheddam.

```jsx
// Counter.test.js (The RIGHT Way)
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react'; // Import act!
import Counter from './Counter';

it('increments the counter when the button is clicked', () => {
  // 1. Arrange: Render the component
  render(<Counter />);
  const button = screen.getByText('Increment');
  const label = screen.getByText(/Count:/);

  // 2. Act: Wrap the state-updating action in act()
  act(() => {
    fireEvent.click(button);
  });

  // 3. Assert: Now, we can be sure the update is complete!
  expect(label).toHaveTextContent('Count: 1');
  expect(document.title).toBe('Count is 1'); // useEffect kuda run aindi!
});
```
Chusara? Manam `fireEvent.click(button)` ni `act()` lopalana pettam. Ippudu, `act` function aa click valla trigger ayina `setCount` update and aa `useEffect` update, anni complete ayyevaraku wait chesthundi. Tarvata matrame `expect` lines run avuthayi. Ee test eppudu reliable ga untundi!

### What about `async` updates?

Real world lo, anni updates antha simple ga undavu. Konni sarlu data fetch cheyyali, or timers tho pani undochu. Ee asynchronous operations ni test chesetappudu, manam `async` and `await` tho `act` ni use cheyyali.

**The recommended way to use `act` is always with `async/await`**.

Let's modify our `Counter` to have an async update:
```jsx
// Counter.jsx (with an async update)
// ...
const handleAsyncClick = () => {
  setTimeout(() => {
    setCount(c => c + 1);
  }, 500); // Update happens after 500ms
};
// ...
```

Ee async update ni test cheyadaniki, manam `async act` vadali:
```jsx
// Testing the async update
import { act } from 'react';

it('increments counter asynchronously', async () => { // Note the async test function
  render(<Counter />);
  const asyncButton = screen.getByText('Increment Async');

  // We wrap the entire interaction in async act
  await act(async () => {
    fireEvent.click(asyncButton);
    // Manually advance timers if using Jest's fake timers
    jest.advanceTimersByTime(500);
  });

  // By the time we are here, the timeout and the state update are complete
  expect(screen.getByText(/Count:/)).toHaveTextContent('Count: 1');
});
```

**Why `async act(async () => { ... })`?**
*   `act` loni function `async` avvadam valla, adi lopalina `await` statements ni handle cheyagaladhu (like data fetching).
*   `act` function eh `await` cheyyadam valla, mana test lopalina unna anni asynchronous operations complete ayyevaraku aagutundi.

```mermaid
graph TD
    A[Test calls `await act(async () => {...})`] --> B{Async action starts (e.g., fetch)};
    B --> C[act waits... ⏳];
    C --> D{Promise resolves, data arrives};
    D --> E[React updates state with new data];
    E --> F[act waits for re-render to complete... ⏳];
    F --> G[UI is in final state ✅];
    A --await completes--> H[Test continues to `expect()`];
    G --> H;

    style G fill:#d4edda
```

So, the takeaway is:
*   Synchronous updates kosam: `act(() => { ... });`
*   Asynchronous updates kosam (or just to be safe always): `await act(async () => { ... });`

Kani prathi sari `act` ni ila manually rayadam konchem verbose ga anipinchachu. Deeniki emaina shortcut unda? And `act` vadetappudu emaina best practices unnaya? Adento next chuddam! 🤔➡️