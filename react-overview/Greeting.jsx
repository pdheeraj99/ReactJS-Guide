import React from 'react';

/*
  Hey! Idi inko simple component. Deeni peru Greeting.
  Idi 'name' ane oka prop theeskuntundi.

  Prop ante property anamata. Parent component nunchi child component ki
  data pass cheyyadaniki props vadatham.

  Ikkada, App.js ee component ki name pass chesthundi, and idi aa name ni
  use cheskuni "Hello, [name]!" ani display chesthundi.
*/
function Greeting({ name }) {
  return <h2>Hello, {name}! 👋</h2>;
}

export default Greeting;