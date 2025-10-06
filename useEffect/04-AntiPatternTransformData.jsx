import React, { useState, useEffect } from 'react';

/*
  Part 4: Anti-Pattern - Using useEffect for Data Transformation

  Manam props or state nunchi oka value ni derive (calculate) cheyyali
  anukunnappudu, `useEffect` vadadam anedi common mistake.
  Adi anavasaramaina complexity ni and re-renders ni create chesthundi.
*/

const user = { firstName: 'React', lastName: 'Developer' };

// --- ❌ The WRONG Way ---
function ProfileWrong() {
  const [fullName, setFullName] = useState('');

  // ANTI-PATTERN!
  // Ee `fullName` anedi direct ga `user` nunchi calculate cheyyochu.
  // Deeniki separate state and effect avasaram ledu.
  useEffect(() => {
    console.log('(Wrong) Effect is running to set full name');
    setFullName(`${user.firstName} ${user.lastName}`);
  }, [user.firstName, user.lastName]);

  return (
    <div>
      <h4>The WRONG Way (with useEffect)</h4>
      <p>Full Name: {fullName}</p>
    </div>
  );
}

// --- ✅ The RIGHT Way ---
function ProfileRight() {
  // Simple, direct calculation during render.
  // No extra state, no effect, no extra re-renders.
  const fullName = `${user.firstName} ${user.lastName}`;
  console.log('(Right) Calculating full name during render');

  return (
    <div>
      <h4>The RIGHT Way (direct calculation)</h4>
      <p>Full Name: {fullName}</p>
    </div>
  );
}

function AntiPatternTransformData() {
  return (
    <div className="example-container">
      <h2>Anti-Pattern: Transforming Data</h2>
      <p>
        Both components below achieve the same result, but the "RIGHT way" is
        much simpler and more efficient. Check the console to see when each one
        does its work.
      </p>
      <hr />
      <ProfileWrong />
      <hr />
      <ProfileRight />
    </div>
  );
}

export default AntiPatternTransformData;