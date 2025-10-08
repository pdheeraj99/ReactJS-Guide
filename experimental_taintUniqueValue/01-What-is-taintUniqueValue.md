# `taintUniqueValue`: The "Redact This!" Marker ✒️

Hey friend! Manam last chapter lo `taintObjectReference` tho, oka motham object ni client ki vellakunda ela aapaalo chusam.

But what if manaki motham object sensitive kadu? What if we only need to protect a *single, specific value* inside that object, like a secret key or a token?

Deeni kosam, React manaki inko special security tool isthundi: **`experimental_taintUniqueValue`**.

> **`experimental_taintUniqueValue`** lets you "taint" or "mark" a specific primitive value (usually a string like an API key or a session token) as "server-only".

**Analogy: The Redaction Marker**
`taintObjectReference` anedi motham document meeda "TOP SECRET" stamp veyadam lantiది. Kani, `taintUniqueValue` anedi, aa document loni kevalam oka sensitive name or number ni teeskuni, daani meeda **black marker tho strike cheyadam (redact cheyadam)** lantiది.

Ee API React ki chepthundi: "Ee specific string (`'abc-123-xyz'`) chala secret. Ee exact value ni eppudu, elanti paristitullo client ki pampaku."

### `taintObjectReference` vs. `taintUniqueValue`

*   **`taintObjectReference`**: Protects an entire object based on its **memory reference**. Good for complex user objects.
*   **`taintUniqueValue`**: Protects a **specific primitive value** (string, number). Good for API keys, tokens, and passwords.

### The `lifetime` Argument

Ee function ki oka extra, important argument undi: `lifetime`. Idi React ki chepthundi, "Ee value ni entha sepu tainted ga unchali?"
*   For a secret that should *always* be secret (like an environment variable), you can pass a global object like `process`.
*   For a secret that is tied to a specific user's session, you would pass the `user` object itself as the lifetime.

```mermaid
graph TD
    A[Server has a secret API Key] --> B{Call `taintUniqueValue(message, process, 'my-secret-key')`};
    B --> C[The value 'my-secret-key' is now tainted 🛡️];
    D[Developer tries to pass this key to a Client Component];
    D --> E{React sees the tainted value};
    E --> F[💥 Throws Error! Stops the render.];
    F --> G[Secret key is SAFE on the server ✅];

    style F fill:#ffcccc
    style G fill:#d4edda
```

**Important Note:** Ee API kuda `experimental` eh. So, it's not ready for production and is for learning and future-proofing your code.

Ippudu ee "redaction marker" ni code lo ela use cheyalo, and daani limitations ento, next chuddam! 👉