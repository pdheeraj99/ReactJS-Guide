# useLayoutEffect: `useEffect` యొక్క Synchronous Twin! 👯

Hey friend! Welcome to the `useLayoutEffect` chapter. Ee hook chala sarlu `useEffect` tho confuse avuthundi, kani daaniki, deeniki madhyalo oka chala important theda undi.

## Asalu `useLayoutEffect` ante enti?

`useLayoutEffect` anedi `useEffect` యొక్క oka special version. Vaati signature, rules (dependency array, cleanup function) anni oke laaga untayi.

The only difference is **timing**.

*   **`useEffect`** runs **asynchronously**, *after* the browser has painted the screen. Idi UI ni block cheyyadu.
*   **`useLayoutEffect`** runs **synchronously**, *after* React has updated the DOM, but *before* the browser has painted the screen. Idi browser paint ni block chesthundi.

Simple ga cheppalante, `useLayoutEffect` chepthundi, "Hey browser, nuvvu screen meeda emaina chupinche mundu, aagu! Nenu lopaala konchem pani cheyyali."

## Evari Kosam Ee Hook?

Ee hook manam eppudu padithe appudu vadakudadu. Idi oka specific problem ni solve cheyyadaniki matrame.

**The main use case for `useLayoutEffect` is to read layout from the DOM and synchronously re-render.**

Ante, nuvvu oka component ni render chesaka, daani size or position ni DOM nunchi measure chesi, aa measurement ni batti ventane inko update cheyyali anukunte, appudu ee hook vadali.

For example:
*   Oka tooltip యొక్క position ni calculate cheyyadaniki.
*   Oka element యొక్క width or height theeskuni, daanini batti vere element style ni marchadaniki.

Ee hook synchronous kabatti, deeni lopaala heavy logic unte, adi user experience ni debba theesthundi. Anduke, **99% of the time, you should prefer `useEffect`**.

Ippudu neeku ee hook యొక్క high-level purpose ardham ayyindi anukuntunna.

Next, manam asalu `useEffect` vadithe ee layout measurement vishayam lo em problem vasthundo, oka "visual flicker" ela create avuthundo chuddam. Ready to see the problem we need to solve? Let's go! 👀➡️