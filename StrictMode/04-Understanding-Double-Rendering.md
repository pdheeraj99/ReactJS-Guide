# Double Rendering: Feature aa, Leka Bug aa? 🧐

Ok friends, `<StrictMode>` gurinchi matladukunnappudu, "components ni rendu sarlu render chesthundi" ane vishayam vinagane konchem tension padadam common. "Ayyo! Idi performance ni debba teestunda? Enduku ila?" anipisthundi.

Let's clear the air: **Double rendering is a feature, not a bug!** Idi kevalam development lo jarugutundi and production build meeda elanti effect chupadu. 😌

## Asalu Enduku ee Double Rendering?

Deeni వెనకున్న oka pedda reason undi: **To enforce purity.**

React lo golden rule entante, **components must be pure functions.**

> **Pure Function ante enti?**
> 1.  **Same input, same output:** Daaniki icche inputs (props, state) maar నంత వరకు, adi eppudu oke rakamaina output (JSX) ni ivvali.
> 2.  **No side effects:** Adi tana pani tanu chesukovali thappa, bayata prapanchanni (external variables, objects) marchakudadu. Render process lo props ni or state ni direct ga mutate cheyyakudadu.

Ee purity rule ni manam follow avakapothe, mana app lo unpredictable bugs vastayi.

`<StrictMode>` ee purity ni test cheyadanike mee components ni rendu sarlu render chesthundi.

```mermaid
graph TD
    subgraph Impure Component (Buggy)
        A(First Render) --> B[Mutates original data];
        B --> C(Second Render);
        C --> D[Mutates data AGAIN!];
        D --> E{💥 Unexpected Result!};
    end

    subgraph Pure Component (Correct)
        F(First Render) --> G[Works on a copy];
        G --> H(Second Render);
        H --> I[Works on a fresh copy];
        I --> J{✅ Consistent Result!};
    end

    style E fill:#ffcccc
    style J fill:#ccffcc
```

### Chuddam oka Example tho

Imagine, manaki oka component undi, adi props lo vachina list ki "Create" ane option add chesthundi.

**❌ The WRONG Way (Impure Component):**
Ee component direct ga `stories` prop ni modify (mutate) chesthundi.

```jsx
// ComponentWithSideEffects.jsx

// DON'T DO THIS! This component is impure.
export default function StoryTray({ stories }) {
  // Direct ga prop ni modify chestunnam. This is a side effect!
  stories.push({ id: 'create', label: 'Create Story' });

  return (
    <ul>
      {stories.map(story => <li key={story.id}>{story.label}</li>)}
    </ul>
  );
}
```

*   **Without Strict Mode:** Ee code first time sariggane kanipisthundi. Bug undani manaki teliyadu.
*   **With Strict Mode:** React ee component ni rendu sarlu render chesthundi. Appudu `stories.push` rendu sarlu run avuthundi, and "Create Story" list lo rendu sarlu kanipisthundi. **Bug bayata paddindi!** 🥳

**✅ The RIGHT Way (Pure Component):**
Prop ni direct ga marchakunda, daani oka copy create chesi, aa copy ni marchali.

```jsx
// Corrected Pure Component

export default function StoryTray({ stories }) {
  // Prop ni copy cheskunnam.
  const items = stories.slice();

  // Ippudu ee kottha copy ni modify chestunnam. Original prop is safe.
  items.push({ id: 'create', label: 'Create Story' });

  return (
    <ul>
      {items.map(story => <li key={story.id}>{story.label}</li>)}
    </ul>
  );
}
```
Ippudu ee component ni Strict Mode rendu sarlu render chesina, prathi sari adi oka kottha copy create cheskuntundi kabatti, output eppudu correct ga untundi.

So, next time meeru console lo mee component rendu sarlu log avvadam chuste, bhayapadakandi. Adi React manaki isthunna hint: "Hey, check your component. Make sure it's pure!"

Ee knowledge tho, manam ippudu `<StrictMode>` ni use chesi mana code lo bugs ni ela pattukovacho chuddam. Let's write some code! 💻➡️