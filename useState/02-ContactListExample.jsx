import React, { useState } from 'react';

/*
  Example 2: Updating Arrays in State (The Immutable Way)

  Ee example lo, manam state lo unna oka array of objects ni
  ela correctly update cheyyalo chuddam.
  The golden rule: NEVER mutate the state directly. Always create a NEW array.
*/

let nextId = 3;
const initialContacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' },
];

function ContactList() {
  const [contacts, setContacts] = useState(initialContacts);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleAddContact() {
    if (!name || !email) return;
    // ✅ RIGHT: Creating a new array with the new item
    setContacts([
      ...contacts,
      { id: nextId++, name: name, email: email },
    ]);
    setName('');
    setEmail('');
  }

  function handleDeleteContact(contactId) {
    // ✅ RIGHT: `filter` returns a new array
    setContacts(contacts.filter(c => c.id !== contactId));
  }

  return (
    <div className="example-container">
      <h3>Updating an Array of Objects (Immutably)</h3>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        style={{margin: '0 10px'}}
      />
      <button onClick={handleAddContact}>Add</button>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} ({contact.email}){' '}
            <button onClick={() => handleDeleteContact(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;