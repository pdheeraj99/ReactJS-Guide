# UI Patterns for Transitions: User ki Feedback Ivvadam! ✨

Manaki `useTransition` nunchi `isPending` aney oka powerful boolean vasthundi ani telusu. Ee `isPending` flag `true` unnapudu, ante oka slow transition background lo run avuthundi ani ardham.

Ee information tho manam user ki chala clear ga feedback ivvochu. Let's see some common UI patterns.

## Pattern 1: Disabling the Trigger Element

User oka button click chesaka, aa transition complete ayye varaku, aa button ni disable cheyyadam oka manchi practice. Idi user malli malli click chesi, anavasaramaina actions ni trigger cheyyakunda aapesthundi.

```jsx
<TabButton
  onClick={handleSelectTab}
  disabled={isPending}
>
  Slow Tab
</TabButton>
```
`isPending` `true` avvagane, button disable aipothundi. Transition complete ayyaka, adi malli enable avuthundi. Simple and effective!

## Pattern 2: Showing a Loading Indicator

Disable cheyyadam tho paatu, "Loading..." lanti message chupiste inka better. User ki "Okay, naa request theeskunnaru, pani jarugutondi" ani telusthundi.

```jsx
<TabButton
  onClick={handleSelectTab}
  disabled={isPending}
>
  {isPending ? 'Loading...' : 'Slow Tab'}
</TabButton>
```
Ikkada manam button text ne `isPending` state ni batti marcham.

## Pattern 3: Styling the Stale Content

`useDeferredValue` lo laage, `useTransition` tho kuda manam "stale" content ni chupisthunnam (pata tab content inka kanipisthune untundi).

So, manam `isPending` ni use chesi, aa pata content ni konchem dim cheyyochu.

```jsx
<div style={{ opacity: isPending ? 0.7 : 1 }}>
  {/* The tab content goes here */}
  {tab === 'about' && <AboutTab />}
  {tab === 'posts' && <SlowPostsTab />}
</div>
```
Ee chinna visual cue valla, user ki "Ippudu kanipinchedi pata content, kotha content load avuthundi" ani clear ga ardham avuthundi.

```mermaid
graph TD
    A[User Clicks Slow Tab] --> B{`startTransition` runs};
    B --> C{`isPending` becomes `true`};

    subgraph "Immediate UI Updates"
        C --> D[Button becomes disabled];
        C --> E[Button text changes to "Loading..."];
        C --> F[Old tab content opacity becomes 0.7];
    end

    subgraph "Background Work"
        B --> G[React renders new tab content...];
    end

    G --> H{Render completes};
    H --> I{`isPending` becomes `false`};

    subgraph "Final UI Updates"
        I --> J[Button becomes enabled];
        I --> K[Button text reverts to normal];
        I --> L[New tab content shows at opacity 1];
    end
```

Ee patterns anni kalipi vadithe, manam chala slow ga unna screen changes ni kuda chala smooth ga, user-friendly ga cheyyochu.

And that's it for the theory of `useTransition`! Ippudu neeku adi enduku, ela, and daanitho user ki manchi feedback ela ivvalo antha telusu.

Next, manam ee concepts anni kalipi, a "slow tabs" example ni full, runnable code tho create cheddam! Ready to build? 💻🚀➡️