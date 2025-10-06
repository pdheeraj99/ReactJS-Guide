# The Problem: Expensive Calculations on Every Render! 🐢

Hey friend! Welcome to the `useMemo` chapter. Idi inko important performance hook. `useCallback` functions ni cache chesthe, `useMemo` anedi oka function యొక్క **return value** ni cache chesthundi.

Deenini ardham cheskodaniki, manam mundu oka common performance problem ni chuddam.

## The Slow Filtering Scenario

Imagine chesko, manaki oka pedda list of products undi (e.g., 10,000 items). Manam daanini oka search query tho filter cheyyali.

Ee filtering logic ni manam direct ga component lo pedithe emavuthundi?

```jsx
function ProductList({ products, searchQuery, theme }) {

  // Ee function chala slow anukundam.
  // It has to loop through 10,000 products.
  console.log('Filtering products... (Slow operation!)');
  const filteredProducts = filterProducts(products, searchQuery);

  return (
    <div className={theme}>
      <input value={searchQuery} ... />
      <ul>
        {filteredProducts.map(p => <li key={p.id}>{p.name}</li>)}
      </ul>
    </div>
  );
}
```

Ee code lo, `filterProducts` anedi oka "expensive" calculation.

**The Problem:**
React lo, oka component re-render ainappudu, daani lopaala unna code antha malli run avuthundi.

So, `ProductList` component eppudu re-render avuthundi?
1.  `products` array maarithe.
2.  `searchQuery` maarithe.
3.  **`theme` maarithe!**

User theme ni 'light' nunchi 'dark' ki marchinappudu, `products` or `searchQuery` em maaraledu. Ante, `filteredProducts` result kuda maaradu. Kani, component re-render avvadam valla, manam anavasaranga aa 10,000 products ni **malli filter chesthunnam!**

Ee anavasaramaina, slow calculation valla, theme change lanti simple update kuda chala "laggy" ga or "janky" ga anipisthundi.

```mermaid
graph TD
    A[User changes theme] --> B{Parent re-renders `ProductList`};
    B --> C(Component body re-executes);
    C --> D["`filterProducts` runs again...<br/>...even though `products` and `searchQuery` did not change!"];
    D --> E[UI feels slow and unresponsive 🐌];

    style D fill:#ffcccc
    style E fill:#ffcccc
```

Ee anavasaramaina re-calculations ni aapatanike, React manaki `useMemo` aney hook ni ichindi. `useMemo` chepthundi, "Hey React, ee calculation యొక్క inputs maarithe thappa, daanini malli run cheyyaku. Just naaku pata result eh icchey."

Next, manam `useMemo` ee problem ni ela solve chesthundo, and mana app ni ela fast ga chesthundo chuddam. Ready to cache some results? Let's go! ⚡️➡️