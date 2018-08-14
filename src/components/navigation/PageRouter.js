import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import store from '../data/store'
import Dashboard from '../pages/dashboard/Dashboard'
import Portfolio from '../pages/portfolio/Portfolio'

export class PageRouter extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => (<Redirect to="/dashboard"/>)}/>
        <Route path="/dashboard">
          <Dashboard/>
        </Route>
        <Route path="/management">
          <p>Management</p>
        </Route>
        <Route path="/portfolio">
          <Portfolio store={store}/>
        </Route>
      </Switch>
    )
  }
}
