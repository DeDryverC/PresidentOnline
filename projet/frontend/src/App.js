import React from "react";
import Navbar from './Navbar/navbar';
import background from './Navbar/images/fond.png';

function App() {
  return (
    <div style={{backgroundImage : `url(${background})`}}>
      <Navbar />
    </div>
  );
}

export default App;
