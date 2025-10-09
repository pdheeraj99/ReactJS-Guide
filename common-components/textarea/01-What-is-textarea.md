# `<textarea>`: Multi-line Input Ivvadaniki! 📝

Hey friend! Manam forms lo single line input kosam `<input type="text">` vadatham. Kani, user nunchi pedda content, like a comment, a blog post, or a bio, teeskovaali anukunte? Appudu manaki **multi-line text input** kavali. Daanikosame manam `<textarea>` component ni vadatham.

`<textarea>` anedi simple ga, user ekkuva lines lo text type cheyyadaniki anuvu ga unde oka box ni create chesthundi.

```jsx
<label>
  Write your comment:
  <textarea name="commentContent" />
</label>
```

Ee code tho, manaki oka basic text area vachestundi. Manam daani size ni `rows` and `cols` props tho control cheyyochu, or CSS tho kuda style cheyyochu.

### The Most Important Difference from HTML

Plain HTML lo, manam `<textarea>` ki initial content ivvali ante, daanini opening and closing tags madhyalo pedatham:

```html
<!-- THIS IS HTML, NOT JSX -->
<textarea>
  This is the initial text.
</textarea>
```

Kani, React lo ee approach **asalu pani cheyyadu**. `<textarea>` lopaala text or children pass cheyyadam anedi React lo **not allowed**.

**So, React lo initial value ela ivvali? And user type chesthunte aa value ni ela manage cheyyali?**

Ee question ki answer eh React loni controlled components ane concept. `<input>` and `<select>` laage, `<textarea>` kuda React lo oka special treatment theeskuntundi. Aa "React Way" ento next chapter lo chuddam. Idi telusukovadam chala important! Ready for the secret? Let's dive in! 🌊➡️