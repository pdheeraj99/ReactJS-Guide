'use client';

/**
 * Idi oka Client Component. 'use client' directive valla idi
 * browser lo run avuthundi.
 *
 * Ee component `apiKey` ni prop ga teeskuntundi.
 *
 * THE SCENARIO:
 * Okavela ServerComponent ee component ki "tainted" `apiKey` value ni
 * direct ga pass cheste, React ee component ni render cheyyakunda,
 * ventane oka error throw chesthundi.
 *
 * Aa error lo, manam `taintUniqueValue` ki ichina message kanipisthundi.
 * Ee mechanism valla, sensitive data eppudu server nunchi bayatiki radu.
 */
export default function ClientComponent({ apiKey }) {
  return (
    <div className="client-component">
      <h3>Client Component</h3>
      <p>This component should only receive safe data.</p>
      <p>
        Received API Key: <strong>{apiKey}</strong>
      </p>
      {/*
        If the tainted key made it here, it's a major security flaw.
        React's tainting API prevents this from happening.
      */}
    </div>
  );
}