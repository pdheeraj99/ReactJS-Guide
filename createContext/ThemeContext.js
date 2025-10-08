import { createContext } from 'react';

/**
 * Manam ikkada 'ThemeContext' ni create chestunnam.
 *
 * `createContext()` ki manam pass chese 'light' anedi the
 * **default value**.
 *
 * Okavela, oka component ee context ni access cheyadaniki try chesi,
 * daani paina unna tree lo `<ThemeContext.Provider>` lekapothe,
 * appudu ee default value 'light' vastundi.
 */
export const ThemeContext = createContext('light');