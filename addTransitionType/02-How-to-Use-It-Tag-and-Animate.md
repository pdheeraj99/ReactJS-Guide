# How to Use It: The Two-Step "Tag & Animate" Process 🏷️➡️🎨

Directional animations ni `addTransitionType` tho create cheyadam anedi oka simple two-step process.

1.  **Step 1: Tag the Transition:** Event handler lo, `startTransition` lopalana, state update cheyyaka mundu, `addTransitionType` tho transition ni "tag" cheyyali.
2.  **Step 2: Configure the Animation:** `<ViewTransition>` component ki, `enter` or `exit` lanti props ki, oka object pass chesi, aa tag ni oka CSS class ki map cheyyali.

Ee rendu steps ni detail ga chuddam.

### Step 1: Tagging the Transition

First, manam `startTransition` and `addTransitionType` ni import cheskovali.
```javascript
import { startTransition, unstable_addTransitionType as addTransitionType } from 'react';
```
(Note: `unstable_` prefix undi kabatti, manam daanini `addTransitionType` la alias cheskovadam common practice).

Ippudu, mana event handler lo, state update ni wrap chese `startTransition` lopalana, manam `addTransitionType` ni call chestam.

```jsx
const handleNextClick = () => {
  startTransition(() => {
    // 1. Add a "tag" to this specific transition
    addTransitionType('forward');
    // 2. Then update the state
    setCurrentPage(page => page + 1);
  });
};

const handleBackClick = () => {
  startTransition(() => {
    // 1. Add a DIFFERENT "tag" for this transition
    addTransitionType('back');
    // 2. Then update the state
    setCurrentPage(page => page - 1);
  });
};
```
Ippudu, "Next" click chesinappudu start ayye transition ki `'forward'` ane label untundi. "Back" click cheste `'back'` ane label untundi.

### Step 2: Configuring `<ViewTransition>`

Ippudu manam mana `<ViewTransition>` component ki ee tags ni ela use cheyalo cheppali.

Normal ga, manam `enter="my-class"` ani oka string pass chestam. Kani ippudu, manam oka **object** pass chestam. Ee object, transition type ni CSS class ki map chesthundi.

```jsx
<ViewTransition
  enter={{
    'forward': 'slide-in-from-right',
    'back': 'slide-in-from-left',
  }}
  exit={{
    'forward': 'slide-out-to-left',
    'back': 'slide-out-to-right',
  }}
>
  {/* The content that changes */}
  <PageComponent page={currentPage} />
</ViewTransition>
```

**What's happening here?**
*   Manam `enter` prop ki oka object icham.
*   Okavela transition `'forward'` tag tho trigger aite, React ventane `slide-in-from-right` ane CSS class ni apply chesthundi.
*   Okavela transition `'back'` tag tho trigger aite, `slide-in-from-left` ane class ni apply chesthundi.
*   The same logic applies to the `exit` prop.

Ee setup tho, manam oke `<ViewTransition>` component tho, different user actions ki, different animations ni dynamically apply cheyochu!

```mermaid
graph TD
    A[User clicks "Next"] --> B["startTransition(<br>  addTransitionType('forward')<br>)"];
    B --> C["<ViewTransition enter={{'forward': 'slide-in-from-right'}}>"];
    C --> D{React sees 'forward' tag};
    D --> E[Applies `.slide-in-from-right` CSS class];
    E --> F[Animation plays from right to left!];

    G[User clicks "Back"] --> H["startTransition(<br>  addTransitionType('back')<br>)"];
    H --> I["<ViewTransition enter={{'back': 'slide-in-from-left'}}>"];
    I --> J{React sees 'back' tag};
    J --> K[Applies `.slide-in-from-left` CSS class];
    K --> L[Animation plays from left to right!];

    style F fill:#d4edda
    style L fill:#d4edda
```

Ippudu ee technique ni use chesi, oka simple page-by-page navigation example ni code lo ela rayalo chuddam. Get ready to see it in action! 🎬➡️