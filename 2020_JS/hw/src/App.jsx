import React, { Component } from 'react';
import { Header } from './components/header/header'
import { Home } from './pages/home/home'
import { SingUp } from './pages/sing-up/sing-up'
import { SingIn } from './pages/sing-in/sing-in'
import { Converter } from './pages/converter/converter'
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  SetLoggedIn = () => {
    const loggedIn = this.state.isLoggedIn;
    this.setState({ isLoggedIn: !loggedIn });
  }

  IsLoggedIn = () => {
    return this.state.isLoggedIn;
  }

  render() {
    return (
      <Router>
        <Header IsLoggedIn={this.IsLoggedIn} SetLoggedIn={this.SetLoggedIn} />
        {
          this.state.isLoggedIn
            ?
            <Redirect to="/converter" />
            :
            null
        }
        <Switch>
          <Route path="/singin">
            <SingIn SetLoggedIn={this.SetLoggedIn} />
          </Route>
          <Route path="/singup">
            <SingUp SetLoggedIn={this.SetLoggedIn} />
          </Route>
          <Route path="/converter">
            {
              this.state.isLoggedIn
                ?
                <Converter />
                :
                <Redirect to="/" />
            }
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
