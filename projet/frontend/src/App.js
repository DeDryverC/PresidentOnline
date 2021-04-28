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
import Stats from "./pages/Profil/Stats";
import Me from "./pages/Profil/Me";
import Historique from "./pages/Profil/Historique";

class App extends Component {
  state = {
    data: null,
    actualPage: 'home'
  };

  

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
        <Route exact path="/stats">
          <Stats/>
        </Route>
        <Route exact path="/myprofile">
          <Me/>
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
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default App;
