# `"use memo"`: "Compiler, Please Optimize This!" ✅

Hey mawa! Manam compiler configuration lo `compilationMode: 'annotation'` gurinchi matladukunnam. Ee mode lo, compiler by default a a component ni optimize cheyyadu. Manam దానికి cheppali, "Hey, ee specific component ni nuvvu optimize cheyyi" ani.

Ee "opt-in" instruction eh **`"use memo"`** directive.

### How to Use It?

`"use memo"` anedi oka simple string. Daanini manam component or hook function lopaala, at the very top, pedatham.

```jsx
function MyComponent({ data }) {
  // Tell the compiler to optimize this component
  "use memo";

  // ... rest of your component code ...
  const processedData = process(data);

  return <div>{processedData}</div>;
}
```

**The Rule:** Ee string literal anedi function body lo first statement ga undali.

### Why is this useful?

Ee directive pedda, existing codebases lo React Compiler ni **incrementally adopt** cheyadaniki chala useful.

Imagine, mee app lo 1000 components unnayi. Meeru compiler ni anni components meeda oke sari enable cheste, emaina theda vasthe, ekkada problem vachindo kanukkodam chala kashtam.

Instead, meeru `compilationMode: 'annotation'` set chesi:
1.  Munduga, chala stable and well-tested components ki matrame `"use memo"` add chestaru.
2.  Thorough ga test chesi, antha correct ga pani chesthundo ledo chustaru.
3.  Confidence vachaka, inkonni components ki add chestaru.
4.  Ila slow ga, step-by-step, mee entire codebase ni compiler ki adapt chestaru.

`"use memo"` anedi manaki compiler meeda fine-grained control isthundi.

Ippudu, deeniki opposite ayna `"use no memo"` gurinchi chuddam. Adi enduku avasaramo, next chapter lo teluskundam! ➡️🚫