import  "./App.css";
import React from 'react'
import PropTypes from 'prop-types'
import HomePage from "./components/pages/HomePage";
import SignupPage from "./components/pages/SignupPage";
import LoginPage from "./components/pages/LoginPage";
import { Route } from 'react-router-dom'
const App = ({location}) => {
  return (
    <div>
        <Route location={location} path="/" exact component={HomePage}> </Route>
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
