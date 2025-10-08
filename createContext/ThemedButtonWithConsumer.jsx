import { ThemeContext } from './ThemeContext';

/**
 * Idi context ni consume cheyadaniki pata (legacy) way.
 * Hooks raka mundu, ila "render prop" pattern lo rasevaru.
 *
 * 1. Manam `<ThemeContext.Consumer>` component ni vadali.
 * 2. Daani child ga, manam oka function ni pass cheyyali.
 * 3. React, aa function ni call chesi, context value ni argument ga (`theme`) isthundi.
 * 4. Aa function, final JSX ni return chesthundi.
 *
 * Ee pattern chala verbose ga untundi, anduke ippudu `useContext` hook ni prefer chestam.
 */
export default function ThemedButtonWithConsumer() {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <button className={`btn ${theme}`}>
          Legacy Button (Consumer)
        </button>
      )}
    </ThemeContext.Consumer>
  );
}