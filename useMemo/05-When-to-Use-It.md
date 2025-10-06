# `useMemo` ni Eppudu Vadali? (The Golden Rules) ✨

Manaki `useMemo` aney oka powerful tool undi. Kani, `useCallback` laage, deenini kuda anavasaranga prathi chota vadakudadu. Premature optimization is the root of all evil! 😈

So, let's see the golden rules for when `useMemo` is actually useful.

## Scenario 1: Skipping Genuinely Expensive Calculations ✅

Idi main use case. Nuvvu nee component lo oka calculation chesthunnav, and adi **noticeably slow** ga undi anuko, appudu `useMemo` vadu.

**How to know if it's "expensive"?**
*   Nuvvu thousands of items unna array ni loop chesthunnava?
*   Nuvvu complex data filtering or transformation chesthunnava?
*   Nee app lo oka specific interaction (like typing) slow ga, janky ga anipisthunda?

Ee questions ki answer "yes" aithe, `useMemo` neeku help cheyyochu. Lekapothe, a simple calculation (like `a + b`) ni memoize cheyyadam valla em labham ledu.

## Scenario 2: `React.memo` unna Component ki Prop ga Pass Chesinappudu ✅

`useCallback` functions ni cache chesinattu, `useMemo` anedi **objects and arrays** ni cache chesi, `React.memo` ki help chesthundi.

Remember: JavaScript lo, `{}` or `[]` anedi prathi render lo oka kotha object/array ni create chesthundi.

### The Problem
```jsx
function Parent() {
  const [user, setUser] = useState({ name: 'Jules' });

  // Ee `userConfig` object prathi render lo kothaga create avuthundi
  const userConfig = { user: user, theme: 'dark' };

  return <ChildComponent config={userConfig} />;
}

const ChildComponent = React.memo(({ config }) => {
  // ...
});
```
Ikkada, `Parent` re-render ainappudu alla, `userConfig` anedi kotha object avuthundi. So, `ChildComponent` యొక్క `config` prop eppudu maarinatle untundi, and `React.memo` pani cheyyadu.

### The Solution with `useMemo`
```jsx
function Parent() {
  const [user, setUser] = useState({ name: 'Jules' });

  // Ippudu `userConfig` object `user` maarithe thappa maaradu.
  const userConfig = useMemo(() => ({
    user: user,
    theme: 'dark'
  }), [user]);

  return <ChildComponent config={userConfig} />;
}
```
Ippudu `userConfig` object stable ga untundi, so `React.memo` anavasaramaina re-renders ni aapesthundi.

## The Final Advice: Profile First! ⏱️

`useCallback` ki ichina advice eh `useMemo` ki kuda.
1.  First, make it work. Code ni simple ga rayi.
2.  Then, make it right. Logic correct ga undela chusko.
3.  **Only then, if needed, make it fast.** Nee app slow ga unte, **React DevTools Profiler** use chesi, ekkada bottleneck undo kanukko.
4.  Appudu matrame, aa specific expensive calculation ni `useMemo` tho wrap cheyyi.

Don't guess, measure!

And that's it for `useMemo`! I hope this gives you a clear picture of how to use it wisely to make your apps faster.

Next, manam ee concepts anni kalipi, a "slow filtering" example ni full, runnable code tho create cheddam! Ready to build? 💻🚀➡️