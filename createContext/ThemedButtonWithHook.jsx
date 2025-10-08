import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

/**
 * Idi context ni consume cheyadaniki modern and recommended way.
 *
 * 1. `useContext` hook ni import cheskovali.
 * 2. `useContext()` ni call chesi, daaniki mana `ThemeContext` object ni pass cheyyali.
 * 3. Adi manaki direct ga provider nunchi `value` ni isthundi.
 *
 * Ee code chala clean ga, readable ga untundi.
 */
export default function ThemedButtonWithHook() {
  // Just one line to get the theme value!
  const theme = useContext(ThemeContext);

  return (
    <button className={`btn ${theme}`}>
      Modern Button (useContext)
    </button>
  );
}