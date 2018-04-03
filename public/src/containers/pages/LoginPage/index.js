import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Login from '../../../components/Login'
import {login} from '../../../actions/auth'
export class LoginPage extends Component {
  submit = data =>  this.props.login(data)
  render() {
    return <Login submit={this.submit} errorMessage={this.props.errorMessage}/>
  }
  componentWillReceiveProps = (nextProps)=>{
      nextProps.isSuccess ? this.props.history.push('/home') :console.log('err');
  }
}

const mapStateToProps = (state) => ({
    isLoading: state.user.isLoading,
    isSuccess:state.user.isSuccess,
    errorMessage:state.user.errorMessage
})
LoginPage.propTypes={
  isLoading:PropTypes.bool.isRequired,
  isSuccess:PropTypes.bool.isRequired,
  errorMessage:PropTypes.bool.isRequired,
}
export default connect(mapStateToProps, {login})(LoginPage)
