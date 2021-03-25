import React from "react";
<<<<<<< HEAD
/*import Navbar from './Navbar/navbar';
import background from './Navbar/images/fond.png';*/
=======
import Navbar from './Navbar/navbar';
import background from './Navbar/images/cardbackground.jpg';
>>>>>>> 7ce7abda7a900a3f18ac0eb250b264edf1e1268c
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Jeu from "./pages/Jeu/Jeu";
import Signin from "./pages/Signin/Signin";
import Rules from "./pages/Rules/Rules";
import {Redirect, Route, Switch} from 'react-router-dom';
import HowTo from "./pages/howto/howto";
import Stats from "./pages/Profil/Stats";
import Me from "./pages/Profil/Me";
import Historique from "./pages/Profil/Historique";

function App() {
  return (
<<<<<<< HEAD
    /*<div style={{
      backgroundImage : `url(${background})`, height:1000,
      backgroundSize: 'cove',
=======
    <div style={{
      backgroundImage : `url(${background})`, height: 1000, margin: 0,
      backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
>>>>>>> 7ce7abda7a900a3f18ac0eb250b264edf1e1268c
      }}>

      <Navbar />
      <Home />
<<<<<<< HEAD
    </div>*/
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/stats" component={Stats} />
      <Route exact path="/myprofile" component={Me} />
      <Route exact path="/Historique" component={Historique} />
      <Route exact path="/jeu" component={Jeu} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/rules" component={Rules} />
      <Route exact path="/howto" component={HowTo} />
      <Redirect to="/" />
    </Switch>
=======
    </div>

>>>>>>> 7ce7abda7a900a3f18ac0eb250b264edf1e1268c
  );
}

export default App;
