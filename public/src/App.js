import "./App.scss";
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import WelcomePage from "./containers/pages/WelcomePage";
import SignupPage from "./containers/pages/SignupPage";
import LoginPage from "./containers/pages/LoginPage";
import HomePage from "./containers/pages/HomePage";
import EmailConfirm from './containers/pages/EmailConfirm'
//
import GuestRoute from "../src/containers/routes/GuestRoute";
import UserRoute from "../src/containers/routes/UserRoute";
//TODO: props type check
const App = ({ location }) => {
  return (
    <Switch>
      <GuestRoute location={location} path="/" exact component={WelcomePage}></GuestRoute>
      <GuestRoute location={location} path="/auth/signup" exact component={SignupPage}></GuestRoute>
      <GuestRoute location={location} path="/auth/login" exact component={LoginPage}></GuestRoute>
      <Route localtion={location} path="/auth/confirmation/:token" exact component={EmailConfirm}> </Route>
      <UserRoute location={location} path="/home" exact component={HomePage}></UserRoute>
      {/* <Route path='/404' component={My404Component} />
<Redirect from='*' to='/404' /> */}
    </Switch>
  )
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default App
