import { unstable_ViewTransition as ViewTransition } from 'react';

// Sample data for our image gallery
const images = [
  { id: 1, url: 'https://picsum.photos/id/10/400/400', name: 'Misty Forest' },
  { id: 2, url: 'https://picsum.photos/id/20/400/400', name: 'Cityscape' },
  { id: 3, url: 'https://picsum.photos/id/30/400/400', name: 'Lone Tree' },
  { id: 4, url: 'https://picsum.photos/id/40/400/400', name: 'Laptop' },
  { id: 5, url: 'https://picsum.photos/id/50/400/400', name: 'Mountain Peak' },
  { id: 6, url: 'https://picsum.photos/id/60/400/400', name: 'Workspace' },
];

export { images }; // Export for other components to use

/**
 * Idi mana image gallery grid.
 * Prathi image ni oka `<ViewTransition>` lo wrap chestunnam.
 *
 * Key Point: `name` prop ki manam oka UNIQUE string isthunnam.
 * Ee `name` valla React, ee thumbnail ni detail view lo unna
 * pedda image tho connect cheyyagalugutundi.
 */
export default function ImageGrid({ onImageClick }) {
  return (
    <>
      <h2>Image Gallery</h2>
      <div className="image-grid">
        {images.map((img) => (
          <div key={img.id} className="grid-item">
            <ViewTransition name={`image-${img.id}`}>
              <img
                src={img.url}
                alt={img.name}
                onClick={() => onImageClick(img.id)}
              />
            </ViewTransition>
          </div>
        ))}
      </div>
    </>
  );
}