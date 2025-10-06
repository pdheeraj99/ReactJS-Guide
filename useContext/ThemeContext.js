import { createContext } from 'react';

/*
  Hey! Idi mana Step 1: Context ni Create Cheyyadam.

  Manam `createContext` function ni call chesi, oka context object ni
  create chesthunnam.

  Ee `ThemeContext` object lo rendu parts untayi:
  1. ThemeContext.Provider: Data ni andinche component.
  2. ThemeContext.Consumer: Data ni theeskune (pata) way. Manam deeniki
     badulu `useContext` hook vadatham.

  `'light'` anedi default value. Oka vela manam Provider ni use
  cheyyadam marchipothe, app crash avvakunda, ee default value
  use avuthundi.
*/
export const ThemeContext = createContext('light');