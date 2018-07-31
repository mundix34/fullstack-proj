import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {HashRouter, Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Private from './components/Private/Private';

class App extends Component {
  render() {
    return (
      <div >
        <HashRouter>
          <Switch>
            <Route exact path = '/' component = {Login}/>
            <Route path = '/private' component = {Private}/>
          </Switch>

        </HashRouter>
        
      </div>
    );
  }
}

export default App;
