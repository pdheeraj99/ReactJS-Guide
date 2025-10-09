# How to Use `createRoot`: The Two-Step Process ✌️

Hey mawa! `createRoot` ni use cheyyadam anedi chala simple, two-step process. Let's break it down.

### Step 1: Create the Root

Munduga, manam `createRoot` function ni `react-dom/client` nunchi import cheskovali. Ee function ki, manam mana React app ni ekkada attach cheyyali anukuntunnamo, aa HTML element ni pass cheyyali.

Usually, mana `public/index.html` file lo ilanti oka `<div>` untundi:
`<div id="root"></div>`

Manam ee `div` ni JavaScript tho select chesi, `createRoot` ki istham.

```jsx
import { createRoot } from 'react-dom/client';

// 1. Find the container DOM element
const container = document.getElementById('root');

// 2. Create a React root on that container
const root = createRoot(container);
```
Ee `createRoot` function manaki oka `root` object ni return chesthundi. Ee object, aa `container` div ni manage cheyyadaniki ready ga undi.

### Step 2: Render Your App

Ippudu manaki root ready ga undi. Next, manam daani lopaala mana main `<App />` component ni render cheyyali. Daanikosam, manam aa `root` object meeda `render()` method ni call chestham.

```jsx
// 3. Render your main component into the root
root.render(<App />);
```

Antha! Ee two steps tho, mana React app antha browser lo kanipisthundi. React ippudu aa `<div id="root">` loni DOM antha manage cheyyadam start chesthundi.

### Visualizing the Flow

```mermaid
graph TD
    A[HTML has `<div id='root'></div>`] --> B{`document.getElementById('root')`};
    B --> C[Pass DOM node to `createRoot`];
    C --> D{Returns a `root` object};
    D --> E[Call `root.render(<App />)`];
    E --> F[React renders `<App />` inside the div! ✅];

    style F fill:#d4edda
```

So, the process is: **Get the house, then put the furniture inside.**
1.  `createRoot(house)`
2.  `root.render(furniture)`

Kani, okavela manam app ni update cheyyali anukunte? Or completely teeseeyali anukunte? Daaniki kuda ee `root` object meeda methods unnayi. Vaati gurinchi next chapter lo chuddam! ➡️✨