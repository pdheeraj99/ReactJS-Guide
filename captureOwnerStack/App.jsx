import React from 'react';
import DeprecatedButton from './DeprecatedButton';
import './styles.css';

// Idi kevalam oka simple wrapper component.
// Idi `children` ni teeskuni, oka div lo petti render chesthundi.
// Idi `children` ni "own" cheyyadu, kevalam render chesthundi.
function Card({ children }) {
  return <div className="card">{children}</div>;
}

// Ee component `DeprecatedButton` ni "own" chesthundi,
// endukante adi daani JSX lo direct ga rastundi.
function UserProfile() {
  return (
    <div className="profile">
      <h3>User Profile</h3>
      <p>Click the button below to confirm your settings.</p>
      <DeprecatedButton onClick={() => alert('Confirmed!')}>
        Confirm
      </DeprecatedButton>
    </div>
  );
}

export default function App() {
  return (
    <div className="container">
      <h1>`captureOwnerStack` Demo 🕵️</h1>
      <p>
        Open the developer console (F12) to see the warning.
      </p>
      <Card>
        <UserProfile />
      </Card>
      <div className="explanation">
        <p>
          In the console, you will see a warning from `DeprecatedButton`. Notice
          the "Component Stack" it provides.
        </p>
        <p>
          The stack will show: `at UserProfile` and `at App`.
        </p>
        <p>
          It does <b>not</b> show the `Card` component, because `Card` is just a
          "parent" (it wraps the content in the DOM), but it is not the "owner"
          (it didn't create `UserProfile` in its JSX). This is the power of
          `captureOwnerStack`!
        </p>
      </div>
    </div>
  );
}