# How and When to Use It: Best Practices & Limitations ⚠️

Okay, `taintObjectReference` anedi oka powerful security guard lantiది ani manaki ardhamaindi. Kani, ee security guard ki kuda konni limitations unnayi, and daanini eppudu, ela vadalo telusukovadam chala important.

### Best Practice: Taint at the Source

Ee function ni ekkada call cheyyali? The best place is **as close to the data source as possible.**

Ante, meeru database nunchi or internal API nunchi sensitive object ni fetch chesina ventane, ade file lo (`lib/auth.js` lanti chota) daanini taint cheyyali. Deeni valla, aa object mee application lo ekkadiki vellina, adi "tainted" ga ne untundi.

### The Biggest Limitation: It's All About the Reference!

Idi `taintObjectReference` gurinchi manam gurtupettukovalsina most critical vishayam.

> This API only taints the **specific object reference** you pass to it. It does not taint the data inside it. If you create a clone or a new object with the same data, the new object will **not** be tainted.

**Example of the loophole:**
```jsx
// ServerComponent.jsx
import { getUser } from '@/lib/auth';
import UserInfoCard from './ClientComponent';

export default async function UserProfile({ userId }) {
  // `user` object is tainted by the `getUser` function.
  const user = await getUser(userId);

  // 🚩 DANGER! We are creating a NEW, UNTAINTED object here!
  const safeLookingUser = {
    id: user.id,
    name: user.name,
    // We are still copying the sensitive data!
    passwordHash: user.passwordHash
  };

  // Ee `safeLookingUser` object tainted kadu, so React deenini
  // Client Component ki pampadaniki allow chesthundi!
  return <UserInfoCard user={safeLookingUser} />;
}
```
Ikkada, manam `user` object ni direct ga pass cheyyatledu. Daani badulu, manam daani loni properties tho oka kottha object ni create chesam. Ee kottha object reference veru kabatti, adi "tainted" kadu, and React daanini client ki pampesthundi, leaking the sensitive data.

```mermaid
graph TD
    A[Original `user` object @mem123] --> B(Tainted! 🛡️);
    B --> C{Pass to Client?};
    C --> D[❌ React throws error!];

    A --> E(Create clone `{...user}` @mem456);
    E --> F(Untainted! 😱);
    F --> G{Pass to Client?};
    G --> H[✅ React allows it! Leak occurs!];

    style D fill:#d4edda
    style H fill:#ffcccc
```

### So, What's the Real Solution?

`taintObjectReference` anedi kevalam oka **safety net**. Idi simple mistakes ni pattukuntundi. The real solution is **good API design**.

> **The Golden Rule:** Never pass the entire raw data object from the server to the client. Always create a new, clean object with **only the specific properties** that the client component actually needs.

**The SECURE Way:**
```jsx
// ServerComponent.jsx
import { getUser } from '@/lib/auth';
import UserInfoCard from './ClientComponent';

export default async function UserProfile({ userId }) {
  const user = await getUser(userId);

  // ✅ BEST PRACTICE: Create a new object with ONLY the safe data.
  const clientSafeUser = {
    id: user.id,
    name: user.name
  };
  // `passwordHash` lanti data ni manam అసలు teeskoledu.

  return <UserInfoCard user={clientSafeUser} />;
}
```
Ee approach lo, `taintObjectReference` avasarame ledu, endukante manam sensitive data ni client ki pampinche chance eh ivvatledu. Tainting is just a backup for when a developer forgets to do this.

**Final Takeaway:** `taintObjectReference` is a helpful guardrail, not a foolproof wall. Always practice good data hygiene by only passing the necessary, non-sensitive data to your Client Components.