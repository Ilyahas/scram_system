import "./App.css";
import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './components/Header'
import WelcomePage from "./containers/pages/WelcomePage";
import SignupPage from "./containers/pages/SignupPage";
import LoginPage from "./containers/pages/LoginPage";
import EmailConfirm from './containers/pages/EmailConfirm';
import TeamContent from './containers/pages/Teams';
import GuestRoute from "../src/containers/routes/GuestRoute";
import UserRoute from "../src/containers/routes/UserRoute";
import { verifyToken } from '../src/actions/auth';
class App extends React.Component {
  componentWillMount() {
    this.props.verifyToken(localStorage.JWT)
  }
  render() {
    return (
      <div>
        {this.props.isLogin && <Header />}
        <Switch>
          <GuestRoute location={this.props.location} exact path="/" component={WelcomePage}></GuestRoute>
          <GuestRoute location={this.props.location} exact path="/signup" component={SignupPage}></GuestRoute>
          <GuestRoute location={this.props.location} exact path="/login" component={LoginPage}></GuestRoute>
          <GuestRoute localtion={this.props.location} exact path="/auth/confirmation/:token" component={EmailConfirm}> </GuestRoute>
          <UserRoute localtion={this.props.location} exact path="/teams" component={TeamContent}></UserRoute>
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isLogin: PropTypes.bool.isRequired,
}
const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin,
})
const mapDispatchToProps = {
  verifyToken
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
