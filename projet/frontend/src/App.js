import React, {Component} from "react";
/*import Navbar from './Navbar/navbar';
import background from './Navbar/images/fond.png';*/
import Navigation from "./components/Navigation";
import Home from './pages/Home/Home';
import Login from "./pages/Login/Login";
import Jeu from "./pages/Jeu/Jeu";
import Signin from "./pages/Signin/Signin";
import Rules from "./pages/Rules/Rules";
import {Redirect, Route, Switch} from 'react-router-dom';

import HowTo from "./pages/howto/howto"
import Historique from "./pages/Profil/Historique";
import Profil from "./pages/Profil/Profil";
import CreateGame from "./pages/CreateGame/CreateGame";


class App extends Component {
  state = {
    data: null,
    actualPage: 'home',
    pseudo: 'testPseudo'
  };

  updatePseudo () {
    this.setState({pseudo: this.state.pseudo})
  }

  pageStateSwitch = ( page ) => {
        
        this.setState({actualPage: page})
  }

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/test');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

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
        <Route exact path="/creategame">
          <CreateGame/>
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default App;
