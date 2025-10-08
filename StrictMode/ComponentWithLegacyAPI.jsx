import React from 'react';

/**
 * Ee component lo manam `UNSAFE_componentWillMount` ane oka
 * deprecated (pata) lifecycle method ni use chestunnam.
 *
 * Ee component ni `<StrictMode>` lo wrap chesinappudu, React
 * development console lo oka warning chupisthundi.
 *
 * "Warning: Unsafe lifecycle methods were found within a strict-mode tree..."
 *
 * Idi manalni modern and safe React practices vaipu nadipisthundi.
 */
class ComponentWithLegacyAPI extends React.Component {
  // ❌ DON'T USE THIS IN REAL CODE!
  // This is a deprecated lifecycle method.
  UNSAFE_componentWillMount() {
    console.log(
      'ComponentWithLegacyAPI: UNSAFE_componentWillMount is running! This will cause a warning in StrictMode.'
    );
  }

  render() {
    return (
      <div className="box" style={{ border: '2px solid red', marginTop: '10px' }}>
        <p>
          I am a class component using a <b>legacy (UNSAFE_)</b> lifecycle method.
        </p>
        <p>Check the console for warnings when I am rendered inside StrictMode.</p>
      </div>
    );
  }
}

export default ComponentWithLegacyAPI;