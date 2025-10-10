import React, { useTransition, useActionState, useRef } from 'react';

// Note: Ee file ni direct ga run cheyalemu.
// Idi Server Functions ni forms tho ela use cheyalo chupistundi.
// Real project lo, Next.js or Remix lanti framework ee interaction ni manage chestundi.

// Mock Server Actions. Real project lo ivi separate 'actions.js' file lo undochu.
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

async function submitPost(formData) {
    "use server";
    const postContent = formData.get('postContent');
    console.log(`SIMPLE_FORM_ACTION: Received post: "${postContent}".`);
    // In a real app, you would save this to a DB.
    // Note: Simple form actions often trigger a full page reload or a redirect.
    await new Promise(res => setTimeout(res, 700));
    console.log("SIMPLE_FORM_ACTION: Post saved.");
    // For this example, nothing is returned, and the browser handles the form submission.
}

async function changePassword(formData) {
    "use server";
    const password = formData.get('password');
    console.log(`TRANSITION_FORM_ACTION: Attempting to change password.`);
    await new Promise(res => setTimeout(res, 1500)); // Simulate a slow action
    console.log(`TRANSITION_FORM_ACTION: Password updated successfully.`);
    // We can't easily return a message to the UI with this pattern.
}

async function addToCart(previousState, formData) {
    "use server";
    const item = formData.get('item');
    console.log(`ACTION_STATE_FORM: Received item: ${item}`);
    if (!item || item.trim() === '') {
        return { success: false, message: "Please enter an item name." };
    }
    await new Promise(res => setTimeout(res, 1000));
    console.log(`ACTION_STATE_FORM: ${item} added to cart.`);
    return { success: true, message: `Successfully added "${item}" to your cart!` };
}

// Example Components
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// 1. Simple Form: Direct Action
function SimplePostForm() {
    "use client";
    const ref = useRef(null);
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h4>1. Simple Form with Direct Action</h4>
            <p>Ee form submit cheste, page refresh avvakunda undataniki manam `action` ni wrap chesi `event.preventDefault()` cheyochu, kani ikkada manam basic behaviour chustunnam. Submit cheyagane, server action trigger avthundi.</p>
            <form
              ref={ref}
              action={async (formData) => {
                await submitPost(formData);
                ref.current.reset();
              }}
            >
                <input type="text" name="postContent" placeholder="What's on your mind?" style={{ width: '60%', marginRight: '10px' }} />
                <button type="submit">Post</button>
            </form>
            <small>Check the server console for logs.</small>
        </div>
    );
}


// 2. Form with useTransition for Pending State
function PasswordSettingsForm() {
    "use client";
    let [isPending, startTransition] = useTransition();

    const handleSubmit = async (formData) => {
        startTransition(async () => {
            await changePassword(formData);
            // We can show an alert, but getting a dynamic message from the server is hard.
            alert("Password change request sent!");
        });
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h4>2. Form with `useTransition` for Pending State</h4>
            <p>Submit chesinappudu, `isPending` state `true` avthundi, button disable ayyi "Saving..." ani chupistundi.</p>
            <form action={handleSubmit}>
                <input type="password" name="password" placeholder="Enter new password" style={{ marginRight: '10px' }} />
                <button type="submit" disabled={isPending}>
                    {isPending ? 'Saving...' : 'Change Password'}
                </button>
            </form>
            {isPending && <p style={{color: 'orange'}}>Updating... please wait.</p>}
            <small>Action ki 1.5 seconds delay undi to show pending state.</small>
        </div>
    );
}


// 3. Form with useActionState for Full State Management
function AddToCartForm() {
    "use client";
    const initialState = { success: false, message: null };
    const [state, formAction, isPending] = useActionState(addToCart, initialState);
    const formRef = useRef(null);

    // Reset form on successful submission
    if (state.success) {
      formRef.current?.reset();
    }

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h4>3. Form with `useActionState` for Full State Management</h4>
            <p>Idi complete solution. Pending state, server nundi success/error messages... anni handle chestundi.</p>
            <form ref={formRef} action={formAction}>
                <input type="text" name="item" placeholder="e.g., 'Laptop'" style={{ marginRight: '10px' }} />
                <button type="submit" disabled={isPending}>
                    {isPending ? 'Adding...' : 'Add to Cart'}
                </button>
            </form>
            {state.message && (
                <p style={{ marginTop: '10px', color: state.success ? 'green' : 'red' }}>
                    {state.success ? '✅' : '❌'} {state.message}
                </p>
            )}
        </div>
    );
}


// --- Main App component to display all examples ---
export default function FormsAndStateExamples() {
    return (
        <div style={{ fontFamily: 'sans-serif' }}>
            <h1>Server Functions: Forms and State Management Examples</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '20px' }}>
                <SimplePostForm />
                <PasswordSettingsForm />
                <AddToCartForm />
            </div>
        </div>
    );
}