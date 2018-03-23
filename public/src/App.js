import  "./App.scss";
import React from 'react'
import PropTypes from 'prop-types'
import WelcomePage from "./containers/pages/WelcomePage";
import SignupPage from "./containers/pages/SignupPage";
import LoginPage from "./containers/pages/LoginPage";
import HomePage from "./containers/pages/HomePage";
import { Route } from 'react-router-dom'
const App = ({location}) => {
  return (
    <div>
        <Route location={location} path="/" exact component={WelcomePage}> </Route>
        <Route location={location} path="/home" exact component={HomePage}> </Route>
        <Route location={location} path="/signup" exact component={SignupPage}></Route>
        <Route location={location} path="/login" exact component={LoginPage}></Route>
    </div>
  )
}

App.propTypes={
  location:PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default App
