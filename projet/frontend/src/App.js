import React from "react";
import Navbar from './Navbar/navbar';
import background from './Navbar/images/fond.png';
import Home from "./pages/Home/Home";

function App() {
  return (
    <div style={{
      backgroundImage : `url(${background})`, height:1000,
      backgroundSize: 'cove',
      }}>
      <Navbar />
      <Home />
    </div>
    
  );
}

export default App;
