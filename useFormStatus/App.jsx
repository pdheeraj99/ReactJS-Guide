import { submitForm } from './actions';
import SubmitButton from './SubmitButton';
import './styles.css';

export default function App() {
  return (
    <div className="app-container">
      <h1>`useFormStatus` Demo 📡</h1>
      <p>
        Fill out the form and click submit. The button will disable itself and
        show a "Submitting..." message for 2 seconds, using the status from its
        parent form.
      </p>

      {/*
        The Golden Rule: The component calling `useFormStatus` (`SubmitButton`)
        MUST be rendered inside the `<form>` tag.
      */}
      <form action={submitForm} className="form">
        <div className="form-row">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div className="form-row">
          {/*
            Ee SubmitButton ki manam elanti props pass cheyyatledu,
            kani adi parent form status ni telusukogaladhu!
          */}
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}