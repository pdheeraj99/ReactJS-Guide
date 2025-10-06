# Pending State: User ki "Loading..." Ani Chupinchadam ⏳

Manaki ippudu `useActionState` return chese `isPending` gurinchi telusu. Adi oka boolean (`true`/`false`). Action run avuthunnapudu `true` untundi, lekapothe `false`.

Deeni main purpose entante, **user ki feedback ivvadam.** Form submit chesaka em avuthundo teliyakapothe user confuse avuthadu. "Submit ayyinda? Leda? Inko sari click cheyyala?" ani anukuntadu. 🤷‍♂️

Ee confusion ni apatanike manam `isPending` ni vadatham.

## `isPending` tho Em Cheyyochu?

Rendu common patterns unnayi:

### 1. Submit Button ni Disable Cheyyadam

Action already start ayyaka, user malli malli submit button click cheyyakunda aapataniki, manam `isPending` `true` unnapudu button ni disable cheyyochu.

HTML lo `disabled` attribute untundi. Daaniki manam `isPending` ni isthe saripothundi.

```jsx
<button type="submit" disabled={isPending}>
  Submit
</button>
```

`isPending` `true` unnapudu, ee button disabled aipothundi. User daani meeda click cheyyaledu. `isPending` `false` avvagane, button మళ్ళీ normal ga enable avuthundi. Cool, right?

### 2. "Loading..." Message Chupinchadam

Button ni disable cheyyadam tho paatu, "Submit chesthunnam, wait cheyyi" ane message chupiste inka better ga untundi.

Manam `isPending` ni use chesi conditional rendering cheyyochu.

```jsx
<button type.="submit" disabled={isPending}>
  {isPending ? "Submitting..." : "Submit"}
</button>
```

Ikkada em chesthunnam?
*   `isPending` `true` aithe, button text "Submitting..." ga maruthundi.
*   `isPending` `false` aithe, button text "Submit" ga untundi.

Ee chinna change tho user experience chala improve avuthundi. User ki "Okay, pani jarugutondi" ani clear ga ardham avuthundi.

## Let's see a small example snippet:

```jsx
import { useActionState } from 'react';

async function myAction(state, formData) {
  // 2 seconds wait cheddam, loading state chudadaniki
  await new Promise(resolve => setTimeout(resolve, 2000));
  return { error: null }; // For now, always success anukundam
}

function MyForm() {
  const [state, formAction, isPending] = useActionState(myAction, { error: null });

  return (
    <form action={formAction}>
      <button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
```

Ee code lo, nuvvu submit button click cheyagane, adi 2 seconds పాటు disabled ga untundi and daani meeda "Submitting..." ani kanipisthundi. 2 seconds tarvata, adi malli normal "Submit" button aipothundi.

Anthe! `isPending` ni use cheyyadam chala simple and chala powerful.

Okay, manam loading state ni handle cheyyadam nerchukunnam. Kani... action fail aithe? Error vasthe? Aa error message ni user ki ela chupinchali? 🤔

That's our next topic! Manam `state` object ni use chesi error handling ela cheyyalo chuddam. Get ready to catch some errors! 🐞➡️