import React, { useRef } from 'react';
import { CustomInputDefault, CustomInputWithHandle } from './CustomInput.jsx';

/*
  Hey! Idi ee example ki main App component.
  Ikkada manam rendu versions of CustomInput ni use chesi,
  parent component ki em control untundo chuddam.
*/
export default function App() {
  const defaultRef = useRef(null);
  const handleRef = useRef(null);

  function handleDefaultFocus() {
    defaultRef.current.focus();
  }

  function handleDefaultStyleChange() {
    // This is DANGEROUS! The parent is directly changing the child's DOM.
    // This breaks encapsulation.
    defaultRef.current.style.backgroundColor = 'red';
    defaultRef.current.style.color = 'white';
  }

  function handleHandleFocus() {
    // This is SAFE! We are only calling the method the child exposed.
    handleRef.current.focus();
  }

  function handleHandleClear() {
    // This is also SAFE.
    handleRef.current.clear();
  }

  function handleHandleStyleChange() {
    try {
      // This will cause an ERROR!
      // The child did not expose the `style` property.
      handleRef.current.style.backgroundColor = 'red';
    } catch (err) {
      alert('Error! Cannot access "style". The child component did not expose it. This is good!');
      console.error(err);
    }
  }

  return (
    <div className="app-container">
      <h1>useImperativeHandle Demo</h1>
      <p>
        Compare the two components below. The first one exposes the entire DOM
        node, allowing the parent to change its style directly. The second one
        uses `useImperativeHandle` to expose only specific methods.
      </p>

      <div className="example-container">
        <h2>1. Default `forwardRef` (Unsafe)</h2>
        <CustomInputDefault
          ref={defaultRef}
          label="Unsafe Input:"
          placeholder="Parent can change my style"
        />
        <button onClick={handleDefaultFocus}>Focus</button>
        <button onClick={handleDefaultStyleChange}>Change Style (Danger!)</button>
      </div>

      <div className="example-container">
        <h2>2. `useImperativeHandle` (Safe)</h2>
        <CustomInputWithHandle
          ref={handleRef}
          label="Safe Input:"
          placeholder="Parent can only call my methods"
        />
        <button onClick={handleHandleFocus}>Focus (Exposed)</button>
        <button onClick={handleHandleClear}>Clear (Exposed)</button>
        <button onClick={handleHandleStyleChange}>Try to Change Style (Will Error)</button>
      </div>
    </div>
  );
}