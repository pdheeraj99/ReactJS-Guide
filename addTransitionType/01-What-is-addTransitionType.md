# `addTransitionType`: The "Special Instruction" for Animations 🏷️

Hey friend! Manam `<ViewTransition>` gurinchi nerchukunnam. Adi oka view nunchi inko view ki smoothly animate cheyadaniki help chesthundi. Super cool!

Kani, oka situation imagine cheskondi. Manam oka multi-step form or a wizard lo unnam.
*   "Next" button click cheste, kottha page right nunchi slide in avvali.
*   "Back" button click cheste, pata page left nunchi slide in avvali.

`<ViewTransition>` tho, default ga, manam oke rakamaina animation (e.g., a simple fade) ni define cheyagalam. Kani manaki ippudu **context-aware animations** kavali. The animation should be different based on *how* the user got there.

### The Problem: One Animation for All

Manaki oka way kavali, React ki ila cheppadaniki: "Hey, idi 'forward' navigation, so slide-left animation play cheyyi. Oh, wait, idi 'back' navigation, so slide-right animation play cheyyi."

Ee "special instruction" or "tag" ni add cheyadanike, React manaki **`unstable_addTransitionType`** ane oka advanced API ni isthundi.

> **`unstable_addTransitionType`** is a function that you call *inside* a `startTransition` block to add a string "tag" or "label" to that specific transition.

**Analogy: The Shipping Label 📦**
Imagine, `<ViewTransition>` anedi oka delivery service. Meeru daaniki oka package isthunnaru.
*   Default ga, adi anni packages ni oke la handle chesthundi.
*   Kani, `addTransitionType` tho, meeru aa package meeda oka special label (`'FRAGILE'`, `'EXPRESS'`) antinchachu.
*   Ippudu delivery service (`<ViewTransition>`) aa label ni chusi, "Oh, idi EXPRESS package, deenini fast ga, vere route lo teeskellali" ani decide avuthundi.

`addTransitionType` kuda, mana transition ki alanti oka label ni add chesthundi.

```mermaid
graph TD
    A[User clicks "Next"] --> B["startTransition(<br>  addTransitionType('forward')<br>)"];
    C[User clicks "Back"] --> D["startTransition(<br>  addTransitionType('back')<br>)"];

    subgraph "<ViewTransition>"
        B --> E{Sees 'forward' tag};
        E --> F[Applies 'slide-from-right' animation];

        D --> G{Sees 'back' tag};
        G --> H[Applies 'slide-from-left' animation];
    end

    style F fill:#d4edda
    style H fill:#d4edda
```

### ⚠️ Important Note: Unstable!

Ee API peru lo `unstable_` undani gamaninchandi. Idi inka experimental phase lo undi and future lo maaradaniki chala chances unnayi. So, idi kevalam learning and advanced use cases kosam matrame.

Ippudu, ee "tagging" system ni code lo practically ela implement cheyalo, a a two-step process ento, next chapter lo chuddam! Ready to become an animation master? 🥷➡️