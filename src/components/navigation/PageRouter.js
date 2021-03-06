import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import store from '../data/Store'
import Dashboard from '../pages/dashboard/Dashboard'
import Performance from '../pages/performance/Performance'
import Portfolio from '../pages/portfolio/Portfolio'

export class PageRouter extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => (<Redirect to="/dashboard"/>)}/>
        <Route path="/dashboard">
          <Dashboard store={store}/>
        </Route>
        <Route path="/performance">
          <Performance store={store}/>
        </Route>
        <Route path="/portfolio">
          <Portfolio store={store}/>
        </Route>
      </Switch>
    )
  }
}
