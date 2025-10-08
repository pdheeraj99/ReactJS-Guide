# Animating Between Views: The "Shared Element" Magic ✨

Enter/exit animations are nice, but the real power of `<ViewTransition>` is in creating seamless transitions between two different views. Deenine **"Shared Element Transition"** antaru.

**The Scenario:** Imagine an image gallery.
1.  **View 1 (Grid View):** You have a grid of small thumbnail images.
2.  **View 2 (Detail View):** You click a thumbnail, and it takes you to a new view where that single image is shown large.

Traditionally, the thumbnail just disappears, and the large image appears somewhere else. There's no connection. But what if we could make it look like the thumbnail itself *grows* and *moves* into the large image's position? That would be magical! 🪄

## The `name` Prop: Connecting the Dots

Ee magic ni achieve cheyadaniki, manam `<ViewTransition>` ki `name` ane oka prop istham. Ee `name` anedi aa element ki oka unique identity lantiది.

**The trick is simple:**
1.  Grid View lo, prathi thumbnail ni wrap chese `<ViewTransition>` ki oka **unique `name`** ivvali (e.g., `name={`image-${id}`} `).
2.  Detail View lo, aa pedda image ni wrap chese `<ViewTransition>` ki **ade `name`** ivvali.

Ippudu, manam `startTransition` tho state ni update chesinappudu, React chustundi:
*   "Okay, `ViewTransition` with `name="image-123"` is unmounting from the Grid View."
*   "And at the same time, a `ViewTransition` with the *exact same name* (`name="image-123"`) is mounting in the Detail View."

React ee renditini connect chesi, browser ki chepthundi: "Hey, ee rendu oke element. Daanini A position nunchi B position ki smoothly animate cheyyi." Browser inka aa pani chuskuntundi!

### Code Snippet

**Grid View Component:**
```jsx
// ImageGrid.jsx
function ImageGrid({ onImageClick }) {
  return images.map((img) => (
    <ViewTransition key={img.id} name={`image-${img.id}`}>
      <img
        src={img.thumbnailUrl}
        onClick={() => onImageClick(img.id)}
      />
    </ViewTransition>
  ));
}
```

**Detail View Component:**
```jsx
// ImageDetail.jsx
function ImageDetail({ imageId }) {
  return (
    <div>
      <ViewTransition name={`image-${imageId}`}>
        <img src={images.find(img => img.id === imageId).fullUrl} />
      </ViewTransition>
      {/* ...other details... */}
    </div>
  );
}
```

**The Main App:**
```jsx
function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (id) => {
    startTransition(() => {
      setSelectedImage(id);
    });
  };

  return selectedImage ? (
    <ImageDetail imageId={selectedImage} />
  ) : (
    <ImageGrid onImageClick={handleImageClick} />
  );
}
```

```mermaid
graph TD
    subgraph Grid View
        A(Thumbnail <img />) --> B[VT name="image-123"];
    end

    C{User clicks thumbnail} --> D[startTransition];

    subgraph Detail View
        E(Large <img />) --> F[VT name="image-123"];
    end

    B -- unmounts --> D;
    D -- mounts --> F;

    subgraph React & Browser
        G{React sees matching names} --> H[Connects the two elements];
        H --> I[Browser animates the morph! 🚀];
    end

    style I fill:#d4edda
```

**Important:** The `name` must be unique for each element on the screen at any given time. Anduke manam `id` ni use chesi dynamic ga create chestunnam.

Ee default morphing animation chala cool ga untundi. Kani manaki inka control kavali anukunte? Manam ee animation ni slide, fade, rotate la ela customize cheyalo, adento next chapter lo chuddam. Get ready to become a CSS animation wizard! 🧙‍♂️➡️