import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// A dedicated DOM node for our portals.
// In a real app, this would typically be in your public/index.html file.
const portalRoot = document.createElement('div');
portalRoot.id = 'portal-root';
document.body.appendChild(portalRoot);


// Example 1: A reusable Modal component using createPortal.
function Modal({ children, onClose }) {
  // Use an effect to add a class to the body to prevent scrolling when the modal is open.
  useEffect(() => {
    document.body.classList.add('modal-open');
    // Cleanup function to remove the class when the component unmounts.
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []); // Empty dependency array means this effect runs only once on mount.

  const modalStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const modalContentStyles = {
    backgroundColor: 'white',
    padding: '20px 40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  };

  // We use createPortal to render the modal's JSX into our dedicated DOM node.
  return createPortal(
    <div style={modalStyles} onClick={onClose}>
      {/* We stop propagation on the content so clicking inside the modal doesn't close it. */}
      <div style={modalContentStyles} onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose} style={{ marginTop: '20px' }}>Close</button>
      </div>
    </div>,
    portalRoot // The destination DOM node.
  );
}


// Main example component to demonstrate portal usage and event bubbling.
export default function PortalExamples() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleParentClick = () => {
    console.log('Parent container clicked! Event bubbled up from the portal.');
    alert('Event bubbled up to the parent container in the React Tree!');
  };

  const containerStyles = {
    fontFamily: 'sans-serif',
    padding: '20px'
  };

  const parentBoxStyles = {
    border: '2px dashed blue',
    padding: '20px',
    marginTop: '20px',
    cursor: 'pointer',
  };

  // We add a global style to the document to prevent body scroll when modal is open.
  const globalStyle = `
    .modal-open {
      overflow: hidden;
    }
  `;

  return (
    <div style={containerStyles}>
      <style>{globalStyle}</style>
      <h1>`createPortal` Examples</h1>
      <p>This component demonstrates how portals work.</p>

      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

      {/*
        Usage: Rendering a modal dialog.
        The <Modal> component below will be rendered into a separate DOM node (#portal-root),
        not inside this div. This allows it to escape any styling constraints of its parents.
      */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2>I am a Modal!</h2>
          <p>I am rendered in a different part of the DOM, but I am still a child of `PortalExamples` in the React tree.</p>
        </Modal>
      )}

      {/*
        Event Bubbling Demonstration:
        This parent container has an onClick handler. When you click inside the portal's
        content (which is physically elsewhere in the DOM), the event will bubble up
        through the React tree and trigger this handler!
      */}
      <div style={parentBoxStyles} onClick={handleParentClick}>
        <h3>Event Bubbling Test Area ✅</h3>
        <p>Click anywhere inside this dashed box. Then, open the modal and click on its title or text. You'll see that both actions trigger the same alert, proving events bubble through the React tree.</p>
      </div>
    </div>
  );
}