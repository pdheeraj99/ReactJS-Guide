import React, { useState } from 'react';

// Note: Ee file ni direct ga run cheyalemu.
// Idi Server Components, Client Components, and Server Functions kalisi unna
// concept ni chupistundi. Real project lo, Next.js or Remix lanti framework
// ee client-server interaction ni manage chestundi.

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// 🚀 Example 1: Server Component lo define chesi, Prop ga pass cheyadam
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// --- File: AddItemButton.jsx (Client Component) ---
// Ee component client lo run avthundi.
function AddItemButton({ onAddItem }) {
  "use client"; // Real project lo ee file top lo untundi.

  const [message, setMessage] = useState('');

  const handleAddItem = async () => {
    const item = "A new book on React";
    // Manam call chestunna 'onAddItem' function server lo execute avthundi.
    const result = await onAddItem(item);
    if (result.success) {
      // Server nundi vachina response tho UI update chestunnam.
      setMessage(`✅ Successfully added "${result.item}" to wishlist! (Check server console for logs)`);
    } else {
      setMessage(`❌ Failed to add item.`);
    }
  };

  return (
    <div>
      <button onClick={handleAddItem}>Add "A new book on React" to Wishlist</button>
      {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
    </div>
  );
}


// --- File: WishlistPage.jsx (Server Component) ---
// Ee component server lo render avthundi.
function WishlistPage() {
  // 1. Server Function ni ikkade, Server Component lo define chestunnam.
  async function addItemToWishlist(item) {
    "use server"; // Ee directive tho idi Server Function ga maruthundi.

    console.log(`WISHLIST_SERVER_LOG: User wants to add '${item}' to their wishlist.`);
    // Ikkada database lo item save chese logic untundi...
    // For now, manam success message pampistunnam.
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    console.log(`WISHLIST_SERVER_LOG: Item '${item}' added successfully.`);

    return { success: true, item: item };
  }

  return (
    <div style={{ border: '2px solid #007acc', padding: '15px', borderRadius: '8px' }}>
      <h3>🛒 Wishlist Page (Server Component)</h3>
      <p>Ee kindha unna button oka Client Component. Kani daaniki manam pass chesina action server lo run avthundi.</p>
      {/* 2. Server function ni Client Component ki prop ga pass chestunnam. */}
      <AddItemButton onAddItem={addItemToWishlist} />
    </div>
  );
}


//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// 🚀 Example 2: Separate file lo define chesi, import chesukovadam
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// --- File: userActions.js (Server Actions Module) ---
// Real project lo, ee code antha 'userActions.js' lanti file lo untundi,
// and aa file top lo "use server"; directive untundi.

// "use server"; // Pretend this is at the top of userActions.js

async function updateUsername(currentName, newName) {
    "use server"; // For this example, we place it here.

    console.log(`USER_ACTION_SERVER_LOG: Attempting to update username from '${currentName}' to '${newName}'`);

    if (!newName || newName.length <= 3) {
        console.error("USER_ACTION_SERVER_LOG: Validation failed.");
        return { success: false, message: 'Username must be longer than 3 characters.' };
    }

    // Simulate database update
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log("USER_ACTION_SERVER_LOG: Username updated in DB.");

    return { success: true, message: `Username successfully updated to '${newName}'!` };
}


// --- File: ProfileEditor.jsx (Client Component) ---
function ProfileEditor() {
    "use client";

    const [name, setName] = useState('Guest');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);
        const newName = event.target.elements.username.value;
        // Server function ni direct ga import chesi call chestunnam
        const result = await updateUsername(name, newName);
        setResponse(result);
        if(result.success) {
            setName(newName);
        }
        setLoading(false);
    };

    return (
        <div style={{ border: '2px solid #4caf50', padding: '15px', borderRadius: '8px' }}>
            <h3>👤 Profile Editor (Client Component)</h3>
            <p>Current Username: <strong>{name}</strong></p>
            <form onSubmit={handleUpdate}>
                <input
                    name="username"
                    type="text"
                    defaultValue={name}
                    placeholder="Enter new username"
                    style={{ marginRight: '10px' }}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Username'}
                </button>
            </form>
            {response && (
                <p style={{ color: response.success ? 'green' : 'red', marginTop: '10px' }}>
                   {response.success ? '✅' : '❌'} {response.message} (Check server console for logs)
                </p>
            )}
        </div>
    );
}


// --- Main App component to display both examples ---
export default function DefiningAndUsingExamples() {
    return (
        <div style={{ fontFamily: 'sans-serif' }}>
            <h1>Server Functions: Defining and Using Patterns</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '20px' }}>
                <section>
                    <h2>Pattern 1: Defined in Server Component & Passed as Prop</h2>
                    <WishlistPage />
                </section>
                <hr />
                <section>
                    <h2>Pattern 2: Imported from a Shared Module</h2>
                    <ProfileEditor />
                </section>
            </div>
        </div>
    );
}