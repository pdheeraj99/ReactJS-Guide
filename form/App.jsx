import { submitForm } from './actions';
import SubmitButton from './SubmitButton';
import './styles.css';

/**
 * This App component demonstrates a modern React form using a Server Action.
 *
 * Key features to notice:
 * 1. No `useState` or `onChange` handlers are needed to manage the form's data.
 * 2. The `<form>` `action` prop is pointed directly to our imported server action.
 * 3. The `SubmitButton` component inside the form automatically knows when the
 *    form is pending, without any props being passed to it.
 */
export default function App() {
  return (
    <div className="app-container">
      <h1>Modern React Form with Server Actions ⚡️</h1>
      <p>
        Submit this form and check the console of the environment running the
        server. You'll see the form data logged there after a 2-second delay.
        The button will be disabled during this time.
      </p>

      <form action={submitForm} className="user-form">
        <div className="form-row">
          <label htmlFor="name">Name</label>
          {/* The `name` attribute is how React collects the data */}
          <input id="name" type="text" name="name" required />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </div>

        <div className="form-row-checkbox">
          <input id="spam" type="checkbox" name="spam" />
          <label htmlFor="spam">Yes, I want to receive spam!</label>
        </div>

        <div className="form-row">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}