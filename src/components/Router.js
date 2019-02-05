import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Home from './Home'
import Signin from './Signin'
import Signup from './Signup'
import Profile from './Profile'

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile" component={Profile} />
      </Switch>
    )
  }
}

export default withRouter(Router)
