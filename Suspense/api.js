// This is a mock API to simulate data fetching.
// NOTE: In a real-world application, you would use a library like
// Relay, Next.js, or React Query that is integrated with Suspense.
// This implementation is a simplified version to demonstrate the concept
// of a data source that can "suspend".

// This function wraps a Promise and creates a "resource" that Suspense can read.
function wrapPromise(promise) {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender; // This is what tells React to suspend.
      } else if (status === 'error') {
        throw result; // This will be caught by an error boundary.
      } else if (status === 'success') {
        return result; // This returns the data when it's ready.
      }
    },
  };
}

// --- Mock API Functions ---

// Fetches user details
export function fetchProfileData() {
  console.log('Fetching profile details...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Fetched profile details.');
      resolve({
        name: 'React Friend',
        bio: 'I love building fast and user-friendly UIs with React!',
      });
    }, 1000); // 1-second delay
  });
}

// Fetches user posts
export function fetchTimelineData() {
  console.log('Fetching timeline posts...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Fetched timeline posts.');
      resolve([
        { id: 1, text: 'Just learned about Suspense. It is awesome! ✨' },
        { id: 2, text: 'Code-splitting with React.lazy is a game-changer. 🚀' },
        { id: 3, text: 'Building a smooth loading experience.' },
      ]);
    }, 2000); // 2-second delay
  });
}

// Create resources that can be used by components
export function createProfileResource() {
  return {
    details: wrapPromise(fetchProfileData()),
    timeline: wrapPromise(fetchTimelineData()),
  };
}