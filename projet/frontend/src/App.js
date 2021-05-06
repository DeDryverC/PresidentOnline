import React, {Component} from "react";
/*import Navbar from './Navbar/navbar';
import background from './Navbar/images/fond.png';*/
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Jeu from "./pages/Jeu/Jeu";
import Signin from "./pages/Signin/Signin";
import Rules from "./pages/Rules/Rules";
import {Redirect, Route, Switch} from 'react-router-dom';
import HowTo from "./pages/Howto/Howto"
import Historique from "./pages/Profil/Historique";
import Profil from "./pages/Profil/Profil";
import CreateGame from "./pages/CreateGame/CreateGame";


class App extends Component {
  state = {
    data: null
  };


  render() {
    return ( 
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profil} />
        <Route exact path="/historique" component={Historique} />
        <Route exact path="/jeu" component={Jeu} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/rules" component={Rules} />
        <Route exact path="/howto" component={HowTo} />
        <Route exact path="/creategame" component={CreateGame} />
      </Switch>
    );
  }
}

export default App;
