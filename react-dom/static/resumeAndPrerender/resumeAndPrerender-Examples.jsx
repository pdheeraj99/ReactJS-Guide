import React from 'react';

/*
  This file is a highly conceptual example of the advanced `resumeAndPrerender` API.
  It simulates a multi-stage build process where a render is paused and resumed
  multiple times before the final dynamic request.
*/

// --- 1. The React App Component ---
// This app has multiple levels of dynamic data.
function App({ categoryData, userData }) {
  return (
    <html>
      <body>
        <header><h1>My Multi-Stage Site</h1></header>
        <main>
          <React.Suspense fallback={<p>Loading category details...</p>}>
            <CategoryDetails initialData={categoryData}>
              <React.Suspense fallback={<p>Loading user-specific content...</p>}>
                <UserSpecificContent userData={userData} />
              </React.Suspense>
            </CategoryDetails>
          </React.Suspense>
        </main>
        <script src="/main.js" async></script>
      </body>
    </html>
  );
}

// --- Helper Components ---
function CategoryDetails({ children, initialData }) {
  if (!initialData) throw new Error("Category data not yet available!");
  return (
    <div>
      <h2>Category: {initialData.name}</h2>
      {children}
    </div>
  );
}

function UserSpecificContent({ userData }) {
  if (!userData) throw new Error("User data not yet available!");
  return <p>Welcome, {userData.name}!</p>;
}


// --- 2. The Conceptual Example ---
export default function ResumeAndPrerenderExample() {
  const stage1Code = `
    // STAGE 1: Initial Build (happens once)
    // We prerender the absolute shell, without any data.
    import { prerender } from 'react-dom/static';
    import App from './App.js';

    const { postponed: postponed1 } = await prerender(
      <App categoryData={null} userData={null} />
    );
    // Save 'postponed1' to be used in the next stage.
    // saveToDisk('stage1.postponed', postponed1);
  `;

  const stage2Code = `
    // STAGE 2: Category-Specific Build (e.g., runs for each category)
    // We RESUME the first stage, and PRERENDER more content.
    import { resumeAndPrerender } from 'react-dom/static';
    import App from './App.js';

    // For the "electronics" category page:
    const postponed1 = await loadFromDisk('stage1.postponed');
    const categoryData = { name: 'Electronics' }; // Generic data for this category

    const { postponed: postponed2 } = await resumeAndPrerender(
      <App categoryData={categoryData} userData={null} />,
      postponed1
    );
    // Save the NEW postponed state for the final stage.
    // saveToDisk('electronics.postponed', postponed2);
  `;

  const stage3Code = `
    // STAGE 3: Request Time (on a dynamic server)
    // The final RESUME with user-specific data.
    import { resume } from 'react-dom/server';
    import App from './App.js';

    async function handleRequest(request) {
      // Load the state from the category-specific prerender.
      const postponed2 = await loadFromDisk('electronics.postponed');
      const userData = { name: 'Mawa' }; // User-specific data

      const stream = await resume(
        <App categoryData={{ name: 'Electronics' }} userData={userData} />,
        postponed2
      );
      // return new Response(stream);
    }
  `;

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1>`resumeAndPrerender` Example</h1>
      <p>This is a very advanced API for multi-stage static generation. It acts as the middle runner in a relay race.</p>

      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Stage 1: Initial Prerender</h3>
        <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', whiteSpace: 'pre-wrap' }}>
          <code>{stage1Code.trim()}</code>
        </pre>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Stage 2: Resume and Prerender Again</h3>
        <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', whiteSpace: 'pre-wrap' }}>
          <code>{stage2Code.trim()}</code>
        </pre>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
        <h3>Stage 3: Final Resume at Request Time</h3>
        <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', whiteSpace: 'pre-wrap' }}>
          <code>{stage3Code.trim()}</code>
        </pre>
      </div>
    </div>
  );
}