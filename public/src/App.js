import "./App.css";
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import WelcomePage from "./containers/pages/WelcomePage";
import SignupPage from "./containers/pages/SignupPage";
import LoginPage from "./containers/pages/LoginPage";
import HomePage from "./containers/pages/HomePage";
import EmailConfirm from './containers/pages/EmailConfirm'
import GuestRoute from "../src/containers/routes/GuestRoute";
import UserRoute from "../src/containers/routes/UserRoute";
import  {tabChanged} from './actions/header'
//TODO: props type check
const App = ({ location }) => {
  return (
    <Switch>
      <Route location={location} path="/" exact component={WelcomePage}></Route>
      <Route location={location} path="/signup" exact component={SignupPage}></Route>
      <Route location={location} path="/login" exact component={LoginPage}></Route>
      <Route localtion={location} path="/auth/confirmation/:token" exact component={EmailConfirm}> </Route>
      <Route location={location} path="/home" exact component={HomePage}>
        <Route path='teams'  onEnter={()=>{tabChanged(2)}}>

        </Route>
      </Route>
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
