import "./App.css";
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import Header from './components/Header'

import WelcomePage from "./containers/pages/WelcomePage";
import SignupPage from "./containers/pages/SignupPage";
import LoginPage from "./containers/pages/LoginPage";
import EmailConfirm from './containers/pages/EmailConfirm'
import TeamContent from './containers/pages/Teams'
import GuestRoute from "../src/containers/routes/GuestRoute";
import UserRoute from "../src/containers/routes/UserRoute";
import { tabChanged } from './actions/header'
//TODO: props type check
const App = ({ location }) => {
  return (
    <div>
      {
        <Switch>
          <GuestRoute location={location} exact path="/" component={WelcomePage}></GuestRoute>
          <GuestRoute location={location} exact path="/signup" component={SignupPage}></GuestRoute>
          <GuestRoute location={location} exact path="/login" component={LoginPage}></GuestRoute>
          <GuestRoute localtion={location} exact path="/auth/confirmation/:token" component={EmailConfirm}> </GuestRoute>
          
          <div>
            <Header />
            {/* <UserRoute localtion={location} exact path="/home" component={TeamContent}></UserRoute>
            <UserRoute localtion={location} exact path="/users" component={TeamContent}></UserRoute>
            <UserRoute localtion={location} exact path="/projects" component={TeamContent}></UserRoute> */}
            <UserRoute localtion={location} exact path="/teams" component={TeamContent}></UserRoute>
          </div>

        </Switch>
      }
    </div>
  )
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default App
