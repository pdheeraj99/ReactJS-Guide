import './spinner.css';

/**
 * A simple loading spinner component to be used as a fallback for Suspense.
 */
export default function LoadingSpinner({ text = 'Loading, please wait...' }) {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
      <p>{text}</p>
    </div>
  );
}