# The Server Tracks: Server lo Em Jarugutundi? ☁️

Hey mawa! Manam ippativaraku chusina tracks anni client-side (browser) rendering ki sambandhinchinavi. Kani, manam React Server Components (RSC) vaduthunte? Server lo performance ela undi? A a data fetch avuthundi?

Ee questions ki answer cheyadanike, React DevTools manaki rendu special **Server Tracks** isthundi.

**Important Note:** Ee tracks kevalam **development mode** lo matrame kanipisthayi.

### 1. Server Requests Track

> **The "Server Requests" track visualizes all the asynchronous operations (Promises) that happen on the server during a render.**

Idi server యొక్క network activity ni chupisthundi.
*   `fetch` calls.
*   Database queries (`db.query(...)`).
*   File system operations (`fs.readFile(...)`).

Prathi bar oka Promise ni represent chesthundi. Meeru daani meeda click cheste, a a data resolve ayyindo, and aa operation ekkada start ayyindo (stack trace) chudochu. Red color lo unna bar ante, aa Promise reject ayyindani ardham.

Ee track tho, "Server lo a a data fetching slow ga undi?" ane question ki answer dorukutundi.

### 2. Server Components Track

> **The "Server Components" track visualizes how long each of your Server Components took to render on the server.**

Idi client-side "Components" track laantide, kani server kosam.
*   **Flamegraph:** Ee track kuda flamegraph lo untundi. Wide bars ante aa Server Component render avvadaniki ekkuva time pattindani.
*   **Promise Durations:** Meeru oka Server Component lopaala `await` chesthunna prathi Promise (e.g., a data fetch) kuda ikkada oka separate bar la kanipisthundi.
*   **Concurrency:** React Server Components ni parallel ga render cheyyagaligithe, manaki "Primary" track tho paatu "Parallel" tracks kuda kanipisthayi.

Ee track tho, "A a Server Component render avvadaniki ekkuva time theeskuntundi?" and "A a data dependency valla render slow avuthundi?" lanti questions ki answer dorukutundi.

Ee Server Tracks valla, manam mana app యొక్క full end-to-end performance (server + client) ni oke chota, oke timeline meeda analyze cheyyochu. This is incredibly powerful for debugging modern React applications.

Ippudu, ee tracks anni chudali ante, asalu Profiler ni ela use cheyyalo, oka quick guide chuddam! Let's get to it! ➡️🛠️