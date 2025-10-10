# 2. Server Functions: Define cheyadam & Use cheyadam ✍️

Okay, Server Functions ento telusukunnaru. Ippudu వాటిని ela create cheyali, ela vaadali anedi chuddam. React lo idi cheyadaniki rendu popular methods unnayi. Rendu chala easy ga untayi!

---

### Pattern 1: Server Component lo define chesi, Prop ga pass cheyadam

Idi chala common pattern. Manam oka Server Component lo ne oka Server Function ni define chesi, daanini child Client Component ki prop ga pass chestam.

**Scenario:** Manam oka `ProductPage` (Server Component) lo unnam. Andulo oka `AddToCartButton` (Client Component) undi. Button click cheste, product ni cart lo add cheyali. Ee "add to cart" logic server lo jaragali.

**Ela chestam?**

1.  `ProductPage` (Server Component) lo `addToCart` ane oka async function create chestam.
2.  Aa function lo `"use server";` ane directive pedatam.
3.  Ee `addToCart` function ni `AddToCartButton` ki `onClick` prop ga pass chestam.

**Chudandi ila:**

```javascript
// FILE: ProductPage.jsx (Server Component)

import AddToCartButton from './AddToCartButton';
import { db } from './database';

export default function ProductPage({ productId }) {
  // 1. Server Function ni ikkade define chestunnam
  async function addToCart(formData) {
    "use server"; // Magic happens here! ✨

    const userId = await getCurrentUser();
    await db.cart.add({ productId, userId });
    console.log(`Product ${productId} added to cart!`);
  }

  // 2. Client Component ki prop ga pass chestunnam
  return (
    <div>
      <h1>My Awesome Product</h1>
      <AddToCartButton onAddToCart={addToCart} />
    </div>
  );
}
```

Client Component (`AddToCartButton.jsx`) chala simple ga untundi:

```javascript
// FILE: AddToCartButton.jsx (Client Component)
"use client";

export default function AddToCartButton({ onAddToCart }) {
  // 'onAddToCart' prop lo vachindi server function reference
  return (
    <button onClick={() => onAddToCart()}>
      Add to Cart
    </button>
  );
}
```

**Flow ela untundi?**

```mermaid
graph TD
    subgraph Server
        A[ProductPage (Server Component)]
        B(addToCart Server Function)
    end

    subgraph Client
        C[AddToCartButton (Client Component)]
    end

    A -- "Passes `addToCart` as a prop" --> C
    C -- "User clicks button" --> B
    B -- "Executes on server" --> B
```

---

### Pattern 2: Separate file lo define chesi, import chesukovadam

Inko approach entante, manam server functions anni oka separate file lo pettukovachu. Ee file top lo `"use server";` ane directive pettali. Taruvata, ee functions ni manam Client Components lo direct ga import chesukoni use cheyochu.

**Scenario:** App lo ekkadaina use cheyagalige oka generic action undi, उदहारणకి "Send Feedback".

**Ela chestam?**

1.  `actions.js` ane oka file create chestam.
2.  Aa file top lo `"use server";` pedatam.
3.  Andulo `sendFeedback` ane function define chestam.
4.  Ee function ni `FeedbackForm` (Client Component) lo import chesukoni call chestam.

**Chudandi ila:**

```javascript
// FILE: actions.js (Server Functions Module)
"use server"; // Ee file lo unna anni functions Server Functions aipotayi!

import { db } from './database';

export async function sendFeedback(formData) {
  const feedbackText = formData.get('feedback');
  await db.feedback.submit(feedbackText);
  return { message: "Feedback received!" };
}

export async function anotherAction() {
    // idi kuda server function ye
}
```

Ippudu Client Component lo:

```javascript
// FILE: FeedbackForm.jsx (Client Component)
"use client";

import { sendFeedback } from './actions'; // Direct ga import cheskuntunnam

export default function FeedbackForm() {
  async function handleSubmit() {
    const response = await sendFeedback(new FormData(event.target.form));
    alert(response.message);
  }

  return (
    <form>
      <textarea name="feedback"></textarea>
      <button type="button" onClick={handleSubmit}>Send Feedback</button>
    </form>
  );
}
```

**Flow ela untundi?**

```mermaid
graph TD
    subgraph Server
        A["actions.js with 'use server'"]
        B(sendFeedback function)
    end

    subgraph Client
        C[FeedbackForm (Client Component)]
    end

    A -.-> B;
    C -- "Imports `sendFeedback`" --> A
    C -- "User submits form" --> B
    B -- "Executes on server" --> B
```

Ee rendu patterns chala useful.
-   **Pattern 1** component-specific logic kosam baguntundi.
-   **Pattern 2** reusable, app-wide actions kosam baguntundi.

Next, manam ee patterns ki live code examples chuddam and forms tho ela integrate cheyalo nerchukundam! 💻