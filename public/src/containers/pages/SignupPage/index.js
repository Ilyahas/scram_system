import React from 'react'
import PropTypes from 'prop-types'
import Signup from '../../../components/Signup'
import { connect } from 'react-redux';
import { signup } from '../../../actions/auth'
class SignupPage extends React.Component {
  submit = data => this.props.signup(data)
  render() {
    return (
      <Signup submit={this.submit} errorMessage={this.props.errorMessage} />

    )
  }
  componentWillReceiveProps = (nextProps) => {
    //console.log( nextProps.errorMessage)
   // console.log(nextProps.e)
    nextProps.isSuccess ?this.props.history.push('/home') : console.log("ERR")
  }
}
SignupPage.propTypes = {
  signup: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}
const mapStateToProps = (state) => ({
  isLoading: state.user.isLoading,
  isSuccess: state.user.isSuccess,
  errorMessage:state.user.errorMessage
})
export default connect(mapStateToProps, { signup })(SignupPage);
