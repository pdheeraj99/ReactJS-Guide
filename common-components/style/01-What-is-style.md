# `<style>`: CSS Rules ni Direct ga Inject Cheyyadam 🎨

Hey friend! Manam styles ni external `.css` files (`<link>`) nunchi load cheyyadam chusam. Kani konni sarlu, manaki konni dynamic styles avasaram untayi, or manam oka chinna component ki matrame apply ayye konni specific styles rayali anukuntam.

Ilanti situations lo, manam `<style>` component ni use chesi, CSS rules ni direct ga mana React component lopaala nunchi inject cheyyochu.

### How does it work?

`<style>` component lopaala, manam CSS text ni oka string laaga pass chestham. Ee string ni template literals (`` ` ``) lopaala rayadam best practice, endukante adi multi-line strings ni easy ga handle chesthundi.

```jsx
<style>
  {`
    .special-button {
      background-color: blue;
      color: white;
    }
    p {
      font-style: italic;
    }
  `}
</style>
```

### React's Special Magic (with conditions)

`<link>` and `<script>` laage, React `<style>` component ki kuda konni special powers isthundi, kani deeniki kuda **konni conditions apply avuthayi.**

React can move `<style>` tags to the `<head>` and deduplicate them, but only if you follow a specific rule:
> **You must provide both `href` and `precedence` props to the `<style>` tag.**

*   `children`: The CSS code itself.
*   `href`: Ee style block ki oka **unique ID** laantidi. React ee `href` ni chusi, ide style block malli render aithe, daanini ignore (deduplicate) chesthundi.
*   `precedence`: External stylesheets (`<link>`) laage, ee inline style block యొక్క rank ento chepthundi, so that React can correctly order it with other stylesheets.

**Important Note:** Meeru `href` and `precedence` ivvakapothe, `<style>` tag ki elanti special magic undadu. Adi `<head>` loki move avvadu and deduplicate kuda avvadu. Adi meeru ekkada render cheste, akkade DOM lo place avuthundi.

Asalu ee `href` and `precedence` props ni component-scoped styles create cheyadaniki ela vadatham? Ee advanced usage gurinchi next chapter lo chuddam. Let's get specific! 🎯➡️