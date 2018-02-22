import React, { Component } from 'react';

// components
import DriversOverview from './containers/DriversOverviewContainer';

// images
import logo from './logo.svg';

// styles
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <DriversOverview />
      </div>
    );
  }
}

export default App;
