import React from 'react';
import ControlledInput from './ControlledInput';
import UncontrolledInput from './UncontrolledInput';
import './styles.css';

export default function App() {
  return (
    <div className="app-container">
      <h1>Controlled vs. Uncontrolled Inputs Demo  puppeteer 📝</h1>
      <p>
        Ee example, React lo inputs ni handle chese rendu main patterns ni
        compare chesthundi.
      </p>

      <div className="demo-container">
        {/*
          CONTROLLED INPUT:
          React state is the single source of truth.
          The UI updates on every keystroke because the state is changing.
        */}
        <ControlledInput />

        {/*
          UNCONTROLLED INPUT:
          The DOM is the source of truth.
          React doesn't re-render on keystroke. We "pull" the value
          from the DOM when we need it.
        */}
        <UncontrolledInput />
      </div>
    </div>
  );
}