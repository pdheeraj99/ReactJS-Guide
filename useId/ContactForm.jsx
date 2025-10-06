import React, { useId } from 'react';

/*
  Example 2: Generating Multiple IDs from a Single Hook Call

  Ee component lo manaki rendu unique IDs kavali (First Name and Last Name kosam).
  The best practice is to call `useId` only once to get a base ID,
  and then use it as a prefix for all related elements.
*/
function ContactForm() {
  // 1. Call useId only ONCE to get a base prefix.
  const baseId = useId();

  const firstNameId = `${baseId}-firstName`;
  const lastNameId = `${baseId}-lastName`;

  return (
    <div style={{ margin: '10px 0' }}>
      <fieldset style={{ padding: '10px' }}>
        <legend>Contact Form</legend>
        <div style={{ marginBottom: '10px' }}>
          {/* 2. Use the generated IDs */}
          <label htmlFor={firstNameId}>First Name: </label>
          <input id={firstNameId} type="text" />
        </div>
        <div>
          <label htmlFor={lastNameId}>Last Name: </label>
          <input id={lastNameId} type="text" />
        </div>
      </fieldset>
    </div>
  );
}

export default ContactForm;