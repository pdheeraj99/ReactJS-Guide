import ThemedButtonWithHook from './ThemedButtonWithHook';
import ThemedButtonWithConsumer from './ThemedButtonWithConsumer';

/**
 * Idi oka middle-man component.
 * Deeniki `theme` gurinchi emi teliyadu. Adi props kuda teeskodu.
 *
 * Kani, deeni lopalina unna components (`ThemedButton...`)
 * direct ga paina unna `Provider` nunchi `theme` value ni
 * access cheyagalavu.
 *
 * This is the magic of context - it avoids "prop drilling".
 */
export default function Toolbar() {
  return (
    <div className="toolbar">
      <ThemedButtonWithHook />
      <ThemedButtonWithConsumer />
    </div>
  );
}