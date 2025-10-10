# `"use no memo"`: "Compiler, Please Ignore This!" 🚫

Hey mawa! Manam `"use memo"` tho compiler ki oka component ni optimize cheyyamani cheppochu. Kani, konni sarlu manam daaniki opposite cheppalsi vasthundi: "Ee component ni nuvvu asalu touch cheyyaku!" ani.

Ee "opt-out" instruction eh **`"use no memo"`** directive.

### How to Use It?

`"use memo"` laage, `"use no memo"` kuda oka simple string. Daanini manam component or hook function lopaala, at the very top, pedatham.

```jsx
function ComponentWithLegacyLib({ data }) {
  // Tell the compiler to skip this component
  "use no memo";

  // This component uses an old library that might break if the
  // code is rewritten by the compiler.
  const result = SomeLegacyLibrary.process(data);

  return <div>{result}</div>;
}
```

### Why would we ever do this?

React Compiler chala smart, kani adi perfect kadu. Konni rare situations lo, daani optimization valla problem ravacchu:
1.  **Compiler Bug:** Compiler lone oka bug undi, adi mana code ni thappuga rewrite chesthundi.
2.  **Incompatible Third-Party Library:** Manam oka pata library vaduthunnam, adi React rules ni follow avvakunda, direct ga DOM ni manipulate chesthundi. Compiler code ni optimize chesthe, aa library pani cheyyadam aagipovacchu.
3.  **Temporary Workaround:** Manam oka complex bug ni debug chestunnam. Aa bug compiler valla vastundo, leka mana logic lone undo teluskovadaniki, manam temporary ga compiler ni ee component meeda disable cheyyochu.

**Best Practice:**
`"use no memo"` anedi eppudu oka **temporary solution** ga matrame vadali. Idi use chesinappudu, manam pakka na oka comment petti, enduku disable chestunnamo, and daaniki sambandhinchina tracking issue (like a JIRA ticket) ni mention cheyyali.

```jsx
function MyComponent() {
  // TODO: Remove this once JIRA-123 is fixed.
  // The compiler is causing issues with the charting library.
  "use no memo";

  // ... component code ...
}
```

Ee directives valla, manam compiler ni full control lo unchukovacchu. Ippudu, ee rendu directives ni code examples lo ela use cheyalo chuddam! Let's go! 💻✨