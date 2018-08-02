import React, {Component} from 'react'
import './App.css'
import BaseLayout from './components/layout/BaseLayout'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/es/styles'
import {pink, red, teal} from '@material-ui/core/es/colors/index'

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: pink,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <BaseLayout/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
