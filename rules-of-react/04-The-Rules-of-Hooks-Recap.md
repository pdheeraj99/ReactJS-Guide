# Rule 3: The Rules of Hooks (A Recap) 훅

Hey mawa! Manam `eslint-plugin-react-hooks` chapter lo ee rules gurinchi chala in-depth ga nerchukunnam. Ikkada, manam vaatini malli okasari gurtu cheskundam, endukante avi "Rules of React" loni most important part.

Hooks anevi normal JavaScript functions la kanipinchina, avi special. Vaati correct functioning kosam, manam rendu rules ni strictly follow avvali.

### 1. Only Call Hooks at the Top Level

*   **The Rule:** Hooks ni eppudu loops, conditions (`if`), or nested functions lopaala call cheyyakudadu.
*   **The "Why":** React prathi render lo, hooks anni oke order lo call avuthayi ani expect chesthundi. Ee consistent order valla ne, adi `useState` lanti hooks యొక్క state ni correctly preserve cheyyagalugutundi. Call order maarithe, React confuse aipothundi.
*   **For a deep dive:** Check out our detailed explanation in the **[Rules of Hooks lint documentation](../eslint-plugin-react-hooks/rules-of-hooks/01-The-First-Rule-Only-Call-Hooks-at-the-Top-Level.md)**.

### 2. Only Call Hooks from React Functions

*   **The Rule:** Hooks ni kevalam React Function Components nunchi or custom Hooks nunchi matrame call cheyyali. Normal JavaScript functions nunchi call cheyyakudadu.
*   **The "Why":** Hooks pani cheyyali ante, vaatiki "currently rendering component" యొక్క context kavali. Appude, adi a a state a a component ki chendinadi ani theluskogalugutundi. Normal JS functions ki ee context undadu.
*   **For a deep dive:** Check out our detailed explanation in the **[Rules of Hooks lint documentation](../eslint-plugin-react-hooks/rules-of-hooks/02-The-Second-Rule-Only-Call-Hooks-from-React-Functions.md)**.

Ee moodu golden rules (Purity, Let React Call, and Rules of Hooks) anevi React philosophy ki foundation. Veetini manam ardham cheskuni, follow aithe, manam better, faster, and more predictable applications ni build cheyyagalam! ✨

Happy coding, mawa! 🚀