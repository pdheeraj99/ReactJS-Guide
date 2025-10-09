# `resumeAndPrerender`: The Multi-Stage Relay Race 🏃‍♀️→🏃‍♂️→🏃‍♀️

Hey mawa! Manam `prerender` and `resume` gurinchi nerchukunnam. Adi oka two-stage relay race laantidi.

Ippudu, inka complex and advanced scenario ni imagine cheskondi. Manam race ni rendu stages lo kadu, **three or more stages** lo run cheyyali anukuntunnam.

`resumeAndPrerender` anedi ee advanced pattern ni enable chesthundi.

### What does `resumeAndPrerender` do?

Deeni peru lone daani pani undi: "Resume the previous render, and then continue to prerender more static content."

> **`resumeAndPrerender` takes a `postponedState` from a previous `prerender` or `resumeAndPrerender` call, continues rendering from where it left off, and then pauses again if it hits another dynamic boundary, producing a *new* `postponedState`.**

### Analogy: The Multi-Stage Rocket Launch 🚀

1.  **`prerender` (Stage 1 Booster):** Build time lo, ee booster app ni launch chesi, static shell antha generate chesi, atmosphere bayataki teeskelli, aagipothundi. Adi oka `postponedState` ni isthundi.

2.  **`resumeAndPrerender` (Stage 2 Booster):** Ippudu, inko server (or process) aa `postponedState` ni theeskuni, rendering ni resume chesthundi. Idi inkonni static parts (like a generic product list) ni render chesi, user-specific part (`<Suspense>` for user data) daggaraki రాగానే, malli **pause** avuthundi. Idi manaki inko, *updated* `postponedState` isthundi.

3.  **`resume` (Final Stage):** Finally, user request chesinappudu, mana edge server ee second `postponedState` ni theeskuni, user-specific data tho rendering ni complete chesi, final HTML ni stream chesthundi.

### Why is this useful?

Ee pattern chala rare and complex. Idi kevalam chala pedda, distributed systems lo matrame use avuthundi, ekkada ante rendering process anedi multiple servers or stages madhyalo divide avuthundo.

**The key takeaway:**
> **Use `resumeAndPrerender` when you need to continue a paused render to add *more static content* before the final dynamic resume.**

For almost all use cases, the simple `prerender` -> `resume` pattern is enough.

Ippudu, ee multi-stage rocket launch ni oka conceptual example tho chuddam. Let's go! 🚀➡️