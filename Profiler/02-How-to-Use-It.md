# `<Profiler>` ni Ela Vadali? (The Syntax)

`<Profiler>` ni use cheyyadam chala straightforward. Nuvvu a component tree యొక్క performance ni measure cheyyali anukuntunnavo, daanini `<Profiler>` tho wrap cheyyali.

## The Basic Syntax

`<Profiler>` component ki rendu props avasaram: `id` and `onRender`.

```jsx
import { Profiler } from 'react';

function onRenderCallback(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the set of interactions that were traced with this update
) {
  // Aggregate or log render timings...
  console.log({ id, phase, actualDuration });
}

function App() {
  return (
    <Profiler id="MyComponent" onRender={onRenderCallback}>
      <MyComponent />
    </Profiler>
  );
}
```

Let's break down the props.

### 1. `id` (string)

*   Idi oka string. Nuvvu profile chesthunna UI part ki oka peru ivvadaniki.
*   Nuvvu nee app lo multiple `<Profiler>`s use chesthunte, a performance data a part dho telusukodaniki ee `id` help chesthundi.
*   Example: `<Profiler id="Sidebar">`, `<Profiler id="ChatWindow">`.

### 2. `onRender` (function)

*   Idi atni kante important prop. Idi oka **callback function**.
*   `<Profiler>` wrap chesina component tree lo edaina component re-render ayyi, aa update DOM lo commit ainappudu alla, React ee `onRender` function ni call chesthundi.
*   Ee function ki React chala useful performance data ni arguments ga pass chesthundi.

## Nesting Profilers

Nuvvu `<Profiler>`s ni nest kuda cheyyochu.

```jsx
<Profiler id="App" onRender={onRenderCallback}>
  <App>
    <Profiler id="Sidebar" onRender={onRenderCallback}>
      <Sidebar />
    </Profiler>
    <Profiler id="MainContent" onRender={onRenderCallback}>
      <MainContent />
    </Profiler>
  </App>
</Profiler>
```
Ee setup tho, nuvvu full app యొక్క performance tho paatu, `Sidebar` and `MainContent` యొక్క individual performance ni kuda measure cheyyochu.

Ippudu neeku `<Profiler>` ni ela use cheyyalo telisindi. Kani, aa `onRender` callback ki vache data ento, daani meaning ento telusukovali kadha? That's where the real insights are.

Let's dive deep into the `onRender` callback's arguments in the next section. Ready to analyze some data? 📊➡️