# `<title>`: Mana Page ki Peru Pettadam 🏷️

Hey friend! Manam ippudu chala simple kani chala important component gurinchi matladukundam: `<title>`.

Ee component pani oke okati: **mana web page యొక్క title ni set cheyyadam.** Ee title browser tab lo kanipisthundi, and user bookmarks save cheskunnappudu kuda ide title use avuthundi. Idi SEO ki kuda chala mukhyam.

### The React Way of Setting a Title

Plain HTML lo laage, React lo kuda manam `<title>` component ni use chestham. Kani, React deeniki kuda tana special magic ni add chesthundi.

> **Meeru `<title>` component ni mee React tree lo ekkadaina render cheyochu, React daanini automatic ga document యొక్క `<head>` section loki hoist chesthundi!**

Ee feature valla, prathi page daani specific title ni ade set cheskovacchu. For example, oka "Profile" page "John's Profile" ane title ni set cheskovacchu, and "Settings" page "Account Settings" ane title ni set cheskovacchu.

```jsx
// ProfilePage.jsx
function ProfilePage({ user }) {
  return (
    <div>
      {/* Ee title automatic ga <head> loki velthundi! */}
      <title>{user.name}'s Profile</title>

      <h1>Welcome to {user.name}'s profile!</h1>
      {/* ...rest of the page */}
    </div>
  );
}
```

### A Very Important Rule ⚠️

`<title>` component tho pani chesetappudu, manam oka rule ni gattiga follow avvali:
**Its children must be a single string.**

Manam ilanti code rayakudadu:
`// 🔴 WRONG`
`<title>Hello {name}</title>`

Endukante, idi React ki oka array la kanipisthundi (`['Hello ', name]`), and adi error isthundi.

**The Correct Way** is to use a template literal to create a single string:
`// ✅ CORRECT`
`<title>{`Hello ${name}`}</title>`

Ee chinna vishayam chala important. Ippudu, ee dynamic titles ni and static titles ni code examples lo chuddam. Let's go! 🚀