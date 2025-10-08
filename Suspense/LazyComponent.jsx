/**
 * Idi oka "lazy" loaded component.
 * Deeni code, idi avasaram ayinappudu matrame download avuthundi.
 * Idi oka pedda library ni or complex UI part ni represent chestundi anukovachu.
 */
export default function LazyComponent() {
  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#e6f7ff',
        border: '1px solid #91d5ff',
        borderRadius: '8px',
        marginTop: '10px',
      }}
    >
      <h2>Hey, I am the Lazy Component! 👋</h2>
      <p>
        Naa code antha initial page load tho paatu raledu. Nuvvu nannu chudalani
        anukunnaake, naa code background lo download ayyi, nenu kanipistunnanu.
      </p>
      <p>This helps in making the initial app load much faster! 🚀</p>
    </div>
  );
}