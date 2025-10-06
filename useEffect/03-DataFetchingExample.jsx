import React, { useState, useEffect } from 'react';

/*
  Part 3: Data Fetching with useEffect

  Idi atni kante common use case. Manam oka API nunchi data fetch chesi,
  loading and error states ni handle cheddam.
  Most importantly, race conditions ni `ignore` flag tho ela avoid
  cheyyalo chuddam.
*/

// Fake API function
const fakeApi = {
  fetchUser: (id) => {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * 1000 + 500; // Random delay 500ms - 1500ms
      setTimeout(() => {
        if (id === 'error') {
          reject(new Error('User not found!'));
        } else {
          resolve({ id, name: `User ${id}` });
        }
      }, delay);
    });
  },
};

function UserProfile({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false; // The magic 'ignore' flag

    async function fetchData() {
      // Reset states on new fetch
      setLoading(true);
      setError(null);
      setData(null);

      try {
        console.log(`Fetching data for user: ${userId}`);
        const result = await fakeApi.fetchUser(userId);
        if (!ignore) {
          console.log(`✅ Data received for user: ${userId}`);
          setData(result);
        } else {
          console.log(`🟡 Ignored stale data for user: ${userId}`);
        }
      } catch (e) {
        if (!ignore) {
          setError(e);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchData();

    // Cleanup: `userId` maarithe, pata fetch ni ignore cheyyi
    return () => {
      ignore = true;
      console.log(`🧹 Cleanup for user: ${userId}`);
    };
  }, [userId]); // Dependency: Re-fetch when userId changes

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

  return (
    <div>
      <h3>{data?.name}</h3>
      <p>ID: {data?.id}</p>
    </div>
  );
}

function DataFetchingExample() {
  const [userId, setUserId] = useState('1');

  return (
    <div className="example-container">
      <h2>Data Fetching with Cleanup</h2>
      <p>
        Select a user to fetch. Try changing the selection quickly to see how
        the `ignore` flag prevents race conditions in the console.
      </p>
      <select value={userId} onChange={e => setUserId(e.target.value)}>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
        <option value="error">User (will throw error)</option>
      </select>
      <hr />
      <UserProfile userId={userId} />
    </div>
  );
}

export default DataFetchingExample;