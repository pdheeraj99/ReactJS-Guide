'use client';

/**
 * Idi oka Client Component. 'use client' directive valla idi
 * browser lo run avuthundi.
 *
 * Ee component `user` object ni prop ga teeskuntundi.
 *
 * THE SCENARIO:
 * Okavela ServerComponent ee component ki "tainted" `user` object ni
 * direct ga pass cheste, React ee component ni render cheyyakunda,
 * ventane oka error throw chesthundi.
 *
 * Aa error lo, manam `taintObjectReference` ki ichina message kanipisthundi.
 * Ee mechanism valla, sensitive data eppudu server nunchi bayatiki radu.
 */
export default function ClientComponent({ user }) {
  return (
    <div className="client-component">
      <h3>Client Component</h3>
      <p>This component should only receive safe data.</p>
      <p>
        Welcome, <strong>{user.name}</strong>!
      </p>
      {/*
        If the full tainted object made it here, someone could inspect
        the page's data and see `user.passwordHash`. React prevents this!
      */}
    </div>
  );
}