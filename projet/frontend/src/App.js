import React from "react";
import Navbar from './Navbar/navbar';
import background from './Navbar/images/cardbackground.jpg';
import Home from "./pages/Home/Home";

function App() {
  return (
    <div style={{
      backgroundImage : `url(${background})`, height: 1000, margin: 0,
      backgroundSize: 'cover', backgroundRepeat: 'no-repeat', 
      }}>
      <Navbar />
      <Home />
    </div>
    
  );
}

export default App;
