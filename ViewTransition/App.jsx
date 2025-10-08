import { useState, startTransition } from 'react';
import ImageGrid from './ImageGrid.jsx';
import ImageDetail from './ImageDetail.jsx';
import './styles.css';

/**
 * Note: The <ViewTransition> API is still experimental (Canary).
 * You might need to import it as `unstable_ViewTransition`.
 * For this demo, it's used within the child components.
 */

export default function App() {
  const [selectedImageId, setSelectedImageId] = useState(null);

  // Function to handle showing the detail view
  const handleImageClick = (id) => {
    // IMPORTANT: The state update that triggers the transition
    // MUST be wrapped in `startTransition`.
    startTransition(() => {
      setSelectedImageId(id);
    });
  };

  // Function to handle going back to the grid
  const handleBackClick = () => {
    startTransition(() => {
      setSelectedImageId(null);
    });
  };

  return (
    <div className="app-container">
      <h1>React <code>&lt;ViewTransition&gt;</code> Demo 🪄</h1>
      <p>Click on an image to see the magic of shared element transitions!</p>
      <hr />

      {selectedImageId !== null ? (
        <ImageDetail imageId={selectedImageId} onBackClick={handleBackClick} />
      ) : (
        <ImageGrid onImageClick={handleImageClick} />
      )}
    </div>
  );
}