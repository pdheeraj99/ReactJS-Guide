# `compilationMode`: "Whom Should I Optimize?" 🤔

Hey mawa! Ee option compiler ki chepthundi, "Nenu a a functions ni optimize cheyyali?" ani. Idi compiler యొక్క main behavior ni control chesthundi. Let's understand the "why" behind each mode.

### 1. `infer` (the default)

*   **What it does:** Compiler "infers" (oohisthundi) which functions are React components or hooks and compiles only them.
*   **Why use it? (The "Why"):** Idi default endukante, idi **safe and smart**. React components ki konni specific rules untayi (e.g., PascalCase naming for components, `use` prefix for hooks). Ee rules follow ayye code matrame React component ani compiler guess chesthundi. Deeni valla, adi anavasaramaina plain JavaScript utility functions ni touch cheyyadu. **This is the best mode for most projects because it balances automatic optimization with safety.**

    ```javascript
    // ✅ Compiler knows this is a component
    function MyComponent() { return <div />; }

    // ✅ Compiler knows this is a hook
    function useMyHook() { return useState(0); }

    // ❌ Compiler correctly ignores this plain function
    function calculateSum(a, b) { return a + b; }
    ```

### 2. `annotation`

*   **What it does:** Compiles *only* the functions that you explicitly mark with a `"use memo";` directive.
*   **Why use it? (The "Why"):** Imagine mee company lo 5000 components unna oka pedda, pata codebase undi. Meeru compiler ni oke sari anni components meeda enable cheste, emaina theda vasthe, ekkada problem vachindo kanukkodam chala kashtam. It's too risky.

    Ee mode tho, meeru **gradual ga, safe ga adopt** cheyyochu.
    1.  Meeru mundu, chala stable ga unna, simple components ki matrame `"use memo";` add chestaru.
    2.  Test chesi, antha baga pani chesthunte, confidence perugutundi.
    3.  Slow ga, inkonni components ki compiler ni enable chestaru.
    **This mode is all about control and safety during a large-scale migration.**

### 3. `all`

*   **What it does:** Tries to compile *every* top-level function in your project.
*   **Why use it? (The "Why"):** To be honest, **you probably shouldn't use this mode.** Idi chala aggressive. React components eh kakunda, mee normal utility functions ni kuda optimize cheyyadaniki try chesthundi. This can sometimes lead to unexpected behavior or even break your code if the utility function wasn't written with React's rules in mind. It's mostly available for experimental or very specific use cases. The `infer` mode is almost always a better choice.

So, `compilationMode` anedi compiler యొక్క "scope" ni define chesthundi. `infer` tho start cheyyadam best. Pedda projects lo adopt chesetappudu matrame `annotation` gurinchi alochinchali. Next, manam `gating` gurinchi chuddam! ➡️🚪