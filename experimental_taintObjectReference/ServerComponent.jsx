import { getTaintedUser } from './auth';
import ClientComponent from './ClientComponent';

/**
 * Idi oka Server Component anukundam.
 * Idi server meeda run avuthundi, so idi async/await ni direct ga vadagaladu
 * and `getTaintedUser` lanti server-only functions ni call cheyagaladu.
 */
export default async function ServerComponent() {
  // 1. Manam sensitive data unna user object ni fetch chestunnam.
  //    `getTaintedUser` function lopalana ee object "taint" cheyabadindi.
  const taintedUser = await getTaintedUser(123);

  // 2. ✅ THE RIGHT WAY:
  //    Client ki pampinche mundu, manam kevalam safe and avasaramaina
  //    data tho oka kottha, clean object ni create cheskovali.
  const clientSafeUser = {
    id: taintedUser.id,
    name: taintedUser.name,
    // Note: manam `passwordHash` lanti sensitive data ni ikkada include cheyyatledu.
  };

  return (
    <div className="server-component">
      <h2>This is a Server Component 🔎</h2>
      <p>
        It has fetched a user object that contains sensitive data and has
        "tainted" it.
      </p>

      <hr />

      <h3>Demonstrating the RIGHT Way ✅</h3>
      <p>
        We create a new, "clean" object with only the safe properties and pass
        that to the client. This will work without any errors.
      </p>
      <ClientComponent user={clientSafeUser} />

      <hr />

      <h3>Demonstrating the WRONG Way ❌</h3>
      <p>
        Below, we are trying to pass the entire "tainted" object to the client.
        In a real React Server Components environment, **this would throw an
        error** to prevent the security leak. The component would not render.
      </p>
      <div className="error-box">
        <p>
          <b>Conceptual Error Zone:</b> The following component would crash the
          app.
        </p>
        {/*
          <ClientComponent user={taintedUser} />
          ^^^
          THIS LINE WOULD THROW: "Do not pass the entire user object to the client..."
        */}
      </div>
    </div>
  );
}