# Advanced `<style>`: Hoisting and Deduplication 🚀

Hey mawa! Last chapter lo manam `<style>` tag ki `href` and `precedence` isthe, React daaniki special magic apply chesthundani cheppukunnam. Ippudu aa magic ento, and daanini ela use cheyyalo chuddam.

Ee special behavior ni "opt-in" cheyadaniki, manam rendu props ivvali:
1.  **`precedence`**: `<link>` tag lo laage, idi ee style block యొక్క rank ni define chesthundi, so that React can order it correctly with other stylesheets in the `<head>`.
2.  **`href`**: Idi chala interesting. `<style>` tag ki `src` undadu, so manam `href` ni oka **unique identifier** la vadatham. React ee ID ni chusi, ide ID tho inko `<style>` block render aithe, daanini ignore chesthundi (deduplication).

### Use Case: Dynamic, Component-Scoped Styles

Imagine, manam oka `StyledBox` ane component create chestunnam. Adi `color` ane prop theeskuni, aa color tho border and background set cheyyali.

Manam prathi `StyledBox` instance ki, daani specific CSS ni generate chesi, `<style>` tag tho inject cheyyochu.

```jsx
function StyledBox({ color }) {
  const css = `
    .box-${color} {
      border: 2px solid ${color};
      background-color: ${color}20;
    }
  `;

  return (
    <>
      <style
        href={`/css/styled-box-${color}`} // Unique ID for this color
        precedence="medium"
      >
        {css}
      </style>
      <div className={`box-${color}`}>
        This box is styled with the color {color}.
      </div>
    </>
  );
}

// How to use it:
<StyledBox color="blue" />
<StyledBox color="green" />
<StyledBox color="blue" /> // Another blue box!
```

### What's the Magic? ✨

1.  **Hoisting:** Manam `precedence` icham kabatti, React ee `<style>` tags anni theeskuni, final HTML lo `<head>` section loki move chesthundi.
2.  **Deduplication:** Manam `href` icham kabatti, React chala smart ga pani chesthundi. Ikkada manam rendu "blue" boxes create chesam. React `/css/styled-box-blue` ane `href` tho unna style tag ni *first time* chusinappudu, daanini `<head>` lo peduthundi. Second time, ade `href` tho inko `<style>` tag kanipinchi nప్పుడు, "Oh, idi already undi" ani anukuni, daanini **ignore** chesthundi.

**The result:** Mana final `<head>` lo, `styled-box-blue` ki oka style tag, and `styled-box-green` ki inko style tag matrame untayi. No duplicate CSS!

Ee pattern CSS-in-JS libraries lopaala chala common ga use chestharu. It allows for creating dynamic, component-level styles without bloating the DOM with duplicate style tags.

Ippudu, ee concepts anni kalipi, code examples lo chuddam! 💻➡️