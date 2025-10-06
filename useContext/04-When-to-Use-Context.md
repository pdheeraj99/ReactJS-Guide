# Context ni Eppudu Vadali? (The Golden Rules) ✨

Manaki ippudu Context aney oka super power vachindi. Kani, "With great power comes great responsibility." 🕷️

Context ni eppudu padithe appudu vadakudadu. Adi state management ki silver bullet kadu. So, deenini eppudu vadali, eppudu vadakudadu anedi telusukundam.

## Ee Scenarios lo Context Perfect Choice ✅

Context anedi **"global-like" data** ni share cheyyadaniki best. Ante, app lo chala components ki avasaram ayye data, kani aa data frequent ga maaradu.

Konni classic examples:

*   **UI Theming:** App antha 'dark' or 'light' mode share cheyyadaniki. Ee theme user eppudo okasari marchutadu.
*   **Current Authenticated User:** Login aina user details (`name`, `email`, `avatar`) ni app antha chupinchadaniki. Ee data user logout ayye varaku maaradu.
*   **Language Preference:** User select cheskunna language ('en', 'te', 'hi') ni app antha pass cheyyadaniki.
*   **App Configuration:** App-level settings or configuration.

Ee scenarios lo unna common point entante, ee data **slow-ga maaruthundi** and **chala components ki avasaram** avuthundi.

## Ee Scenarios lo Context Vadakudadu ❌ (Be Careful!)

Context ni ee kindha situations lo vadithe, performance problems ravochu.

*   **High-Frequency State:** Chala frequent ga maaruthunna state (e.g., oka form lo unna input value prathi keystroke ki maaruthundi).
    *   **Enduku vadakudadu?** Context value maarina prathi sari, aa context ni consume chesthunna *anni* components re-render avuthayi. Form input lanti state ni context lo pedithe, prathi keystroke ki app lo chala components anavasaranga re-render avuthayi. App chala slow aipothundi.
*   **Simple Component State:** Parent nunchi child ki, or child nunchi parent ki data pass cheyyadaniki. Deeniki normal props and callback functions eh better. Prop drilling (1-2 levels) unnantha matrana Context vadalsina avasaram ledu.

**Rule of Thumb:** State ni component ki వీలైనంత daggara ga unchadaniki try cheyyi. Lift state up only when necessary. Context anedi last resort, data ni chala deep ga pass cheyyalsi vachinappudu matrame.

## Context vs. State Management Libraries (Redux, Zustand)

"Mari intha complex state unte em cheyyali?" anukuntunnava?

Appudu manam Redux, Zustand, Jotai lanti dedicated **state management libraries** vaadatham. Eevi Context kanna inka powerful and performance kosam inka better optimizations isthayi.

*   **Context:** Built-in in React, simple "global" data share cheyyadaniki best.
*   **State Management Libraries:** Pedda, complex applications lo, chala frequent ga maaruthunna state ni handle cheyyadaniki best.

```mermaid
graph TD
    A{Do I need to share state?} --> B[No, it's local state];
    A --> C{Yes};
    C --> D{Is it needed by many components at different levels?};
    D --> E[No, just parent-child];
    D --> F[Yes];
    F --> G{Does it change very often?};
    G --> H[No (e.g., theme, user)];
    G --> I[Yes (e.g., complex form state)];

    subgraph "Use Local State & Props"
        B
        E
    end

    subgraph "Good case for useContext ✅"
        H
    end

    subgraph "Consider a State Management Library (Redux, etc.) 🤔"
        I
    end

    style H fill:#c1f0c1,stroke:#333
```

And that's it for the theory of `useContext`! Ippudu neeku adi enduku, ela, and most importantly, **eppudu** vadalo full clarity vachindi anukuntunna.

Next, manam ee concepts anni kalipi, oka full, runnable code example create cheddam. Ready to build the theme-switcher app? 💻🎨➡️