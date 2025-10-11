import React, { useState, useActionState, useTransition } from 'react';

// Note: Ee file ni direct ga run cheyalemu.
// Idi Server Components, Client Components, and Directives anni kalisi
// ela pani chestayo chupistundi. Real project lo, Next.js or Remix lanti
// framework ee client-server interaction ni manage chestundi.

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// 📂 File: ./actions/analytics.js (Server Action Module)
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// "use server"; // Pretend this is at the top of the file.

async function trackButtonClick(eventName) {
    "use server"; // Function-level directive for this example.
    console.log(`ANALYTICS_SERVER_LOG: Button clicked - Event: '${eventName}'.`);
    // Ikkada analytics database lo event log chese logic untundi.
    await new Promise(res => setTimeout(res, 300));
    return { success: true, loggedEvent: eventName };
}


//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// 💻 File: ./components/InteractiveCard.jsx (Client Component)
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// "use client"; // This file is a Client Component module.

function InteractiveCard({ title, tags, onTrackEvent, children }) {
    "use client"; // Added here for clarity in this single-file example.

    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(async () => {
            const result = await onTrackEvent(title); // Calling the Server Function passed as a prop
            if (result.success) {
                alert(`Server successfully tracked click for: "${result.loggedEvent}"`);
            }
        });
    };

    return (
        <div style={{
            border: '2px solid #8e44ad',
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: '#f4ecf7',
            textAlign: 'center'
        }}>
            {/* Server Component nundi pass chesina children ikkada render avtayi */}
            {children}

            <h3 style={{ marginTop: '15px' }}>{title}</h3>
            <div style={{ margin: '10px 0', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                {tags.map(tag => <span key={tag} style={{ background: '#d7bde2', padding: '2px 8px', borderRadius: '12px' }}>{tag}</span>)}
            </div>
            <button onClick={handleClick} disabled={isPending} style={{ padding: '10px 15px', marginTop: '10px' }}>
                {isPending ? 'Tracking...' : 'Track Click on Server'}
            </button>
        </div>
    );
}


//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// 🖥️ File: ./components/StaticInfoBox.jsx (Server Component)
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// Ee component lo interactivity ledu, so idi Server Component ga untundi.
function StaticInfoBox({ info }) {
    console.log("STATIC_INFO_BOX_SERVER_LOG: Rendering on the server.");
    return (
        <div style={{ padding: '10px', backgroundColor: '#e8daef', border: '1px solid #d7bde2', borderRadius: '5px' }}>
            <p><strong>ℹ️ Server-Rendered Info:</strong> {info}</p>
        </div>
    );
}


//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// 🏠 File: ./App.jsx (Root Server Component)
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// Idi root component, by default idi Server Component.
export default function DirectivesInActionExample() {
    console.log("ROOT_APP_SERVER_LOG: Rendering on the server.");

    // Data antha server lo ne fetch/define chestunnam.
    const cardData = {
        title: "Explore React Directives",
        tags: ["rsc", "use-client", "use-server"],
    };

    return (
        <div style={{ fontFamily: 'sans-serif' }}>
            <h1>Directives in Action: A Complete Example</h1>
            <p>Ee example lo, `InteractiveCard` oka Client Component, kani daaniki manam pass chesina `StaticInfoBox` (children) and `onTrackEvent` (prop) server-side features ni chupistayi.</p>

            <InteractiveCard
                // ✅ Serializable props
                title={cardData.title}
                tags={cardData.tags}
                // ✅ Server Function prop
                onTrackEvent={trackButtonClick}
            >
                {/*
                  ✅ Server Component ni children ga pass chestunnam.
                  Ee StaticInfoBox server lo render ayyi, daani HTML matrame Client Component ki pampabadutundi.
                  Client Component daanini ekkada render cheyalo matrame cheptundi.
                */}
                <StaticInfoBox info="This content was rendered on the server!" />
            </InteractiveCard>
        </div>
    );
}