import {red} from '@material-ui/core/es/colors/index'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/es/styles'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import './App.css'
import {initialise} from './components/data/storeActionCreator'
import BaseLayout from './components/layout/BaseLayout'
import withStyles from '@material-ui/core/es/styles/withStyles'

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#23303F',
      main: '#272D33',
      light: '#EE4E34'
    },
    secondary: {
      main: '#EB972F',
      light: '#C5CF43'
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

const styles = {
  App: {
    height: '100%'
  }
}

class App extends Component {

  componentWillMount() {
    this.props.init()
  }

  render() {

    const {classes} = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.App}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App)))
