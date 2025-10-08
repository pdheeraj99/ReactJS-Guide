// This is a mock API to simulate a slow data fetch for the pre-rendering example.
// It's similar to the one used in the Suspense example.

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
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
}

// Fetches some "slow" data
export function fetchSlowData() {
  console.log('Pre-rendering: Fetching slow data in the background...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Pre-rendering: Slow data fetched!');
      resolve('This content was pre-rendered and loaded instantly! ✨');
    }, 3000); // 3-second delay to simulate a slow network request
  });
}

// Create a resource that can be used by the pre-rendered component
export function createSlowResource() {
  return wrapPromise(fetchSlowData());
}