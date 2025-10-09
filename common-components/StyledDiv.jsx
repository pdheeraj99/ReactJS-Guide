import React from 'react';

/**
 * Idi oka simple wrapper component.
 * Idi `className` and `style` props ni teeskuni,
 * daanini lopalina unna `div` ki apply chesthundi.
 *
 * Ee example, React lo styling props ni ela dynamically
 * pass cheyalo chupisthundi.
 */
export default function StyledDiv({ className, style, children }) {
  return (
    // The received props are passed directly to the underlying div element.
    <div className={`styled-div ${className}`} style={style}>
      {children}
    </div>
  );
}