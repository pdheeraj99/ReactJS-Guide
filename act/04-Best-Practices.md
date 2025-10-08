# Best Practices & The "Invisible" `act` 🕵️‍♂️

Manam `act` gurinchi nerchukunnam, kani prathi render ni, prathi event ni `act` tho wrap cheyadam konchem repetitive ga anipinchachu, kada?

The good news is, in most modern React projects, **you rarely need to import and use `act` directly!**

How is this possible? The answer lies in using a good testing library.

## The Best Practice: Use React Testing Library (RTL)

The most popular and recommended library for testing React components is **React Testing Library (`@testing-library/react`)**.

The super power of this library is: **All of its core functions (`render`, `fireEvent`, `userEvent`, etc.) are already wrapped in `act` for you, behind the scenes!**

Idi "invisible" `act` lantiది. Manam `fireEvent.click()` or `userEvent.click()` ni call chesinappudu, RTL automatic ga aa call ni `act` lopalana petti, mana kosam aa waiting antha chesthundi.

### Let's See the Difference

**Before (Manual `act`):**
```jsx
// Manam 'act' ni import chesi, manually wrap cheyyali
import { act } from 'react';

it('increments the counter', () => {
  render(<Counter />);
  const button = screen.getByText('Increment');

  act(() => {
    fireEvent.click(button);
  });

  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

**After (Using React Testing Library):**
```jsx
// No need to import or call 'act' manually!
it('increments the counter', () => {
  render(<Counter />);
  const button = screen.getByText('Increment');

  // fireEvent.click is already wrapped in act() by the library!
  fireEvent.click(button);

  // By the time this line runs, RTL guarantees the update is complete.
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```
Chusara, entha clean ga, readable ga undo! Manam `act` gurinchi alochinchalsina pani ledu.

```mermaid
graph TD
    A[You write test with RTL] --> B[`fireEvent.click(button)`];
    subgraph React Testing Library (RTL)
        B --> C{RTL secretly calls `act` for you!};
    end
    C --> D[All updates are flushed];
    D --> E[Your `expect()` runs on the final UI];
    E --> F[🎉 Clean & Reliable Test!];

    style C fill:#e6f7ff
    style F fill:#d4edda
```

### When DO you need `act` manually?

99% of the time, you don't. Kani, konni chala rare and complex asynchronous scenarios lo, where you might have multiple cascading updates that RTL's `waitFor` or `findBy*` helpers can't handle gracefully, appudu meeru `act` ni manually use cheyyalsi ravochu. But this is very uncommon.

**Rule of Thumb:** Start without `act`. If you see the "not wrapped in act" warning, first check if you can use an `async` helper from your testing library (like `await screen.findByText(...)`). Only if that fails, consider using a manual `act` block.

## A Final Note: Test Environment Setup

`act` pani cheyadaniki, testing environment lo `global.IS_REACT_ACT_ENVIRONMENT = true;` ane oka flag set chesi undali. Again, good news: `create-react-app`, `Vite` with React templates, and React Testing Library lanti modern tools **ee pani ni manakosam automatic ga chesthayi**. So, idi just a "good-to-know" vishayam anthe.

This concludes our deep dive into `act`! You now know why it exists, how it works, and most importantly, how to avoid using it directly by leveraging powerful tools like React Testing Library. Happy testing! 🧪✅