import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Portfolio from '../pages/portfolio/Portfolio'
import store from '../data/store'

export class PageRouter extends Component {

  render() {
    return (
      <Switch>
        <Route path="/dashboard">
          <p>Dashboard</p>
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
