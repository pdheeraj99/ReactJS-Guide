import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

/*
  Hey! Ee file lo manam `useEffect` vs `useLayoutEffect` ki madhyalo
  unna visual difference ni chuddam.
*/

// --- The Tooltip Component ---
// Ee component `useFlicker` ane prop theeskuntundi.
// `true` aithe, `useEffect` vaduthundi (flicker kanipisthundi).
// `false` aithe, `useLayoutEffect` vaduthundi (flicker undadu).
function Tooltip({ children, targetRect, useFlicker }) {
  const tooltipRef = useRef(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  // Choose which effect to use based on the prop
  const useCorrectEffect = useFlicker ? useEffect : useLayoutEffect;

  useCorrectEffect(() => {
    if (targetRect && tooltipRef.current) {
      const { height: tooltipHeight } = tooltipRef.current.getBoundingClientRect();
      const { left, bottom } = targetRect;

      // Calculate position
      const newPosition = {
        top: bottom + 5, // 5px below the button
        left: left,
      };

      console.log(`(${useFlicker ? 'useEffect' : 'useLayoutEffect'}) Measuring and setting position.`);
      setTooltipPosition(newPosition);
    }
  }, [targetRect, useFlicker]);

  // Artificially slow down rendering to make the flicker more noticeable
  const startTime = performance.now();
  while (performance.now() - startTime < 3) {
    // Do nothing for 3ms
  }

  return (
    <div
      ref={tooltipRef}
      style={{
        position: 'absolute',
        top: tooltipPosition.top,
        left: tooltipPosition.left,
        padding: '5px',
        backgroundColor: '#333',
        color: 'white',
        borderRadius: '4px',
        pointerEvents: 'none', // So it doesn't block mouse events
      }}
    >
      {children}
    </div>
  );
}


// --- Main App Component ---
export default function App() {
  const [show, setShow] = useState(false);
  const [targetRect, setTargetRect] = useState(null);
  const buttonRef = useRef(null);

  function handlePointerEnter() {
    const rect = buttonRef.current.getBoundingClientRect();
    setShow(true);
    setTargetRect(rect);
  }

  function handlePointerLeave() {
    setShow(false);
    setTargetRect(null);
  }

  const appStyle = {
    fontFamily: 'sans-serif',
    padding: '20px',
  };

  return (
    <div style={appStyle}>
      <h1>useLayoutEffect vs useEffect Demo</h1>
      <p>
        Hover over the two buttons below. Notice how the tooltip on the LEFT
        "flickers" or "jumps" into place, while the tooltip on the RIGHT
        appears smoothly in the correct position.
      </p>
      <hr />
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '50px' }}>

        {/* The "Wrong" Way - with useEffect */}
        <button ref={buttonRef} onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave}>
          Hover me (Flickers with useEffect)
        </button>
        {show && (
          <Tooltip targetRect={targetRect} useFlicker={true}>
            This flickers!
          </Tooltip>
        )}

        {/* The "Right" Way - with useLayoutEffect */}
        {/* Note: This is a simplified example. In a real app, you'd manage multiple refs. */}
        <button onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave}>
          Hover me (Smooth with useLayoutEffect)
        </button>
        {show && (
          <Tooltip targetRect={targetRect} useFlicker={false}>
            This is smooth!
          </Tooltip>
        )}

      </div>
    </div>
  );
}