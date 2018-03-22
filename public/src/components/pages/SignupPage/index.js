import React from 'react'
import Signup from '../../../containers/Signup'
import { connect } from 'react-redux';
import { signup } from '../../../actions/auth'
class SignupPage extends React.Component {
  submit = data =>this.props.signup(data).then(
    () => { this.props.history.push('/') }
  )
  render() {
    return (

      <Signup submit={this.submit} />

    )
  }
}
// const mapStateToProps = (state) => ({
//   signup:PropTypes.func.isRequired,
//   history:PropTypes.shape({
//     push:PropTypes.func.isRequired,
//   }).isRequired,
// })
export default connect(null, { signup })(SignupPage);
