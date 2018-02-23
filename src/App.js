import React, { Component } from 'react';

// components
import DriversOverview from './containers/DriversOverviewContainer';

// styles
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DriversOverview />
      </div>
    );
  }
}

export default App;
