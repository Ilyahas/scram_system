import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Login from '../../../components/Login'
import { login } from '../../../actions/auth'
export class LoginPage extends Component {
  submit = data => this.props.login(data);
  render() {
    return <Login submit={this.submit} isError={this.props.isError} />;
  }
  componentWillReceiveProps = nextProps => nextProps.isSuccess && this.props.history.push('/home');
}

const mapStateToProps = state => ({
  isSuccess: state.user.isSuccess,
  isError: state.user.isError,
});
LoginPage.propTypes = {
  isSuccess: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps, { login })(LoginPage);
