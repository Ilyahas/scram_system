import  "./App.css";
import React from 'react'
import PropTypes from 'prop-types'
import HomePage from "./components/pages/HomePage";
import SignupPage from "./components/pages/SignupPage";
import LoginPage from "./components/pages/LoginPage";
import { Route } from 'react-router-dom'
const App = (props) => {
  return (
    <div>
        <Route path="/" exact component={HomePage}> </Route>
        <Route path="/signup" exact component={SignupPage}></Route>
        <Route path="/login" exact component={LoginPage}></Route>
    </div>
  )
}

export default App
