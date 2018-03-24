import  "./App.scss";
import React from 'react'
import PropTypes from 'prop-types'
import WelcomePage from "./containers/pages/WelcomePage";
import SignupPage from "./containers/pages/SignupPage";
import LoginPage from "./containers/pages/LoginPage";
import HomePage from "./containers/pages/HomePage";
import { Route,Switch } from 'react-router-dom'
import GuestRoute from "../src/containers/routes/GuestRoute";
import UserRoute from "../src/containers/routes/UserRoute";
const App = ({location}) => {
  return (
    <Switch>
        <GuestRoute location={location} path="/" exact component={WelcomePage}></GuestRoute>
        <UserRoute location={location} path="/home" exact component={HomePage}></UserRoute> 
        <GuestRoute location={location} path="/signup" exact component={SignupPage}></GuestRoute>
        <GuestRoute location={location} path="/login" exact component={LoginPage}></GuestRoute>
    </Switch>
  )
}

App.propTypes={
  location:PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default App
