import {red} from '@material-ui/core/es/colors/index'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/es/styles'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import './App.css'
import {initialise} from './components/data/storeActionCreator'
import BaseLayout from './components/layout/BaseLayout'

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#F69759',
      main: '#E3BD8B',
      light: '#C1C7A2'
    },
    secondary: {
      main: '#8DA891',
      light: '#A4ECE3'
    },
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
})

class App extends Component {

  componentWillMount() {
    this.props.init()
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <BaseLayout/>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    init: () => {
      dispatch(initialise())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
