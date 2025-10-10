# The Components Track: Which Component is Slow? 🔥

Hey mawa! "Scheduler" track manaki *eppudu* and *enduku* render jarugutundo chepthundi. Kani, aa render lo, a a *specific component* ekkuva time theeskuntundo teliyali kada?

Daanikosame manaki **"Components"** track undi.

### What is the Components Track?

> **The Components track visualizes how long each of your components took to render, in a "flamegraph" chart.**

Flamegraph ante, oka component render time lo, daani children entha time theeskunnayo chupinche oka nested chart.

*   **Wide bars:** Ee component (and daani children) render avvadaniki ekkuva time pattindi.
*   **Tall bars:** Ee component chala deep ga nested ayyi undi.

Ee track lo, manam rendu important vishayalu chudochu:
1.  **Render Durations:** `Render` phase lo a a component entha sepu run ayyindo chupisthundi.
2.  **Effect Durations:** `Commit` and `Effects` phases lo, a a component యొక్క effects (`useLayoutEffect`, `useEffect`) entha sepu run ayyayo chupisthundi.

Ee rendu flamegraphs ki veru veru color schemes untayi, so manam easy ga distinguish cheyyochu.

### Finding Unnecessary Re-renders

Ee track loni oka super powerful feature entante, **"Changed props"**.
Development mode lo, meeru oka component render bar meeda click cheste, DevTools meeku chupisthundi:
*   "Ee component enduku re-render ayyindi?"
*   "Pata render ki, ee render ki madhyalo a a props maarayi?"

Ee information tho, manam anavasaramaina re-renders ni chala easy ga pattukovacchu. For example, oka object prop prathi sari kotthaga create avvadam valla re-render avuthunte, manam daanini `useMemo` tho fix cheyyochu.

### Special Events: Mount and Unmount

Ee track lo manaki inkonni special events kuda kanipisthayi:
*   **`Mount`**: Ee render lo, ee component first time DOM loki add aindi.
*   **`Unmount`**: Ee render lo, ee component DOM nunchi remove aindi.

Ee events tho, manam component యొక్క full lifecycle ni trace cheyyochu.

So, Scheduler track manaki "big picture" isthe, Components track manaki "zoomed-in" view isthundi, helping us pinpoint exactly which components are our performance bottlenecks.

Next, manam Server Components kosam unna special tracks gurinchi chuddam! ➡️☁️