import { useInsertionEffect } from 'react';

/*
  Hey! Idi mana custom hook: `useMyStyles`.
  Idi oka mini CSS-in-JS library laaga pani chesthundi (for demonstration).
*/

// In a real library, this would be more sophisticated.
// Manam ippudu just oka simple Set theeskundam to track inserted styles.
const insertedRules = new Set();

function getStyleTag(className, css) {
  const style = document.createElement('style');
  style.innerHTML = `.${className} { ${css} }`;
  style.setAttribute('data-style-for', className);
  return style;
}

export function useMyStyles(className, css) {
  /*
    THE MAGIC PART ✨
    -----------------
    Manam `useInsertionEffect` ni use chesthunnam. Ante, ee lopaala unna
    code React DOM ni update cheyyaka MUNDHE run avuthundi.

    Deenivalla, React oka component ni (e.g., <button>) DOM lo pettinappudu,
    daaniki కావలసిన CSS class rule anedi already `<head>` lo ready ga untundi.
    So, browser eppudu unstyled content ni chudadu. No flicker!
  */
  useInsertionEffect(() => {
    // Ee style rule inka inject avvakapothe...
    if (!insertedRules.has(className)) {
      //...inject cheyyi.
      insertedRules.add(className);
      console.log(`Injecting style for: .${className}`);
      document.head.appendChild(getStyleTag(className, css));
    }
  }, [className, css]);

  // Finally, manam className ni return chestham, so component daanini vadukovachu.
  return className;
}