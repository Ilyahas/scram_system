import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from '../../../components/Home'
import { token } from '../../../actions/auth'
import { getCompany } from '../../../actions/company'

export class HomePage extends Component {
  componentDidMount() {
    this.props.token(localStorage.JWT)
    if (!localStorage.companyId) {
      this.props.getCompany()
    }
  }
  render() {
    return <Home />
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  token,
  getCompany,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
