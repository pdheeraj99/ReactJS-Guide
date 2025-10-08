import { use } from 'react';
import { ThemeContext } from './ThemeContext';

/**
 * Idi `use` hook ni context tho ela vadalo chupinche component.
 *
 * The SUPERPOWER of `use`:
 * Manam `use(ThemeContext)` ni oka `if` block lopalana call chestunnam!
 * Idi pata hooks (like `useContext`) tho possible kadu.
 *
 * Deeni valla, manam `show` prop `true` aite ne context ni read chestam,
 * which can be a performance optimization.
 */
export default function ThemedBox({ show, children }) {
  // `show` prop `true` aite ne, manam theme ni teeskuntunnam.
  if (show) {
    const theme = use(ThemeContext);
    return (
      <section className={`themed-box ${theme}`}>
        <p>I am a themed box! My theme is: <strong>{theme}</strong></p>
        {children}
      </section>
    );
  }

  // `show` false aite, manam emi render cheyyatledu and context ni kuda read cheyyatledu.
  return null;
}