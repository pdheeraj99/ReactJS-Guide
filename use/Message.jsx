import { use } from 'react';

/**
 * Idi `use` hook ni promise tho ela vadalo chupinche component.
 *
 * @param {{ messagePromise: Promise<string> }} props
 */
export default function Message({ messagePromise }) {
  // 1. Manam `use` hook ki promise ni direct ga pass chestunnam.
  // 2. Ee promise inka "pending" lo unte, ee component "suspends".
  //    React deeni rendering ni pause chesi, deggara unna <Suspense> fallback ni chupisthundi.
  // 3. Promise resolve ayyaka, `use` aa resolved value (`"Hello..."`) ni return chesthundi.
  // 4. Appudu ee component rendering complete avuthundi.
  const messageContent = use(messagePromise);

  return <p className="message">Message from server: {messageContent}</p>;
}