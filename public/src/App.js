import React from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css'
import Header from './components/Header'
import Home from './containers/pages/HomePage'
import WelcomePage from './containers/pages/WelcomePage'
import SignupPage from './containers/pages/SignupPage'
import Login from './containers/pages/LoginPage'
import { Settings } from './containers/pages/Settings'
import EmailConfirm from './containers/pages/EmailConfirm'
import TeamContent from './containers/pages/Teams'
import { Members } from './containers/pages/Users'
import Board from './containers/pages/BoardPage'
import Projects from './containers/pages/Projects'
import GuestRoute from '../src/containers/routes/GuestRoute'
import UserRoute from '../src/containers/routes/UserRoute'
import { verifyToken } from '../src/actions/auth'
import { getCompany } from '../src/actions/company'

class App extends React.Component {
  componentDidMount() {
    // this.props.verifyToken(localStorage.JWT)
    if (!localStorage.companyId) {
      this.props.getCompany()
    }
  }
  state = {
    isShowUserOptions: false,
  }
  showDropdownMenu =() => {
    this.setState({ isShowUserOptions: !this.state.isShowUserOptions })
  }
  hideDropDown = () => {
    if (this.state.isShowUserOptions) this.setState({ isShowUserOptions: false })
  }
  render() {
    return (
      <div onClick={ () => this.hideDropDown()}>
        {this.props.isLogin && <Header showDropdownMenu={ this.showDropdownMenu }
        isShowUserOptions= {this.state.isShowUserOptions}/>}
        <Switch>
          <GuestRoute location={this.props.location} exact path="/" component={WelcomePage} />
          <GuestRoute location={this.props.location} exact path="/signup" component={SignupPage} />
          <GuestRoute location={this.props.location} exact path="/login" component={Login} />
          <GuestRoute location={this.props.location} exact path="/auth/confirmation/:token" component={EmailConfirm}>
            {' '}
          </GuestRoute>
          <UserRoute location={this.props.location} exact path="/home" component={Home} />
          <UserRoute location={this.props.location} exact path="/projects" component={Projects}/>
          <UserRoute location={this.props.location} exact path="/team/:teamName/:dashboardId" component={Board} />
          <UserRoute location={this.props.location} exact path="/teams" component={TeamContent} />
          <UserRoute location={this.props.location} exact path="/users" component={ Members } />
          <UserRoute location={this.props.location} path="/settings/:teamName" component={ Settings } />
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  isLogin: PropTypes.bool.isRequired,
}
const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
})
const mapDispatchToProps = {
  verifyToken,
  getCompany,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
