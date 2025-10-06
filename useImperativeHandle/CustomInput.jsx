import React, { forwardRef, useRef, useImperativeHandle } from 'react';

/*
  Ee file lo manam rendu versions of CustomInput ni create cheddam
  to compare the behavior.
*/

// --- 1. The "Dangerous" Way (Just forwardRef) ---
// Ee component parent ki lopaala unna <input> DOM node ni
// antha expose chesthundi.
export const CustomInputDefault = forwardRef(function CustomInputDefault(props, ref) {
  return (
    <div className="form-field">
      <label>{props.label}</label>
      <input ref={ref} {...props} />
    </div>
  );
});


// --- 2. The "Safe" Way (useImperativeHandle) ---
// Ee component parent ki kevalam manam define chesina
// methods matrame unna oka custom "handle" ni expose chesthundi.
export const CustomInputWithHandle = forwardRef(function CustomInputWithHandle(props, ref) {
  // Step 1: Lopaala unna DOM node kosam oka internal ref create cheyyali.
  const internalInputRef = useRef(null);

  // Step 2: useImperativeHandle tho custom handle ni define cheyyali.
  useImperativeHandle(ref, () => {
    // Parent ki ee object matrame velthundi.
    return {
      focus() {
        console.log('Focusing input via custom handle!');
        internalInputRef.current.focus();
      },
      clear() {
        console.log('Clearing input via custom handle!');
        internalInputRef.current.value = '';
      },
      // Note: Parent `ref.current.style` lantiవి access cheyyaledu.
    };
  }, []);

  // Step 3: Internal ref ni DOM element ki pass cheyyali.
  return (
    <div className="form-field">
      <label>{props.label}</label>
      <input ref={internalInputRef} {...props} />
    </div>
  );
});