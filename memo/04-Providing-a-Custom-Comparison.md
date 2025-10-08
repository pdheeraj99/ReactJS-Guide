# Providing a Custom Comparison Function 🕵️‍♀️

Okay, `memo` default ga shallow comparison chesthundani manaki telusu. 99% of the time, adi and `useCallback`/`useMemo` tho manaki pani aipothundi.

Kani, konni chala rare and advanced scenarios lo, ee shallow comparison saripodu. Manaki props ni compare cheyadaniki inka ekkuva control kavali. For example, oka pedda object lo, kevalam konni specific nested properties marithe ne component re-render avvali anukundam.

Ee situation kosam, `memo` manaki oka escape hatch isthundi: **a custom comparison function**.

Ee function ni manam `memo` ki **second argument** ga pass chestam.

```javascript
const MemoizedComponent = memo(MyComponent, arePropsEqual);
```

### The `arePropsEqual` Function

Ee function maname rayali. React deeniki rendu arguments ni isthundi: `oldProps` and `newProps`.

Ee function lopalina, manam ee rendu props objects ni compare chesi, oka boolean ni return cheyyali.

> **The Golden Rule:**
> *   If the props are "equal" (ante, component re-render avvalsina avasaram ledu), you must return **`true`**.
> *   If the props are different (ante, component re-render avvali), you must return **`false`**.

Notice this is the **opposite** of the old `shouldComponentUpdate` class method, which returned `true` to re-render.

### Let's See an Example

Imagine, manam oka `Chart` component ki `dataPoints` ane oka array of objects ni pass chestunnam.

```jsx
// A chart component that we want to optimize
function Chart({ dataPoints }) {
  // ... very expensive rendering logic ...
}

// Our custom comparison function
function areChartsEqual(oldProps, newProps) {
  // Manam lopalina unna prathi data point ni manually compare chestunnam
  return (
    oldProps.dataPoints.length === newProps.dataPoints.length &&
    oldProps.dataPoints.every((oldPoint, index) => {
      const newPoint = newProps.dataPoints[index];
      return oldPoint.x === newPoint.x && oldPoint.y === newPoint.y;
    })
  );
}

// Wrap the component with memo and our custom function
export default memo(Chart, areChartsEqual);
```

**What happens here?**
Parent re-render ayinappudu, React default shallow comparison cheyyadu. Instead, adi mana `areChartsEqual` function ni call chesthundi.
*   Okavela mana function `true` return cheste (ante, data points anni same unte), React `Chart` component re-render ni skip chesthundi.
*   Okavela mana function `false` return cheste, `Chart` component re-render avuthundi.

```mermaid
graph TD
    A[Parent Re-renders] --> B(Calls `memo` with custom function);
    B --> C{`arePropsEqual(oldProps, newProps)`};
    C -- "returns true" --> D[✅ Skip re-render!];
    C -- "returns false" --> E[Re-render component];

    style D fill:#d4edda
```

### ⚠️ A Big Word of Caution! ⚠️

Ee custom comparison function chala powerful, kani adi chala dangerous kuda.
1.  **Performance:** Meeru rase ee comparison function, component ni re-render cheyadam kante **fast** ga undali. Okavela meeru lopalana chala complex, deep comparisons raste, ee function eh slow aipoyi, me original performance problem kante pedda problem avuthundi.
2.  **Compare Everything:** Meeru prathi prop ni compare cheyyali. Okavela meeru `onClick` lanti function prop ni compare cheyadam marchipothe, mee component pata `onClick` function ni use chesi, chala weird bugs create chesthundi.

**Rule of Thumb:** Use this only when you absolutely have to. First, try to optimize by passing simpler props or by using `useMemo` and `useCallback`. If nothing else works, and you have profiled your app and identified a specific bottleneck, then and only then consider writing a custom comparison function.

Next, asalu `memo` ni eppudu vadali, eppudu vadakudadu ane final guidelines chuddam. Let's get some practical advice! 💡➡️