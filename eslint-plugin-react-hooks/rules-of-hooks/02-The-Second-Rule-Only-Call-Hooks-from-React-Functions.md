# The Second Rule: Hooks ni React Functions nunchi matrame Call Cheyyali! ⚛️

Hey mawa! First rule (top-level only) ardham aipoindi. Ippudu second rule, adi kuda chala important:
> **Only call Hooks from React function components or from custom Hooks.**

Ante, manam `useState`, `useEffect` lanti hooks ni normal JavaScript functions lo or class components lo vadakudadu.

Kani... **enduku? Why this restriction?**

The answer is: **Hooks need to know which component they belong to.**

### The "Currently Rendering Component" Context

React lopaala, adi eppudu oka global variable ni track chesthu untundi: `currentlyRenderingComponent`.

Oka component (`MyComponent`) render avvadam start chesinappudu, React aa global variable ni `MyComponent` ki set chesthundi. Ippudu, `MyComponent` lopaala manam `useState` ni call chesthe, `useState` function aa global variable ni chusi, "Oh, nannu `MyComponent` lopaala nunchi call chesaru. So, ee state `MyComponent` ki chendinadi" ani theeskuni, aa state ni `MyComponent` యొక్క internal memory lo store chesthundi.

**Analogy: The Chef in the Kitchen 👨‍🍳**
*   **A React Component (`MyComponent`)**: A specific kitchen (e.g., "Kitchen A").
*   **A Hook (`useState`)**: A chef.
*   **`currentlyRenderingComponent`**: The sign on the kitchen door that says "Currently working in: Kitchen A".

Chef (`useState`) pani cheyyali ante, vaadiki oka kitchen (`MyComponent`) kavali. Vaadu kitchen lopaaliki vellagane, aa sign chusi, "Okay, nenu ippudu Kitchen A lo unnanu, so naa panantha ikkade cheyyali" ani theluskuntadu.

Okavela meeru chef ni kitchen bayata (oka normal JavaScript function lo) pani cheyyamante, vaadiki ekkada pani cheyyalo teliyadu. He's lost!

### What Happens When You Break the Rule?

```jsx
// ❌ WRONG - Hook inside a regular JS function!
function getInitialData() {
  // This function doesn't have a "currently rendering component" context.
  // React doesn't know which component this state belongs to!
  const [data, setData] = useState(null); // This will throw an error.
  return data;
}

function MyComponent() {
  const myData = getInitialData(); // This will crash
  return <div>{myData}</div>;
}
```
Ee code run cheste, React error isthundi: "Invalid hook call. Hooks can only be called inside of the body of a function component."

```mermaid
graph TD
    subgraph "✅ Valid Call"
        A[React starts rendering `MyComponent`] --> B[Sets `currentlyRenderingComponent = MyComponent`];
        B --> C[`MyComponent` calls `useState()`];
        C --> D{`useState` reads the global context};
        D --> E[Associates state with `MyComponent`];
    end

    subgraph "❌ Invalid Call"
        F[A regular function `myUtil()` is called] --> G[`currentlyRenderingComponent` is `null`];
        G --> H[`myUtil()` calls `useState()`];
        H --> I{`useState` sees no component context};
        I --> J[Throws an error! 💣];
    end

    style E fill:#d4edda
    style J fill:#ffcccc
```

Ee rendu rules (Top-level only, and only from React functions) valla ne, Hooks antha powerful ga and correctly pani chesthayi.

Ippudu, ee rendu rules యొక్క common violations ni and vaatini ela fix cheyyalo, clear code examples tho chuddam. Let's get to the code! 💻➡️