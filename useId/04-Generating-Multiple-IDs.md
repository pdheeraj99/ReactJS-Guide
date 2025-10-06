# Multiple IDs: Oke Component lo Chala IDs Generate Cheyyadam 📝

Manaki `useId` tho oka ID ela generate cheyyalo telusu. Kani, oka component lo manaki okati kante ekkuva IDs kavali anuko?

For example, oka `ContactForm` component lo First Name and Last Name rendu fields unnayi. Prathi field ki oka label and oka input untundi. So manaki rendu unique IDs kavali.

## The Naive (but wrong) Approach

Manam ila anukovachu: "Rendu IDs kavali kabatti, `useId` ni rendu sarlu call cheddam."

```javascript
// ❌ This works, but it's not the recommended pattern.
function ContactFormWrong() {
  const firstNameId = useId();
  const lastNameId = useId();

  return (
    <form>
      <label htmlFor={firstNameId}>First Name:</label>
      <input id={firstNameId} type="text" />
      <hr />
      <label htmlFor={lastNameId}>Last Name:</label>
      <input id={lastNameId} type="text" />
    </form>
  );
}
```

Idi pani chesthundi, kani React documentation prakaram idi best practice kadu.

## The Recommended Pattern: One Hook Call, Multiple IDs! ✅

The best practice is to **call `useId` only once per component**, even if you need multiple IDs.

Manam `useId` tho oka **base ID** ni generate chesi, daaniki suffixes add cheskuni kotha IDs ni create cheskuntam.

```javascript
// ✅ This is the recommended way.
function ContactFormRight() {
  // 1. Call useId only ONCE to get a base prefix.
  const baseId = useId();

  return (
    <form>
      {/* 2. Create unique IDs using the baseId as a prefix. */}
      <label htmlFor={`${baseId}-firstName`}>First Name:</label>
      <input id={`${baseId}-firstName`} type="text" />
      <hr />
      <label htmlFor={`${baseId}-lastName`}>Last Name:</label>
      <input id={`${baseId}-lastName`} type="text" />
    </form>
  );
}
```

`useId` manaki `:r1:` lanti ID isthe, mana final IDs ila untayi:
*   `:r1:-firstName`
*   `:r1:-lastName`

Ee rendu IDs kuda unique ga untayi and server/client lo stable ga untayi.

### Why is this better?

*   **Readability:** Code chala clean ga untundi. Anni related elements ki oke base ID undi ani clear ga telusthundi.
*   **Efficiency:** Manam hook ni okkasari matrame call chesthunnam.

So, remember the rule: **One `useId` call per component.**

And that's everything you need to know about `useId`! Idi chala simple hook, kani daani impact chala peddadi, especially on accessibility and server-side rendering.

Next, manam ee concepts ni chupinche konni full, runnable code examples create cheddam! Ready to build? 💻✨➡️