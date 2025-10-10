import React, { useActionState, useRef } from 'react';

// Note: Ee file ni direct ga run cheyalemu.
// Real project lo, ee form ni handle cheyadaniki server-side routing
// (e.g., in Next.js or Express) setup chesi undali.

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Mock Server Action
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

async function subscribeToNewsletter(previousState, formData) {
    "use server";
    const email = formData.get('email');
    console.log(`SERVER_ACTION: Subscribing email: ${email}`);

    if (!email || !email.includes('@')) {
        return { success: false, message: 'Please enter a valid email address.' };
    }

    await new Promise(res => setTimeout(res, 1200)); // Simulate API call

    console.log(`SERVER_ACTION: ${email} subscribed successfully.`);
    return { success: true, message: `Thanks for subscribing, ${email}!` };
}

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Example Component
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function NewsletterSignupForm() {
    "use client";

    const initialState = { success: false, message: null };
    const formRef = useRef(null);

    // useActionState ki third argument ga permalink istunnam.
    const [state, formAction, isPending] = useActionState(
        subscribeToNewsletter,
        initialState,
        "/api/subscribe" // <-- The Permalink!
    );

    // Reset form on successful submission
    if (state.success && formRef.current) {
      formRef.current.reset();
    }

    return (
        <div style={{ border: '2px dashed #ffc107', padding: '15px', borderRadius: '8px', backgroundColor: '#fffbeb' }}>
            <h3>📬 Newsletter Signup</h3>
            <p>Ee form Progressive Enhancement tho build cheyabadindi.</p>
            <ul>
                <li><strong>JavaScript tho:</strong> Form submit cheste, page refresh avvakunda `useActionState` tho handle avthundi. Smooth experience!</li>
                <li><strong>JavaScript lekunda:</strong> Form submit cheste, adi normal HTML form la `action="/api/subscribe"` ki full-page POST request pampistundi. App still works!</li>
            </ul>

            {/*
              - JS ENABLED: `formAction` (provided by the hook) is called.
              - JS DISABLED: The form's `action` attribute falls back to the permalink "/api/subscribe".
            */}
            <form ref={formRef} action={formAction} style={{ marginTop: '15px' }}>
                <input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    style={{ width: '250px', padding: '8px', marginRight: '10px' }}
                    required
                />
                <button type="submit" disabled={isPending} style={{ padding: '8px 12px' }}>
                    {isPending ? 'Subscribing...' : 'Subscribe'}
                </button>
            </form>

            {state.message && (
                <p style={{ marginTop: '10px', fontWeight: 'bold', color: state.success ? '#28a745' : '#dc3545' }}>
                    {state.message}
                </p>
            )}

            <div style={{marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', border: '1px solid #ddd'}}>
                <strong>Note for Developers:</strong>
                <p style={{margin: '5px 0 0 0'}}>
                    Progressive Enhancement pani cheyalante, meeru mee server lo <strong>`/api/subscribe`</strong> ane endpoint ni create cheyali. Aa endpoint form data ni receive cheskoni, process chesi, user ki oka confirmation page (e.g., "Thanks for subscribing!") ni return cheyali.
                </p>
            </div>
        </div>
    );
}

// --- Main App component to display the example ---
export default function ProgressiveEnhancementExample() {
    return (
        <div style={{ fontFamily: 'sans-serif' }}>
            <h1>Progressive Enhancement with Server Actions</h1>
            <NewsletterSignupForm />
        </div>
    );
}