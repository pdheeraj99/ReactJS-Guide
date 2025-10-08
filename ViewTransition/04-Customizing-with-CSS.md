# Customizing Animations with CSS 🎨

Default ga vache cross-fade animation baguntundi, kani manam inka creative ga undalankunte? What if we want elements to slide in, zoom out, or rotate?

Good news! `<ViewTransition>` manaki ee animations ni customize cheyadaniki full control isthundi. Manam ee pani CSS tho chestam.

## The "View Transition Class" Props

Animation ni customize cheyadaniki, manam `<ViewTransition>` component ki konni special props pass chestam. Ee props lo manam oka CSS class name ni istham.

Common props include:
*   `enter`: Component enter ayinappudu ee class apply avuthundi.
*   `exit`: Component exit ayinappudu ee class apply avuthundi.
*   `share`: Shared element transition jariginappudu ee class apply avuthundi.
*   `default`: Vere emi match kakapothe, ee class apply avuthundi.

**Example:**
```jsx
<ViewTransition enter="slide-in" exit="slide-out">
  <MyComponent />
</ViewTransition>
```
Ikkada, `MyComponent` enter ayinappudu, daani transition ki `slide-in` ane class add avuthundi. Exit ayinappudu `slide-out` class add avuthundi.

## Targeting Animations with CSS Pseudo-elements

React aa class ni add chesaka, manam daanini CSS lo target cheyyali. Kani, regular class selectors (`.slide-in`) kadu. View Transitions kosam konni special **pseudo-elements** unnayi.

Most important vi:
*   `::view-transition-old(.your-class)`: Pata view (screenshot) ni style cheyadaniki.
*   `::view-transition-new(.your-class)`: Kottha view (screenshot) ni style cheyadaniki.
*   `::view-transition-group(.your-class)`: Animation container ni style cheyadaniki.

### Let's Create a "Slide-in" Animation

Manam `slide-in` class tho enter animation ni ela create cheyalo chuddam.

**1. Define Keyframes:** First, CSS lo animation ni define cheddam.
```css
/* styles.css */

@keyframes slide-from-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-to-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
```

**2. Apply to Pseudo-elements:** Ippudu, ee animation ni `::view-transition-new` (kottha view) ki apply cheddam. Pata view ni kuda slide out cheddam.
```css
/* styles.css */

/* Old view (pata content) slide out avvali */
::view-transition-old(slide-in) {
  animation: 300ms ease-out both slide-to-left;
}

/* New view (kottha content) slide in avvali */
::view-transition-new(slide-in) {
  animation: 300ms ease-out both slide-from-right;
}
```

Anthe! Ippudu `<ViewTransition enter="slide-in">` use chesinappudalla, kottha content right nunchi slide in avuthundi, and pata content left ki slide out avuthundi.

```mermaid
graph TD
    A[JSX: `<ViewTransition enter="slide-in">`] --> B{React adds `.slide-in` class during transition};
    B --> C[CSS: `::view-transition-new(.slide-in)` selector matches];
    C --> D[CSS applies `@keyframes slide-from-right`];
    D --> E[✨ Custom Animation Plays!];

    style E fill:#d4edda
```

Ee technique tho, manam entha complex animation ayina create cheyochu. The only limit is your imagination (and your CSS skills 😉).

This concludes our journey into the exciting world of `<ViewTransition>`. You now have the power to create beautiful, fluid, and engaging user experiences in your React apps. Happy animating! 🚀🎉