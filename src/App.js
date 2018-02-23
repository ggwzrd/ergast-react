import React, { Component } from 'react';

// material-ui
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

// components
import DriversOverview from './containers/DriversOverviewContainer';

// styles
import './App.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#ff655d',
      main: '#ff2332',
      dark: '#c3000a',
      contrastText: '#000000',
    },
    secondary: {
      light: '#ffbf81',
      main: '#ff8e53',
      dark: '#c75f27',
      contrastText: '#000000',
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <DriversOverview />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
