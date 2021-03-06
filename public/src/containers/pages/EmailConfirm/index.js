import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Email from '../../../components/Email'
import { emailConfirm } from '../../../actions/auth'

class EmailConfirm extends Component {
  componentDidMount() {
    const token = this.props.match.params
    this.props.emailConfirm(token.token)
  }
  submit = () => (this.props.isEmailConfirmed ? this.props.history.push('/login') : '')
  render() {
    return <Email submit={this.submit} isError={this.props.isError} />
  }
}
const mapStateToProps = state => ({
  isEmailConfirmed: state.user.isEmailConfirmed,
  isError: state.user.isError,
})

const mapDispatchToProps = {
  emailConfirm,
}
EmailConfirm.propTypes = {
  isEmailConfirmed: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirm)
