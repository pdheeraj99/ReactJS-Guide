/**
 * NOTE: Ee file server environment lo run avuthundi anukundam.
 */

/**
 * Idi mana data fetching function.
 *
 * Key Change: Ippudu idi options object lo `signal` ni accept chesthundi.
 * Ee `signal` object `cacheSignal()` nunchi vastundi.
 *
 * Manam ee signal ni direct ga native `fetch` ki pass chestam.
 * Okavela React render ni cancel cheste, ee `fetch` call
 * automatic ga abort avuthundi.
 */
export async function fetchCancellableData(id, { signal }) {
  console.log(
    `Fetching cancellable data for ${id}... This might get aborted.`
  );

  try {
    const response = await fetch(`https://hub.dummyapis.com/delay?seconds=4`, {
      // The signal from cacheSignal() is passed here!
      signal,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // In a real API, you'd return actual data.
    // Here we just return a success message.
    return { success: true, message: `Data for ${id} fetched successfully!` };
  } catch (error) {
    // Check if the error was due to the request being aborted.
    if (error.name === 'AbortError') {
      console.log(`FETCH ABORTED for user ${id}. This is expected!`);
      // Return null or some other indicator that it was cancelled.
      return { success: false, message: 'Fetch was cancelled.' };
    }
    // If it's a different error, it's unexpected.
    console.error('An unexpected fetch error occurred:', error);
    throw error;
  }
}