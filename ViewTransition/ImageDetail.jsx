import { unstable_ViewTransition as ViewTransition } from 'react';
import { images } from './ImageGrid.jsx';

/**
 * Idi selected image ni peddaga chupinche detail view.
 *
 * Key Point: Ikkada `<ViewTransition>` ki `name` prop,
 * grid view lo unna thumbnail `name` tho match avvali.
 * Ee matching name valla React ee rendu elements ni
 * connect chesi, smooth ga animate chesthundi.
 */
export default function ImageDetail({ imageId, onBackClick }) {
  const image = images.find((img) => img.id === imageId);

  if (!image) {
    return <div>Image not found!</div>;
  }

  return (
    <div className="image-detail">
      <div className="image-detail-container">
        <ViewTransition name={`image-${image.id}`}>
          <img src={image.url} alt={image.name} />
        </ViewTransition>
      </div>
      <h2>{image.name}</h2>
      <button onClick={onBackClick}>Back to Gallery</button>
    </div>
  );
}