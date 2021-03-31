import React, {Component} from "react";
/*import Navbar from './Navbar/navbar';
import background from './Navbar/images/fond.png';*/
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Jeu from "./pages/Jeu/Jeu";
import Create from "./pages/Jeu/Create";
import Signin from "./pages/Signin/Signin";
import Rules from "./pages/Rules/Rules";
import {Redirect, Route, Switch} from 'react-router-dom';
import HowTo from "./pages/howto/howto";
import Stats from "./pages/Profil/Stats";
import Me from "./pages/Profil/Me";
import Historique from "./pages/Profil/Historique";

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      
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
        <Route exact path="/create" component={Create} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default App;
