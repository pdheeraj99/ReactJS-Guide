# `logger`: The Compiler's "CCTV Camera" 🎥

Hey mawa! React Compiler anedi oka "black box" laaga pani chesthundi. Manam daaniki mana code istham, adi manaki optimized code isthundi. Kani, a a black box lopaala asalu em jarugutundi?

*   Adi a a files ni compile chesindi?
*   Oka component enduku compile avvaledu? Specific error enti?
*   Prathi file ki entha time pattindi?

Ee questions ki answers teluskovadanike, manam `logger` option ni vadatham.

### What does `logger` do?

> **The `logger` option lets you provide a custom function that the compiler will call for every important event, giving you a detailed, behind-the-scenes look at the compilation process.**

Idi compiler ki oka CCTV camera or a running commentary pettadam laantidi. Prathi chinna vishayanni adi manaki report chesthundi.

### Why use it? (The "Why")

The main reason is **debugging**.

Imagine, compiler oka component ni optimize cheyyadam lo fail ayyindi. Console lo manaki pedda ga information rakapovacchu. But if you add a logger:

```javascript
// babel.config.js
{
  logger: {
    logEvent(filename, event) {
      if (event.kind === 'CompileError') {
        console.error(`\n❌ Error in ${filename}!`);
        console.error(`   Reason: ${event.detail.reason}`);
        console.error(`   Location: Line ${event.detail.loc.start.line}`);
      }
    }
  }
}
```

Ee logger manaki **exact error message, reason, and line number** isthundi. "Oh, ee component lo nenu `eval()` vadanu, anduke compiler ki adi ishtam ledu" ani manaki ventane ardham aipothundi.

Other use cases:
*   **Tracking Progress:** Meeru `CompileSuccess` events ni log chesi, mee codebase lo entha percentage of components successfully compile avuthunnayo track cheyyochu.
*   **Performance Analysis:** `Timing` events ni log chesi, compiler entha fast ga pani chesthundo, a a files ekkuva time theeskuntunnayo kanukovacchu.
*   **Tool Integration:** Meeru ee log events ni theeskuni, mee internal monitoring or dashboarding tools ki pampinchukovacchu.

**The key takeaway:**
> **`logger` is your best friend for debugging. When the compiler isn't behaving as you expect, a logger will tell you exactly what's going on under the hood.**

Next, manam `panicThreshold` tho, ee errors vachinappudu build ni em cheyyalo (fail cheyyala or continue avvala) ela control cheyyalo chuddam! ➡️🚦