import { getSecretApiKey } from './secrets';
import ClientComponent from './ClientComponent';

/**
 * Idi oka Server Component anukundam.
 * Idi server meeda run avuthundi, so idi `getSecretApiKey` lanti
 * server-only functions ni call cheyagaladu.
 */
export default function ServerComponent() {
  // 1. Manam sensitive API key ni import cheskunnam.
  //    `secrets.js` file lo ee key "taint" cheyabadindi.
  const taintedKey = getSecretApiKey();

  // 2. ✅ THE RIGHT WAY (Conceptual):
  //    Asalu ee key ni client ki pampalsina avasarame ledu.
  //    Manam ee key ni ikkade, server meeda ne use chesi, vere API ni
  //    call chesi, vachina SAFE data ni matrame client ki pampali.
  //    Example: const safeData = await fetch('https://api.example.com', { headers: { 'Authorization': taintedKey }});
  //             return <ClientComponent data={safeData} />

  return (
    <div className="server-component">
      <h2>This is a Server Component 🔎</h2>
      <p>
        It has imported a secret API key that has been "tainted".
      </p>

      <hr />

      <h3>Demonstrating the WRONG Way ❌</h3>
      <p>
        Below, we are trying to pass the tainted API key directly to a Client
        Component. In a real React Server Components environment,{' '}
        <strong>this would throw an error</strong> to prevent the security leak.
        The component would not render.
      </p>
      <div className="error-box">
        <p>
          <b>Conceptual Error Zone:</b> The following component would crash the
          app.
        </p>
        {/*
          <ClientComponent apiKey={taintedKey} />
          ^^^
          THIS LINE WOULD THROW: "You are trying to leak the Super Secret API Key to the client..."
        */}
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          (The component above is commented out because it would crash the app in a real environment.)
        </p>
      </div>
    </div>
  );
}