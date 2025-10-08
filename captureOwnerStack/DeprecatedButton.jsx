import React, { useEffect } from 'react';
import { logWarning } from './logger';

/**
 * Idi oka "deprecated" component anukundam.
 * Ee component ni evaraina vadithe, manam వాళ్ళకి oka helpful
 * warning chupinchali.
 *
 * Manam `useEffect` lo `logWarning` ni call chestunnam.
 * `useEffect` anedi React context lo run avuthundi kabatti,
 * lopalina `captureOwnerStack` correct ga pani chesthundi.
 */
export default function DeprecatedButton({ children, ...props }) {
  useEffect(() => {
    // Call our logger with a specific message for this component.
    logWarning(
      '`DeprecatedButton` is out of date. Please use `<NewShinyButton>` for better performance and a11y features.'
    );
    // The empty dependency array [] ensures this effect runs only once when the component mounts.
  }, []);

  // It still functions as a normal button.
  return <button {...props}>{children}</button>;
}