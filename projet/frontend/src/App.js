import React, {Component} from "react";
/*import Navbar from './Navbar/navbar';
import background from './Navbar/images/fond.png';*/
import Navigation from "./components/Navigation";
import Login from "./pages/Login/Login";
import Jeu from "./pages/Jeu/Jeu";
import Signin from "./pages/Signin/Signin";
import Rules from "./pages/Rules/Rules";
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css'
import HowTo from "./pages/Howto/Howto"
import Historique from "./pages/Profil/Historique";
import Profil from "./pages/Profil/Profil";
import Game from "./pages/Game/Game"


class App extends Component {
  state = {
    data: null,
    actualPage: 'home',
    pseudo: 'testPseudo'
  };

  
  pageStateSwitch = ( page ) => {
        
        this.setState({actualPage: page})
  }

  

  render() {
    return ( 
      <Switch>
        <Route exact path="/">
          <Navigation
            actualPage={this.state.actualPage} 
            action = {this.pageSwitch}
            actionSwitchPage = {this.pageStateSwitch}
          />
        </Route>

        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/profile">
          <Profil/>
        </Route>
        <Route exact path="/historique">
          <Historique/>
        </Route>
        <Route exact path="/jeu">
          <Jeu/>
        </Route>
        <Route exact path="/signin">
          <Signin/>
        </Route>
        <Route exact path="/rules">
          <Rules/>
        </Route>
        <Route exact path="/howto">
          <HowTo/>
        </Route>
        <Route exact path='/game'>
          <Game/>
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default App;