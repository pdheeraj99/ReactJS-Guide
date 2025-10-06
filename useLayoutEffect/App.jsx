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
  const [tooltipPosition, setTooltipPosition] = useState({ top: -1000, left: 0 });

  // Choose which effect to use based on the prop
  const useCorrectEffect = useFlicker ? useEffect : useLayoutEffect;

  useCorrectEffect(() => {
    if (targetRect && tooltipRef.current) {
      const { height: tooltipHeight } = tooltipRef.current.getBoundingClientRect();
      const { left, bottom, top } = targetRect;

      let newTop = bottom + 5; // Position below by default
      // Check if it fits below the button, if not, place it above
      if (newTop + tooltipHeight > window.innerHeight) {
        newTop = top - tooltipHeight - 5;
      }

      const newPosition = {
        top: newTop,
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
  const [showFlicker, setShowFlicker] = useState(false);
  const [targetRectFlicker, setTargetRectFlicker] = useState(null);
  const flickerButtonRef = useRef(null);

  const [showSmooth, setShowSmooth] = useState(false);
  const [targetRectSmooth, setTargetRectSmooth] = useState(null);
  const smoothButtonRef = useRef(null);

  const appStyle = {
    fontFamily: 'sans-serif',
    padding: '20px',
    textAlign: 'center'
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
        <button
          ref={flickerButtonRef}
          onPointerEnter={() => {
            const rect = flickerButtonRef.current.getBoundingClientRect();
            setShowFlicker(true);
            setTargetRectFlicker(rect);
          }}
          onPointerLeave={() => {
            setShowFlicker(false);
            setTargetRectFlicker(null);
          }}
        >
          Hover me (Flickers with useEffect)
        </button>
        {showFlicker && (
          <Tooltip targetRect={targetRectFlicker} useFlicker={true}>
            This flickers!
          </Tooltip>
        )}

        {/* The "Right" Way - with useLayoutEffect */}
        <button
          ref={smoothButtonRef}
          onPointerEnter={() => {
            const rect = smoothButtonRef.current.getBoundingClientRect();
            setShowSmooth(true);
            setTargetRectSmooth(rect);
          }}
          onPointerLeave={() => {
            setShowSmooth(false);
            setTargetRectSmooth(null);
          }}
        >
          Hover me (Smooth with useLayoutEffect)
        </button>
        {showSmooth && (
          <Tooltip targetRect={targetRectSmooth} useFlicker={false}>
            This is smooth!
          </Tooltip>
        )}

      </div>
    </div>
  );
}