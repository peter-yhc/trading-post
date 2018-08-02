import React, {Component} from 'react'
import withStyles from '@material-ui/core/es/styles/withStyles'
import PropTypes from 'prop-types'
import {Portfolio} from '../pages/Portfolio'
import {Route, Switch} from 'react-router-dom'

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    textAlign: 'left'
  },
  toolbar: theme.mixins.toolbar
})

class MainContent extends Component {

  render() {
    const {classes} = this.props
    return (
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Switch>
          <Route path="/dashboard">
            <p>Dashboard</p>
          </Route>
          <Route path="/management">
            <p>Management</p>
          </Route>
          <Route path="/portfolio">
            <Portfolio/>
          </Route>
        </Switch>
      </main>
    )
  }
}

MainContent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MainContent)